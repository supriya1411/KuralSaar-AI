import { LegalConcept, EthicalConcept, RetrievalResult } from '../types';

export const legalService = {
  async getLegalConcepts(): Promise<RetrievalResult<LegalConcept>> {
    try {
      const res = await fetch('/api/legal?limit=50');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const transformed: LegalConcept[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.question?.length > 45 ? item.question.slice(0, 45) + '...' : item.question,
            category: item.category?.includes('Criminal') ? 'Criminal / Penal' :
                      item.category?.includes('Constitutional') ? 'Constitutional' :
                      item.category?.includes('Professional') ? 'Professional & Corporate' :
                      item.category?.includes('Civil') ? 'Civil & Human Rights' : 'Professional & Corporate',
            indianLawReference: item.metadata?.statute || item.source || 'Statutory Indian Law',
            description: item.answer,
            ethicalIntersection: `Relates to ${item.legalConcepts?.join(', ') || 'Justice'} with ethical foundations from Thirukkural.`,
            relatedKurals: item.relatedKuralIds?.length ? item.relatedKuralIds : [111, 118, 131, 282, 541]
          }));

          return {
            data: transformed,
            total: json.pagination?.total || transformed.length,
            isMockData: false,
            notice: 'Sourced directly from Indian Legal QA Dataset API.',
          };
        }
      }
    } catch (err) {
      console.warn('[legalService] Fetch error:', err);
    }

    return {
      data: [],
      total: 0,
      isMockData: false,
      notice: 'Indian jurisprudence concepts.',
    };
  },

  async getEthicsCategories(): Promise<EthicalConcept[]> {
    try {
      const res = await fetch('/api/legal/ethics-categories');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[legalService] Error fetching ethics categories:', err);
    }
    return [];
  },

  async getCategoryById(id: string): Promise<EthicalConcept | null> {
    const cats = await this.getEthicsCategories();
    return cats.find((c) => c.id === id) || null;
  },
};

