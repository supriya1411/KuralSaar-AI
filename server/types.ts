export type PaalType = 'Aram' | 'Porul' | 'Inbam';

export interface NormalizedKural {
  id: number;
  kuralNumber: number;
  tamilVerse: string;
  verse1Tamil: string;
  verse2Tamil: string;
  englishVerse: string;
  tamilExplanation: string;
  englishExplanation: string;
  chapter: string;
  chapterTamil: string;
  chapterNumber: number;
  iyal: string;
  iyalTamil: string;
  paal: PaalType;
  paalTamil: string;
  transliteration: string;
  concepts: string[];
  keywords: string[];
  searchText: string;
  metadata: {
    lineCount: number;
    wordCount: number;
    modernRelevance: string;
    relatedLegalConcepts: string[];
    relatedScenarioIds?: string[];
  };
}

export interface NormalizedLegalKnowledge {
  id: string;
  question: string;
  answer: string;
  category: string;
  legalConcepts: string[];
  keywords: string[];
  source: string;
  metadata: {
    statute?: string;
    sectionCode?: string;
    educationalDisclaimer: string;
    historicalNote?: string;
    complexity?: 'Fundamental' | 'Intermediate' | 'Advanced';
    applicability?: string;
  };
  searchText: string;
}

export interface ScenarioOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
  ethicalFeedback: string;
  legalFeedback: string;
}

export interface NormalizedScenario {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  question: string;
  options: ScenarioOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  ethicalConcepts: string[];
  legalConcepts: string[];
  relatedKuralIds: number[];
  relatedLegalKnowledgeIds: string[];
  explanation: string;
  thinkEthicallyHint: string;
  skillsImproved: {
    name: string;
    percentage: number;
    points: number;
  }[];
  legalPerspective: {
    title: string;
    statutes: string[];
    explanation: string;
    precedentOrCode: string;
    isDisclaimerDemo: boolean;
  };
  ethicalPerspective: {
    title: string;
    principles: string[];
    deepDive: string;
  };
}

export interface UserSkillScores {
  legalAwareness: number;
  ethicalReasoning: number;
  criticalThinking: number;
  prosocialDecisionMaking: number;
  professionalEthics: number;
}

export interface ScenarioAttempt {
  scenarioId: string;
  scenarioNumber: number;
  selectedOption: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timestamp: string;
  xpEarned: number;
}

export interface UserProgressData {
  userId: string;
  userName: string;
  userRole: string;
  avatarUrl: string;
  xp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  streakDays: number;
  bestStreak: number;
  casesCompleted: number;
  totalCases: number;
  accuracyPercentage: number;
  skills: UserSkillScores;
  unlockedBadgeIds: string[];
  completedScenarioIds: string[];
  reviewedKuralIds: number[];
  scenarioAttempts: ScenarioAttempt[];
  bookmarks: {
    kuralIds: number[];
    scenarioIds: string[];
    legalIds: string[];
  };
  lastActiveDate: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Milestone' | 'Virtue' | 'Legal' | 'Mastery';
  xpThreshold?: number;
  streakThreshold?: number;
  casesThreshold?: number;
  unlocked?: boolean;
  unlockedAt?: string;
}

export interface LeaderboardUserData {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  xp: number;
  streak: number;
  accuracy: number;
  rank: number;
  institution?: string;
  isCurrentUser?: boolean;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'kural' | 'chapter' | 'ethical_concept' | 'legal_concept' | 'scenario' | 'legal_knowledge';
  color: string;
  val: number;
  details?: Record<string, unknown>;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  label: 'BELONGS_TO' | 'TEACHES' | 'RELATED_TO' | 'INVOLVES' | 'SUPPORTED_BY';
}

export interface KnowledgeGraphResponse {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
  metadata: {
    nodeCount: number;
    edgeCount: number;
    nodeTypes: string[];
    relationships: string[];
  };
}

export interface DatasetHealthResponse {
  status: 'healthy' | 'degraded' | 'error';
  timestamp: string;
  datasets: {
    thirukkural: {
      totalRecords: number;
      validRecords: number;
      duplicates: number;
      missingValues: number;
      fieldsAvailable: string[];
      paalsCount: Record<string, number>;
      chaptersCount: number;
    };
    legalKnowledge: {
      totalRecords: number;
      validRecords: number;
      duplicates: number;
      missingValues: number;
      fieldsAvailable: string[];
      categoriesCount: Record<string, number>;
    };
    scenarios: {
      totalRecords: number;
      validRecords: number;
      duplicates: number;
      categoriesCovered: string[];
    };
  };
  legalDisclaimer: string;
}

export interface DetectedConcept {
  name: string;
  category: 'Ethical' | 'Legal' | 'Virtue' | 'Cognitive';
  confidence: number;
  synonyms: string[];
  semanticDescription?: string;
}

export interface RetrievedKuralMatch {
  kuralNumber: number;
  tamilVerse: string;
  englishVerse: string;
  englishExplanation: string;
  chapter: string;
  chapterNumber: number;
  paal: string;
  concept: string;
  relevanceScore: number;
  source: string;
  whyRelevant: string;
}

export interface RetrievedLegalMatch {
  id: string;
  question: string;
  answer: string;
  category: string;
  statute: string;
  concept: string;
  relevanceScore: number;
  isEducational: boolean;
  source: string;
  whyRelevant: string;
}

export interface ReasoningStepTrace {
  stepNumber: number;
  stepName: string;
  title: string;
  description: string;
  details: Record<string, unknown> | string | unknown[];
}

export interface FullRagRetrievalContext {
  rawQuery: string;
  normalizedQuery: string;
  detectedConcepts: DetectedConcept[];
  kurals: RetrievedKuralMatch[];
  legalKnowledge: RetrievedLegalMatch[];
  graphRelationships: {
    from: string;
    relation: string;
    to: string;
    explanation: string;
  }[];
  sources: {
    name: string;
    recordId: string;
    relevance: number;
  }[];
  relevanceScores: Record<string, number>;
  ragPromptContext: string;
  traces: ReasoningStepTrace[];
}

export interface Phase3AiResponse {
  id: string;
  situationUnderstanding: string;
  detectedConcepts: string[];
  ethicalPerspective: string;
  legalEducationalPerspective: string;
  relatedKurals: RetrievedKuralMatch[];
  whyKuralIsRelevant: string;
  responsibleAction: string;
  modernApplication: string;
  keyTakeaway: string;
  sources: {
    name: string;
    recordId: string;
    relevance: number;
  }[];
  traces: ReasoningStepTrace[];
  disclaimer: string;
  timestamp: string;
}

export interface ScenarioAiFeedback {
  decisionAssessment: string;
  ethicalReasoning: string;
  legalEducationalContext: string;
  relevantKural: RetrievedKuralMatch | null;
  whyKuralIsRelevant: string;
  betterResponsibleAction: string;
  learningTakeaway: string;
  traces: ReasoningStepTrace[];
  skillsImproved: {
    name: string;
    percentage: number;
    points: number;
  }[];
  xpAwarded: number;
  isCorrect: boolean;
}

export interface AiLearningInsight {
  summary: string;
  strengths: string[];
  improvementAreas: string[];
  recommendedAction: string;
  suggestedKuralNumber: number;
  suggestedScenarioId: string;
}

export interface RetrievalResult {
  kurals: NormalizedKural[];
  legalKnowledge: NormalizedLegalKnowledge[];
  scenarios: NormalizedScenario[];
  concepts: {
    ethical: string[];
    legal: string[];
  };
  ragContextSummary?: string;
}
