import { NormalizedKural, NormalizedLegalKnowledge } from '../types';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { EmbeddingService } from './embeddingService';

export interface VectorSearchResult<T> {
  item: T;
  score: number;
  matchedConcepts: string[];
}

export class VectorSearchService {
  private static instance: VectorSearchService;
  private preprocessor: DatasetPreprocessor;
  private embeddingService: EmbeddingService;

  // Cached vector indexes
  private kuralVectors: Map<number, Float32Array> = new Map();
  private legalVectors: Map<string, Float32Array> = new Map();
  private isIndexed: boolean = false;

  private constructor() {
    this.preprocessor = DatasetPreprocessor.getInstance();
    this.embeddingService = EmbeddingService.getInstance();
    this.buildIndexes();
  }

  public static getInstance(): VectorSearchService {
    if (!VectorSearchService.instance) {
      VectorSearchService.instance = new VectorSearchService();
    }
    return VectorSearchService.instance;
  }

  private buildIndexes(): void {
    if (this.isIndexed) return;

    // 1. Index Kurals
    for (const kural of this.preprocessor.kurals) {
      const text = `${kural.chapter} ${kural.paal} ${kural.englishVerse} ${kural.englishExplanation} ${kural.concepts.join(' ')} ${kural.keywords.join(' ')} ${kural.metadata.modernRelevance}`;
      const vector = this.embeddingService.generateEmbedding(text);
      this.kuralVectors.set(kural.kuralNumber, vector);
    }

    // 2. Index Legal Knowledge
    for (const legal of this.preprocessor.legalKnowledge) {
      const text = `${legal.question} ${legal.answer} ${legal.category} ${legal.legalConcepts.join(' ')} ${legal.keywords.join(' ')} ${legal.metadata.statute || ''} ${legal.metadata.educationalDisclaimer}`;
      const vector = this.embeddingService.generateEmbedding(text);
      this.legalVectors.set(legal.id, vector);
    }

    this.isIndexed = true;
  }

  /**
   * Performs semantic vector similarity search on Thirukkural corpus
   */
  public searchKurals(query: string, conceptNames: string[], topK: number = 5): VectorSearchResult<NormalizedKural>[] {
    this.buildIndexes();
    const queryVector = this.embeddingService.generateEmbedding(query);
    const results: VectorSearchResult<NormalizedKural>[] = [];

    const lowerQuery = query.toLowerCase();

    for (const kural of this.preprocessor.kurals) {
      const kuralVector = this.kuralVectors.get(kural.kuralNumber);
      if (!kuralVector) continue;

      let score = this.embeddingService.calculateCosineSimilarity(queryVector, kuralVector);

      const matchedConcepts: string[] = [];

      // Concept Boost
      for (const concept of conceptNames) {
        const cLower = concept.toLowerCase();
        if (
          kural.concepts.some((c) => c.toLowerCase().includes(cLower)) ||
          kural.chapter.toLowerCase().includes(cLower)
        ) {
          score += 0.35;
          matchedConcepts.push(concept);
        }
      }

      // Keyword and semantic synonym heuristics
      if (lowerQuery.includes('revenge') || lowerQuery.includes('insult') || lowerQuery.includes('anger')) {
        if ([304, 314, 156, 157, 127, 305, 311].includes(kural.kuralNumber)) {
          score += 0.40;
          matchedConcepts.push('Restraint in Provocation');
        }
      }

      if (lowerQuery.includes('bribe') || lowerQuery.includes('money') || lowerQuery.includes('corrupt')) {
        if ([171, 172, 656, 178, 541].includes(kural.kuralNumber)) {
          score += 0.40;
          matchedConcepts.push('Anti-Corruption');
        }
      }

      if (lowerQuery.includes('bias') || lowerQuery.includes('neutral') || lowerQuery.includes('fair')) {
        if ([111, 118, 541, 547].includes(kural.kuralNumber)) {
          score += 0.40;
          matchedConcepts.push('Impartial Justice');
        }
      }

      if (score > 0.05) {
        results.push({
          item: kural,
          score: Math.min(0.99, score),
          matchedConcepts
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  /**
   * Performs semantic vector similarity search on Indian Legal Knowledge base
   */
  public searchLegal(query: string, conceptNames: string[], topK: number = 4): VectorSearchResult<NormalizedLegalKnowledge>[] {
    this.buildIndexes();
    const queryVector = this.embeddingService.generateEmbedding(query);
    const results: VectorSearchResult<NormalizedLegalKnowledge>[] = [];

    const lowerQuery = query.toLowerCase();

    for (const legal of this.preprocessor.legalKnowledge) {
      const legalVector = this.legalVectors.get(legal.id);
      if (!legalVector) continue;

      let score = this.embeddingService.calculateCosineSimilarity(queryVector, legalVector);

      const matchedConcepts: string[] = [];

      for (const concept of conceptNames) {
        const cLower = concept.toLowerCase();
        if (
          legal.legalConcepts.some((c) => c.toLowerCase().includes(cLower)) ||
          legal.category.toLowerCase().includes(cLower)
        ) {
          score += 0.30;
          matchedConcepts.push(concept);
        }
      }

      if (lowerQuery.includes('revenge') || lowerQuery.includes('insult') || lowerQuery.includes('fight') || lowerQuery.includes('defend')) {
        if (legal.id.includes('CRIM') || legal.legalConcepts.some((c) => c.toLowerCase().includes('defence') || c.toLowerCase().includes('provocation'))) {
          score += 0.35;
          matchedConcepts.push('Criminal Jurisprudence');
        }
      }

      if (lowerQuery.includes('client') || lowerQuery.includes('conflict') || lowerQuery.includes('relative') || lowerQuery.includes('uncle')) {
        if (legal.id.includes('CORP') || legal.id.includes('BCI') || legal.category.includes('Professional')) {
          score += 0.35;
          matchedConcepts.push('Fiduciary Standards');
        }
      }

      if (score > 0.05) {
        results.push({
          item: legal,
          score: Math.min(0.99, score),
          matchedConcepts
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
}
