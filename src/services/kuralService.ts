import { Kural, RetrievalResult } from '../types';

export interface KuralFilterOptions {
  searchQuery?: string;
  paal?: string;
  adhigaram?: string;
  concept?: string;
  limit?: number;
  offset?: number;
}

export const kuralService = {
  /**
   * Retrieves all available Kurals with optional filtering from the backend API
   */
  async getKurals(options: KuralFilterOptions = {}): Promise<RetrievalResult<Kural>> {
    try {
      const params = new URLSearchParams();
      if (options.searchQuery) params.append('search', options.searchQuery);
      if (options.paal && options.paal !== 'All') params.append('paal', options.paal);
      if (options.concept && options.concept !== 'All') params.append('concept', options.concept);
      if (options.adhigaram) params.append('chapter', options.adhigaram);
      if (options.limit) params.append('limit', String(options.limit));

      const res = await fetch(`/api/kurals?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const transformed: Kural[] = json.data.map((item: any) => ({
            id: item.id || item.kuralNumber,
            number: item.kuralNumber || item.id,
            paal: item.paal,
            paalTamil: item.paalTamil || (item.paal === 'Aram' ? 'அறத்துப்பால்' : item.paal === 'Porul' ? 'பொருட்பால்' : 'காமத்துப்பால்'),
            iyal: item.iyal || 'Virtue',
            iyalTamil: item.iyalTamil || '',
            adhigaram: item.chapter || '',
            adhigaramTamil: item.chapterTamil || '',
            verse1Tamil: item.verse1Tamil || item.tamilVerse?.split('\n')[0] || '',
            verse2Tamil: item.verse2Tamil || item.tamilVerse?.split('\n')[1] || '',
            verseTamilFull: item.tamilVerse || '',
            verseEnglish: item.englishVerse || '',
            transliteration: item.transliteration || '',
            explanationTamil: item.tamilExplanation || '',
            explanationEnglish: item.englishExplanation || '',
            ethicalConcept: item.concepts?.[0] || 'Integrity',
            ethicalConceptTamil: 'அறநெறி',
            keywords: item.keywords || [],
            modernRelevance: item.metadata?.modernRelevance || '',
            relatedLegalConcepts: item.metadata?.relatedLegalConcepts || [],
            relatedScenarioIds: item.metadata?.relatedScenarioIds || [],
          }));

          return {
            data: transformed,
            total: json.pagination?.total || transformed.length,
            query: options.searchQuery,
            isMockData: false,
            notice: 'Sourced directly from normalized canonical Thirukkural database & REST API.',
          };
        }
      }
    } catch (err) {
      console.warn('[kuralService] API fetch failed:', err);
    }

    return {
      data: [],
      total: 0,
      query: options.searchQuery,
      isMockData: false,
      notice: 'Justice AI Canonical Dataset',
    };
  },

  /**
   * Retrieves a specific Kural by its number (1..1330)
   */
  async getKuralByNumber(kuralNumber: number): Promise<Kural | null> {
    try {
      const res = await fetch(`/api/kurals/${kuralNumber}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;
          return {
            id: item.id || item.kuralNumber,
            number: item.kuralNumber || item.id,
            paal: item.paal,
            paalTamil: item.paalTamil,
            iyal: item.iyal,
            iyalTamil: item.iyalTamil,
            adhigaram: item.chapter,
            adhigaramTamil: item.chapterTamil,
            verse1Tamil: item.verse1Tamil || item.tamilVerse?.split('\n')[0] || '',
            verse2Tamil: item.verse2Tamil || item.tamilVerse?.split('\n')[1] || '',
            verseTamilFull: item.tamilVerse,
            verseEnglish: item.englishVerse,
            transliteration: item.transliteration,
            explanationTamil: item.tamilExplanation,
            explanationEnglish: item.englishExplanation,
            ethicalConcept: item.concepts?.[0] || 'Virtue',
            ethicalConceptTamil: 'அறநெறி',
            keywords: item.keywords || [],
            modernRelevance: item.metadata?.modernRelevance || '',
            relatedLegalConcepts: item.metadata?.relatedLegalConcepts || [],
            relatedScenarioIds: item.metadata?.relatedScenarioIds || [],
          };
        }
      }
    } catch (err) {
      console.warn('[kuralService] Fetch single kural failed:', err);
    }
    return null;
  },

  /**
   * Returns a featured Kural for daily reflection
   */
  async getDailyKural(): Promise<Kural | null> {
    return await this.getKuralByNumber(118);
  },

  /**
   * Returns recommended Kurals based on user focus
   */
  async getRecommendedKurals(count: number = 3): Promise<Kural[]> {
    const list = await this.getKurals({ limit: count });
    return list.data.slice(0, count);
  },
};

