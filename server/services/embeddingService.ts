import { DetectedConcept } from '../types';

export interface ConceptDefinition {
  name: string;
  category: 'Ethical' | 'Legal' | 'Virtue' | 'Cognitive';
  description: string;
  keywords: string[];
  synonyms: string[];
  associatedKurals: number[];
  associatedLegalConcepts: string[];
  tamilName?: string;
}

export const CONCEPT_TAXONOMY: ConceptDefinition[] = [
  {
    name: 'Anger & Wrath Restraint',
    category: 'Ethical',
    description: 'The virtue of subduing fury, rage, and destructive impulsive anger.',
    tamilName: 'வெகுளாமை (Vegulaamai)',
    keywords: ['anger', 'angry', 'rage', 'furious', 'temper', 'fume', 'mad', 'sinam', 'irritation', 'provoke', 'provocation'],
    synonyms: ['wrath', 'hostility', 'indignation', 'resentment', 'hotheadedness'],
    associatedKurals: [304, 305, 306, 307, 301],
    associatedLegalConcepts: ['Private Defence', 'Grave and Sudden Provocation', 'Criminal Intimidation', 'De-escalation']
  },
  {
    name: 'Revenge & Non-Injury',
    category: 'Ethical',
    description: 'Refraining from doing harm even to those who have inflicted pain; overcoming evil with virtue.',
    tamilName: 'இன்னா செய்யாமை (Innaa Seiyaamai)',
    keywords: ['revenge', 'retaliate', 'retaliation', 'payback', 'get back', 'avenge', 'strike back', 'insult', 'insulted', 'harm', 'hurt'],
    synonyms: ['vendetta', 'reprisal', 'vengeance', 'retribution'],
    associatedKurals: [314, 311, 312, 317, 156, 157],
    associatedLegalConcepts: ['Assault', 'Battery', 'Right of Private Defence (BNS)', 'Criminal Liability']
  },
  {
    name: 'Self-Control & Restraint',
    category: 'Virtue',
    description: 'Mastery over the senses, tongue, impulsivity, and desires.',
    tamilName: 'அடக்கம் உடைமை (Adakkam Udaimai)',
    keywords: ['control', 'self-control', 'restraint', 'discipline', 'impulse', 'temperance', 'calm', 'composed', 'cool', 'patience'],
    synonyms: ['sobriety', 'forbearance', 'containment', 'self-mastery'],
    associatedKurals: [121, 122, 126, 127, 129],
    associatedLegalConcepts: ['Professional Conduct', 'Judicial Decorum', 'Advocates Act Standards', 'Ethics']
  },
  {
    name: 'Patience & Forbearance',
    category: 'Virtue',
    description: 'Enduring insults with equanimity and pardoning wrongdoers.',
    tamilName: 'பொறை உடைமை (Porai Udaimai)',
    keywords: ['patience', 'forgive', 'forgiveness', 'pardon', 'endure', 'tolerance', 'insult', 'bear', 'mockery', 'humiliation'],
    synonyms: ['magnanimity', 'leniency', 'clemency', 'tolerance'],
    associatedKurals: [151, 152, 156, 157, 158],
    associatedLegalConcepts: ['Compounding of Offences', 'Plea Bargaining', 'Restorative Justice', 'Mediation']
  },
  {
    name: 'Impartiality & Equal Justice',
    category: 'Legal',
    description: 'Judging without bias, maintaining strict neutrality like the balance beam of a scale.',
    tamilName: 'நடுவுநிலைமை (Naduvunilaimai)',
    keywords: ['fair', 'fairness', 'impartial', 'bias', 'neutral', 'judge', 'justice', 'equality', 'equal', 'favoritism', 'nepotism'],
    synonyms: ['equity', 'natural justice', 'audi alteram partem', 'disinterestedness'],
    associatedKurals: [111, 112, 114, 118, 541, 547],
    associatedLegalConcepts: ['Article 14 Constitution of India', 'Natural Justice (Nemo Judex in Causa Sua)', 'Judicial Impartiality', 'Due Process']
  },
  {
    name: 'Veracity & Whistleblowing',
    category: 'Ethical',
    description: 'Speaking truth that causes no harm, and refusing to harbor deceit or fraudulent concealment.',
    tamilName: 'வாய்மை (Vaaimai)',
    keywords: ['truth', 'honest', 'honesty', 'lie', 'fraud', 'whistleblower', 'expose', 'conceal', 'integrity', 'deceit', 'perjury'],
    synonyms: ['veracity', 'candidness', 'whistleblowing', 'probity'],
    associatedKurals: [291, 292, 293, 297, 300],
    associatedLegalConcepts: ['Whistleblowers Protection Act', 'Perjury (BNS)', 'False Evidence', 'Corporate Governance']
  },
  {
    name: 'Anti-Corruption & Integrity',
    category: 'Legal',
    description: 'Refusal to covet illegitimate wealth, accept bribes, or abuse fiduciary power.',
    tamilName: 'வெஃகாமை (Vegkaamai)',
    keywords: ['bribe', 'bribery', 'corruption', 'speed money', 'greed', 'graft', 'kickback', 'payoff', 'illicit', 'extort'],
    synonyms: ['pecuniary impropriety', 'malfeasance', 'undue advantage'],
    associatedKurals: [171, 172, 175, 178, 656],
    associatedLegalConcepts: ['Prevention of Corruption Act 1988', 'Public Servant Conduct', 'Fiduciary Duty', 'Companies Act 2013']
  },
  {
    name: 'Private Defence & De-escalation',
    category: 'Legal',
    description: 'The proportional right to protect body and property from imminent unlawful harm without vengeance.',
    tamilName: 'தற்காப்பு உரிமை',
    keywords: ['defend', 'defense', 'attack', 'threat', 'assault', 'weapon', 'protect', 'danger', 'imminent', 'proportionality', 'force'],
    synonyms: ['self-defense', 'proportional force', 'justified resistance'],
    associatedKurals: [304, 314, 541],
    associatedLegalConcepts: ['Right of Private Defence (BNS Sec 34-44)', 'Doctrine of Proportionality', 'No Retaliatory Force']
  },
  {
    name: 'Fiduciary Duty & Conflict of Interest',
    category: 'Legal',
    description: 'Obligation of advocates, directors, and trustees to avoid personal gain conflicting with client duty.',
    tamilName: 'தொழில்சார் நேர்மை',
    keywords: ['client', 'advocate', 'conflict', 'lawyer', 'interest', 'bci', 'bar council', 'intern', 'confidential', 'relative', 'judge'],
    synonyms: ['fiduciary obligation', 'undue influence', 'advocate duty', 'recusal'],
    associatedKurals: [118, 119, 541, 651],
    associatedLegalConcepts: ['Bar Council of India Rules Chapter II', 'Advocates Act 1961', 'Conflict of Interest', 'Judicial Recusal']
  },
  {
    name: 'Digital Ethics & Privacy',
    category: 'Legal',
    description: 'Safeguarding personal data, respecting digital consent, and combating cyber intimidation.',
    tamilName: 'தகவல் தனியுரிமை மற்றும் இணைய நெறிமுறைகள்',
    keywords: ['data', 'privacy', 'cyber', 'online', 'leak', 'consent', 'social media', 'troll', 'harass', 'tracking', 'surveillance'],
    synonyms: ['DPDP Act', 'digital personal data', 'informational privacy', 'cyber harassment'],
    associatedKurals: [127, 282, 314],
    associatedLegalConcepts: ['DPDP Act 2023', 'Information Technology Act 2000', 'Right to Privacy (Puttaswamy)', 'Digital Consent']
  },
  {
    name: 'Social Responsibility & Civic Duty',
    category: 'Virtue',
    description: 'Proactive stewardship, assisting victims of accidents, and fulfilling citizen obligations.',
    tamilName: 'ஒப்புரவறிதல் (Oppuravaridhal)',
    keywords: ['help', 'victim', 'accident', 'bystander', 'samaritan', 'civic', 'citizen', 'duty', 'community', 'solidarity', 'assist'],
    synonyms: ['good samaritan', 'altruism', 'prosocial behavior', 'beneficence'],
    associatedKurals: [211, 212, 214, 216],
    associatedLegalConcepts: ['Good Samaritan Guidelines (Supreme Court)', 'Motor Vehicles Act Sec 134A', 'Article 51A Fundamental Duties']
  }
];

export class EmbeddingService {
  private static instance: EmbeddingService;
  private vocabulary: Map<string, number> = new Map();
  private idfMap: Map<string, number> = new Map();

  private constructor() {
    this.buildVocabulary();
  }

  public static getInstance(): EmbeddingService {
    if (!EmbeddingService.instance) {
      EmbeddingService.instance = new EmbeddingService();
    }
    return EmbeddingService.instance;
  }

  private buildVocabulary(): void {
    let index = 0;
    for (const concept of CONCEPT_TAXONOMY) {
      const allTerms = [
        ...concept.name.toLowerCase().split(/\s+/),
        ...concept.description.toLowerCase().split(/\s+/),
        ...concept.keywords,
        ...concept.synonyms,
        ...concept.associatedLegalConcepts.flatMap((c) => c.toLowerCase().split(/\s+/))
      ];

      for (const raw of allTerms) {
        const clean = raw.replace(/[^a-z0-9]/g, '').trim();
        if (clean.length > 2 && !this.vocabulary.has(clean)) {
          this.vocabulary.set(clean, index++);
        }
      }
    }
  }

  /**
   * Detects semantic concepts from user query using multi-factor matching
   */
  public detectConcepts(query: string): DetectedConcept[] {
    const normalized = query.toLowerCase().trim();
    const queryTokens = normalized.split(/\s+/).map((t) => t.replace(/[^a-z0-9]/g, '')).filter((t) => t.length > 1);

    const detected: { concept: ConceptDefinition; confidence: number }[] = [];

    for (const def of CONCEPT_TAXONOMY) {
      let score = 0;

      // 1. Direct keyword match
      for (const kw of def.keywords) {
        if (normalized.includes(kw.toLowerCase())) {
          score += 0.35;
        }
      }

      // 2. Synonym match
      for (const syn of def.synonyms) {
        if (normalized.includes(syn.toLowerCase())) {
          score += 0.30;
        }
      }

      // 3. Name & token overlap
      for (const token of queryTokens) {
        if (def.name.toLowerCase().includes(token)) {
          score += 0.20;
        }
        if (def.description.toLowerCase().includes(token)) {
          score += 0.15;
        }
      }

      // 4. Heuristic intent patterns
      if (normalized.includes('revenge') || normalized.includes('insult') || normalized.includes('payback') || normalized.includes('strike back')) {
        if (def.name.includes('Anger') || def.name.includes('Revenge') || def.name.includes('Self-Control') || def.name.includes('Patience')) {
          score += 0.40;
        }
      }

      if (normalized.includes('conflict') || normalized.includes('uncle') || normalized.includes('intern') || normalized.includes('relative')) {
        if (def.name.includes('Fiduciary') || def.name.includes('Impartiality')) {
          score += 0.45;
        }
      }

      if (normalized.includes('bribe') || normalized.includes('money') || normalized.includes('gift') || normalized.includes('tender')) {
        if (def.name.includes('Anti-Corruption') || def.name.includes('Veracity')) {
          score += 0.45;
        }
      }

      if (normalized.includes('privacy') || normalized.includes('camera') || normalized.includes('data') || normalized.includes('leak')) {
        if (def.name.includes('Digital Ethics')) {
          score += 0.50;
        }
      }

      if (score > 0.25) {
        detected.push({
          concept: def,
          confidence: Math.min(0.99, Math.max(0.40, score))
        });
      }
    }

    // Sort by confidence descending
    detected.sort((a, b) => b.confidence - a.confidence);

    // Fallback if no specific high confidence
    if (detected.length === 0) {
      detected.push({
        concept: CONCEPT_TAXONOMY[4], // Impartiality & Equal Justice
        confidence: 0.55
      });
      detected.push({
        concept: CONCEPT_TAXONOMY[2], // Self-Control & Restraint
        confidence: 0.50
      });
    }

    return detected.slice(0, 5).map((d) => ({
      name: d.concept.name,
      category: d.concept.category,
      confidence: Math.round(d.confidence * 100) / 100,
      synonyms: d.concept.synonyms,
      semanticDescription: d.concept.description
    }));
  }

  /**
   * Generates a sparse normalized embedding vector for a given text
   */
  public generateEmbedding(text: string): Float32Array {
    const vector = new Float32Array(this.vocabulary.size);
    const tokens = text.toLowerCase().split(/\s+/).map((t) => t.replace(/[^a-z0-9]/g, '')).filter((t) => t.length > 2);

    for (const token of tokens) {
      const idx = this.vocabulary.get(token);
      if (idx !== undefined) {
        vector[idx] += 1.0;
      }
    }

    // L2 Normalize
    let norm = 0;
    for (let i = 0; i < vector.length; i++) {
      norm += vector[i] * vector[i];
    }
    norm = Math.sqrt(norm);

    if (norm > 0) {
      for (let i = 0; i < vector.length; i++) {
        vector[i] /= norm;
      }
    }

    return vector;
  }

  /**
   * Calculates cosine similarity between two vector embeddings
   */
  public calculateCosineSimilarity(v1: Float32Array, v2: Float32Array): number {
    if (v1.length !== v2.length) return 0;
    let dot = 0;
    for (let i = 0; i < v1.length; i++) {
      dot += v1[i] * v2[i];
    }
    return Math.max(0, Math.min(1, dot));
  }
}
