import { GoogleGenAI, Type } from '@google/genai';
import { RetrievalService } from './retrievalService';
import { LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';
import { Phase3AiResponse, RetrievedKuralMatch } from '../types';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
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

export class GeminiTutorService {
  private static instance: GeminiTutorService;
  private retrievalService: RetrievalService;

  private constructor() {
    this.retrievalService = RetrievalService.getInstance();
  }

  public static getInstance(): GeminiTutorService {
    if (!GeminiTutorService.instance) {
      GeminiTutorService.instance = new GeminiTutorService();
    }
    return GeminiTutorService.instance;
  }

  public async queryTutor(userPrompt: string): Promise<Phase3AiResponse> {
    // 1. Run full 8-step RAG retrieval
    const retrieval = this.retrievalService.retrieveContext(userPrompt, {
      limitKurals: 3,
      limitLegal: 2,
      limitScenarios: 1
    });

    const ai = getGeminiClient();

    let structuredOutput: Partial<Phase3AiResponse> | null = null;

    if (ai) {
      try {
        const systemInstruction = `You are "Justice AI Legal-Ethics Tutor", an authoritative educational mentor connecting classical Tamil ethical philosophy (Thirukkural) with modern Indian statutory jurisprudence.

CRITICAL DIRECTIVES:
1. Ground your reasoning strictly on the provided RETRIEVED GROUNDING CONTEXT (Kurals, legal statutes, knowledge graph).
2. Prefer retrieved evidence over unsupported general knowledge.
3. NEVER fabricate Kural numbers, verse lines, or legal section citations. Use only retrieved ones or state they are unavailable.
4. Clearly distinguish Ethical Guidance (Aram / Dharma) from Statutory Legal Provisions (BNS, IT Act, Advocates Act, Constitution).
5. Explain legal and ethical concepts in simple, accessible language suitable for civic learners and law students.
6. Admit when retrieved evidence is insufficient: if no exact matching Kural or statute exists, state "No sufficiently relevant Kural/Statute was retrieved."
7. DO NOT provide personalized legal advice, represent yourself as a lawyer or judge, or make definitive legal adjudications.
8. Output MUST be valid JSON conforming to the requested schema.`;

        const userContent = `USER QUESTION:
"${retrieval.normalizedQuery}"

RETRIEVED GROUNDING CONTEXT:
${retrieval.ragPromptContext}

Please synthesize a grounded legal-ethics response in JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: userContent,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                situationUnderstanding: {
                  type: Type.STRING,
                  description: 'Empathic, objective synthesis of the user situation or legal-ethics question.'
                },
                detectedConcepts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of ethical and legal concepts detected.'
                },
                ethicalPerspective: {
                  type: Type.STRING,
                  description: 'Deep philosophical and moral reasoning grounded in Thirukkural virtues.'
                },
                legalEducationalPerspective: {
                  type: Type.STRING,
                  description: 'Educational explanation of relevant Indian statutory provisions and procedures.'
                },
                whyKuralIsRelevant: {
                  type: Type.STRING,
                  description: 'Precise explanation of why the primary retrieved Kural applies to this situation.'
                },
                responsibleAction: {
                  type: Type.STRING,
                  description: 'Constructive, ethical next steps and de-escalation strategies for the individual.'
                },
                modernApplication: {
                  type: Type.STRING,
                  description: 'How this intersection applies in modern corporate, civic, or digital life.'
                },
                keyTakeaway: {
                  type: Type.STRING,
                  description: 'One memorable sentence capturing the ethical and legal essence.'
                }
              },
              required: [
                'situationUnderstanding',
                'detectedConcepts',
                'ethicalPerspective',
                'legalEducationalPerspective',
                'whyKuralIsRelevant',
                'responsibleAction',
                'modernApplication',
                'keyTakeaway'
              ]
            }
          }
        });

        if (response.text) {
          try {
            structuredOutput = JSON.parse(response.text.trim());
          } catch {
            structuredOutput = null;
          }
        }
      } catch (err) {
        console.warn('[GeminiTutorService] Gemini API call fallback to deterministic synthesis:', err);
      }
    }

    // Deterministic fallback synthesis if Gemini API key absent or parsing failed
    if (!structuredOutput) {
      const topKural = retrieval.kurals[0];
      const topLegal = retrieval.legalKnowledge[0];
      const conceptList = retrieval.detectedConcepts.map((c) => c.name);

      const hasRevenge = retrieval.normalizedQuery.toLowerCase().includes('revenge') ||
        retrieval.normalizedQuery.toLowerCase().includes('insult');

      structuredOutput = {
        situationUnderstanding: hasRevenge
          ? `You have encountered an insult or provocation, creating an emotional urge to retaliate or seek retribution. The conflict tests personal composure and legal boundaries.`
          : `Your inquiry explores the intersection of moral accountability and statutory compliance regarding "${retrieval.normalizedQuery}".`,
        detectedConcepts: conceptList.length > 0 ? conceptList : ['Aram (Virtue)', 'Impartiality', 'Self-Control'],
        ethicalPerspective: topKural
          ? `In Thirukkural's Chapter on ${topKural.chapter} (${topKural.paal}), Valluvar establishes that retaliatory harm degrades the actor more than the instigator. Kural ${topKural.kuralNumber} explicitly teaches: "${topKural.englishVerse}". By practicing patience and refusing to strike back in anger, one preserves moral dignity and prevents compounding harm.`
          : `Classical Tamil jurisprudence holds that Aram (Virtue) demands emotional mastery and non-injury. Returning hostility with hostility escalates personal ruin.`,
        legalEducationalPerspective: topLegal
          ? `Under Indian law (${topLegal.statute}), actions driven by retaliation or revenge carry strict penal liabilities. While the Right of Private Defence (BNS Sections 34-44) allows reasonable, proportional protection against imminent physical threats, it strictly prohibits retaliatory force once danger has passed. Furthermore, verbal insults cannot justify physical battery or criminal intimidation.`
          : `Under the Indian Legal Framework, all citizens are governed by the Rule of Law. Retaliation outside legal channels constitutes an unlawful breach of peace.`,
        whyKuralIsRelevant: topKural
          ? topKural.whyRelevant
          : `Teaches the fundamental duty of restraint when facing provocation.`,
        responsibleAction: `1. Pause and de-escalate immediately: Avoid replying or reacting in the heat of anger.\n2. Document facts objectively if harassment or defamation occurred.\n3. Utilize institutional grievance or legal remedies rather than personal retribution.`,
        modernApplication: `In workplace environments and digital platforms, insults frequently trigger flame wars or workplace disputes. Responding with composure and utilizing formal mediation protects reputation and avoids disciplinary or legal liability.`,
        keyTakeaway: `Patience and proportional restraint disarm hostility; seeking revenge binds you to the wrongdoer's level while virtue elevates you above it.`
      };
    }

    const responseId = `ai-resp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    return {
      id: responseId,
      situationUnderstanding: structuredOutput.situationUnderstanding || 'Understanding of the situation.',
      detectedConcepts: structuredOutput.detectedConcepts || retrieval.detectedConcepts.map((c) => c.name),
      ethicalPerspective: structuredOutput.ethicalPerspective || 'Classical ethical perspective.',
      legalEducationalPerspective: structuredOutput.legalEducationalPerspective || 'Educational statutory perspective.',
      relatedKurals: retrieval.kurals,
      whyKuralIsRelevant: structuredOutput.whyKuralIsRelevant || (retrieval.kurals[0]?.whyRelevant ?? 'Relevant ethical guidance.'),
      responsibleAction: structuredOutput.responsibleAction || 'Act with restraint and due process.',
      modernApplication: structuredOutput.modernApplication || 'Applicable in modern professional and personal settings.',
      keyTakeaway: structuredOutput.keyTakeaway || 'Truth and virtue endure.',
      sources: retrieval.sources,
      traces: retrieval.traces,
      disclaimer: LEGAL_DISCLAIMER_TEXT,
      timestamp: new Date().toISOString()
    };
  }
}
