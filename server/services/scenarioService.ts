import {
  NormalizedScenario,
  UserProgressData,
  ScenarioAiFeedback,
  RetrievedKuralMatch
} from '../types';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { StorageService } from './storageService';
import { RetrievalService } from './retrievalService';
import { GoogleGenAI, Type } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

export interface SubmitScenarioResult {
  isCorrect: boolean;
  selectedOption: 'A' | 'B' | 'C' | 'D';
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  ethicalFeedback: string;
  legalFeedback: string;
  xpAwarded: number;
  skillsImproved: {
    name: string;
    percentage: number;
    points: number;
  }[];
  updatedProgress: UserProgressData;
  relatedKurals: number[];
  relatedLegalKnowledge: string[];
  aiFeedback: ScenarioAiFeedback;
}

export class ScenarioService {
  private static instance: ScenarioService;
  private preprocessor: DatasetPreprocessor;
  private storage: StorageService;
  private retrievalService: RetrievalService;

  private constructor() {
    this.preprocessor = DatasetPreprocessor.getInstance();
    this.storage = StorageService.getInstance();
    this.retrievalService = RetrievalService.getInstance();
  }

  public static getInstance(): ScenarioService {
    if (!ScenarioService.instance) {
      ScenarioService.instance = new ScenarioService();
    }
    return ScenarioService.instance;
  }

  public getAllScenarios(): NormalizedScenario[] {
    return this.preprocessor.scenarios;
  }

  public getScenarioById(id: string): NormalizedScenario | undefined {
    return this.preprocessor.scenariosMap.get(id);
  }

  public async submitAnswer(
    scenarioId: string,
    selectedOption: 'A' | 'B' | 'C' | 'D'
  ): Promise<SubmitScenarioResult> {
    const scenario = this.preprocessor.scenariosMap.get(scenarioId);
    if (!scenario) {
      throw new Error(`Scenario with ID ${scenarioId} not found.`);
    }

    const chosenOption = scenario.options.find((opt) => opt.id === selectedOption);
    if (!chosenOption) {
      throw new Error(`Invalid option ${selectedOption} for scenario ${scenarioId}.`);
    }

    const isCorrect = chosenOption.isCorrect;
    const xpAwarded = isCorrect
      ? scenario.difficulty === 'Hard'
        ? 150
        : scenario.difficulty === 'Medium'
        ? 100
        : 75
      : 20;

    // 1. Retrieve RAG context for this scenario dilemma + chosen response
    const retrieval = this.retrievalService.retrieveContext(
      `${scenario.title} ${scenario.description} Decision: ${chosenOption.text}`,
      { limitKurals: 2, limitLegal: 2 }
    );

    // 2. Generate AI Feedback via Gemini or Deterministic fallback
    let aiFeedback: ScenarioAiFeedback = await this.generateScenarioAiFeedback(
      scenario,
      chosenOption,
      isCorrect,
      xpAwarded,
      retrieval.kurals[0] || null,
      retrieval.traces
    );

    // 3. Record attempt and update user profile
    const updatedProgress = this.storage.recordScenarioAttempt({
      scenarioId: scenario.id,
      scenarioNumber: scenario.number,
      selectedOption,
      isCorrect,
      timestamp: new Date().toISOString(),
      xpEarned: xpAwarded
    });

    return {
      isCorrect,
      selectedOption,
      correctOption: scenario.correctAnswer,
      explanation: chosenOption.explanation,
      ethicalFeedback: chosenOption.ethicalFeedback,
      legalFeedback: chosenOption.legalFeedback,
      xpAwarded,
      skillsImproved: isCorrect ? scenario.skillsImproved : [],
      updatedProgress,
      relatedKurals: scenario.relatedKuralIds,
      relatedLegalKnowledge: scenario.relatedLegalKnowledgeIds,
      aiFeedback
    };
  }

  private async generateScenarioAiFeedback(
    scenario: NormalizedScenario,
    chosenOption: { id: string; text: string; isCorrect: boolean; explanation: string },
    isCorrect: boolean,
    xpAwarded: number,
    topKural: RetrievedKuralMatch | null,
    traces: any[]
  ): Promise<ScenarioAiFeedback> {
    const ai = getGeminiClient();

    if (ai) {
      try {
        const systemInstruction = `You are "Justice AI Scenario Evaluator", evaluating a law & ethics student's decision in a case dilemma.
Analyze the user's selected choice (${chosenOption.id}: "${chosenOption.text}") in light of Indian jurisprudence and Thirukkural ethics.
Return valid JSON.`;

        const promptContent = `CASE SCENARIO #${scenario.number}: "${scenario.title}"
CATEGORY: ${scenario.category} (Difficulty: ${scenario.difficulty})
DILEMMA: ${scenario.description}
STUDENT CHOICE: Option ${chosenOption.id}: "${chosenOption.text}" (Correct: ${isCorrect})
RELATED KURAL: Kural ${topKural?.kuralNumber || scenario.relatedKuralIds[0]} (${topKural?.chapter || 'Virtue'})

Provide pedagogical AI feedback with decision assessment, ethical reasoning, legal context, better responsible action, and learning takeaway.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: promptContent,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                decisionAssessment: { type: Type.STRING },
                ethicalReasoning: { type: Type.STRING },
                legalEducationalContext: { type: Type.STRING },
                whyKuralIsRelevant: { type: Type.STRING },
                betterResponsibleAction: { type: Type.STRING },
                learningTakeaway: { type: Type.STRING }
              },
              required: [
                'decisionAssessment',
                'ethicalReasoning',
                'legalEducationalContext',
                'whyKuralIsRelevant',
                'betterResponsibleAction',
                'learningTakeaway'
              ]
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return {
            decisionAssessment: parsed.decisionAssessment,
            ethicalReasoning: parsed.ethicalReasoning,
            legalEducationalContext: parsed.legalEducationalContext,
            relevantKural: topKural,
            whyKuralIsRelevant: parsed.whyKuralIsRelevant,
            betterResponsibleAction: parsed.betterResponsibleAction,
            learningTakeaway: parsed.learningTakeaway,
            traces,
            skillsImproved: isCorrect ? scenario.skillsImproved : [],
            xpAwarded,
            isCorrect
          };
        }
      } catch (err) {
        console.warn('[ScenarioService] Fallback to deterministic feedback:', err);
      }
    }

    // High fidelity fallback
    const kuralDesc = topKural
      ? `Kural ${topKural.kuralNumber} (${topKural.chapter}): "${topKural.englishVerse}"`
      : `Thirukkural moral guidelines on duty and discernment`;

    return {
      decisionAssessment: isCorrect
        ? `Exemplary decision! Option ${chosenOption.id} directly aligns with statutory standards and unyielding ethical rectitude.`
        : `Option ${chosenOption.id} is suboptimal because it compromises either procedural compliance or foundational moral duties.`,
      ethicalReasoning: isCorrect
        ? `${scenario.ethicalPerspective.deepDive} By choosing this course, you embodied ${scenario.ethicalConcepts.join(', ')}.`
        : `While tempting under pressure, this option deviates from Aram (Virtue). ${scenario.ethicalPerspective.title} requires placing civic duty above short-term convenience.`,
      legalEducationalContext: `${scenario.legalPerspective.title}: Governed under ${scenario.legalPerspective.statutes.join(', ')}. ${scenario.legalPerspective.explanation}`,
      relevantKural: topKural,
      whyKuralIsRelevant: topKural
        ? `${topKural.whyRelevant} It highlights how ${topKural.englishExplanation.toLowerCase()}`
        : `Grounds the principle that virtuous actions yield enduring peace.`,
      betterResponsibleAction: isCorrect
        ? `Maintain this standard of documentation and transparent escalation in future professional scenarios.`
        : `The ideal resolution is Option ${scenario.correctAnswer}: adhere strictly to statutory guidelines while consulting ethics ombudsmen or legal precedents.`,
      learningTakeaway: isCorrect
        ? `True justice balances technical adherence to statutes with unshakeable moral courage.`
        : `Short-term compromises often lead to compounded regulatory and ethical liabilities.`,
      traces,
      skillsImproved: isCorrect ? scenario.skillsImproved : [],
      xpAwarded,
      isCorrect
    };
  }
}
