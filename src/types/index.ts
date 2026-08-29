export type PaalType = 'Aram' | 'Porul' | 'Inbam';

export interface Kural {
  id: number;
  number: number;
  paal: PaalType; // Section (Virtue, Wealth, Love)
  paalTamil: string; // அறத்துப்பால், பொருட்பால், காமத்துப்பால்
  iyal: string; // Subsection
  iyalTamil: string;
  adhigaram: string; // Chapter
  adhigaramTamil: string;
  verse1Tamil: string;
  verse2Tamil: string;
  verseTamilFull: string;
  verseEnglish: string;
  transliteration: string;
  explanationTamil: string;
  explanationEnglish: string;
  ethicalConcept: string;
  ethicalConceptTamil: string;
  keywords: string[];
  modernRelevance: string;
  relatedLegalConcepts: string[];
  relatedScenarioIds: string[];
}

export interface ScenarioOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect?: boolean;
  explanation: string;
  ethicalFeedback?: string;
  legalFeedback?: string;
}

export interface Scenario {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  summary: string;
  description: string;
  question: string;
  options: ScenarioOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  xpReward: number;
  thinkEthicallyHint: string;
  ethicalConcepts: string[];
  legalConcepts: string[];
  skillsImproved: {
    name: string;
    percentage: number;
    points: number;
  }[];
  relatedKuralNumber: number;
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

export interface EthicalConcept {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  icon: string;
  kuralCount: number;
  masteryPercentage: number;
  category: string;
  keyPrinciples: string[];
  recommendedKuralIds: number[];
  relatedScenarioIds: string[];
}

export interface LegalConcept {
  id: string;
  title: string;
  category: 'Constitutional' | 'Criminal / Penal' | 'Professional & Corporate' | 'Civil & Human Rights' | 'Environmental';
  indianLawReference: string; // e.g. "Bar Council of India Rules, Advocates Act 1961"
  description: string;
  ethicalIntersection: string;
  relatedKurals: number[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'Mastery' | 'Streak' | 'Ethical' | 'Legal' | 'Community';
  xpValue: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  criteria: string;
}

export interface UserProgress {
  userId: string;
  userName: string;
  userRole: string;
  avatarUrl: string;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  bestStreak: number;
  casesCompleted: number;
  totalCases: number;
  accuracyPercentage: number;
  skills: {
    legalAwareness: number;
    ethicalReasoning: number;
    conflictResolution: number;
    prosocialDecisionMaking: number;
    criticalThinking: number;
    professionalEthics: number;
  };
  unlockedBadgeIds: string[];
  solvedScenarioIds: string[];
  scenarioAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  recentActivity: {
    id: string;
    title: string;
    type: 'scenario' | 'kural' | 'tutor' | 'forum';
    timestamp: string;
    xpEarned: number;
  }[];
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
  chapterNumber?: number;
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

export interface AIResponse {
  id: string;
  prompt: string;
  ethicalPerspective: string;
  legalPerspective: string;
  relatedKurals: {
    number: number;
    verseTamil: string;
    verseEnglish: string;
    explanation: string;
    connection: string;
  }[];
  modernApplication: string;
  keyTakeaway: string;
  timestamp: string;
  disclaimer: string;
}

export interface RetrievalResult<T> {
  data: T[];
  total: number;
  query?: string;
  page?: number;
  isMockData: boolean;
  notice: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'Question' | 'EthicalConcept' | 'Kural' | 'Chapter' | 'LegalConcept' | 'Scenario' | 'ResponsibleAction' | 'kural' | 'chapter' | 'ethical_concept' | 'legal_concept' | 'scenario' | 'legal_knowledge';
  category?: string;
  details: {
    title: string;
    subtitle?: string;
    description: string;
    meta?: Record<string, string | number>;
    tags?: string[];
  };
  x?: number;
  y?: number;
  color?: string;
  val?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  xp: number;
  streak: number;
  accuracy: number;
  rank: number;
  badgesCount?: number;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  replyCount: number;
  timestamp: string;
  tags: string[];
  audioUrl?: string;
  replies?: DiscussionReply[];
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  institution: string;
  level: number;
  levelTitle: string;
  xp: number;
  casesSolved: number;
  accuracy: number;
  ethicalReasoningScore: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

export interface DiscussionReply {
  id: string;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
  ethicalAngle?: string;
  citedKural?: number;
  audioUrl?: string;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  avatar: string;
  timestamp: string;
  content: string;
  upvotes: number;
  replyCount: number;
  tags: string[];
  relatedKural?: number;
  relatedLegalConcept?: string;
  replies: DiscussionReply[];
  audioUrl?: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'kural-quest'
  | 'scenario-challenge'
  | 'ethics-library'
  | 'ai-tutor'
  | 'research-demo'
  | 'knowledge-graph'
  | 'leaderboard'
  | 'my-progress'
  | 'rewards'
  | 'discussion-forum'
  | 'landing';
