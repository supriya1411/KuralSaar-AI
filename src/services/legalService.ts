import { LegalConcept, EthicalConcept, RetrievalResult } from '../types';

export const DEFAULT_ETHICS_CATEGORIES: EthicalConcept[] = [
  {
    id: 'impartiality',
    title: 'Impartiality & Equity',
    tamilTitle: 'நடுவுநிலைமை',
    description: 'Maintaining absolute neutrality and judicial balance without bias or personal interest.',
    icon: 'Scale',
    kuralCount: 10,
    masteryPercentage: 85,
    category: 'Judicial Virtues',
    keyPrinciples: ['Nemo Judex In Causa Sua', 'Equanimity', 'No Conflict of Interest'],
    recommendedKuralIds: [111, 118],
    relatedScenarioIds: ['scen-3']
  },
  {
    id: 'veracity',
    title: 'Veracity & Truthfulness',
    tamilTitle: 'வாய்மை',
    description: 'The foundation of sworn testimony, evidentiary integrity, and anti-perjury laws.',
    icon: 'Flame',
    kuralCount: 10,
    masteryPercentage: 90,
    category: 'Evidentiary Virtues',
    keyPrinciples: ['Oath of Truth', 'Evidentiary Integrity', 'Beneficial Speech'],
    recommendedKuralIds: [291, 298],
    relatedScenarioIds: ['scen-2']
  },
  {
    id: 'propriety',
    title: 'Propriety of Conduct',
    tamilTitle: 'ஒழுக்கமுடைமை',
    description: 'Adhering to professional codes of ethics, advocate duties, and institutional decorum.',
    icon: 'Shield',
    kuralCount: 10,
    masteryPercentage: 78,
    category: 'Professional Ethics',
    keyPrinciples: ['Bar Council Standards', 'Fiduciary Duty', 'Dignity of Office'],
    recommendedKuralIds: [131, 137],
    relatedScenarioIds: ['scen-1']
  },
  {
    id: 'self-control',
    title: 'Self-Control & Restraint',
    tamilTitle: 'அடக்கமுடைமை',
    description: 'Restraint in speech, emotional control during litigation, and judicial temperament.',
    icon: 'Compass',
    kuralCount: 10,
    masteryPercentage: 70,
    category: 'Personal Discipline',
    keyPrinciples: ['Judicial Temperament', 'Restraint', 'Humility'],
    recommendedKuralIds: [121, 127],
    relatedScenarioIds: ['scen-5']
  },
  {
    id: 'compassion',
    title: 'Compassion & Benevolence',
    tamilTitle: 'அருளுடைமை',
    description: 'Humane treatment in criminal justice, human rights preservation, and mercy petitions.',
    icon: 'Heart',
    kuralCount: 10,
    masteryPercentage: 82,
    category: 'Humanitarian Law',
    keyPrinciples: ['Human Rights', 'Restorative Justice', 'Prisoner Welfare'],
    recommendedKuralIds: [241, 247],
    relatedScenarioIds: ['scen-6']
  },
  {
    id: 'righteous-governance',
    title: 'Righteous Governance',
    tamilTitle: 'செங்கோன்மை',
    description: 'Constitutional governance, rule of law, anti-arbitrariness, and administrative justice.',
    icon: 'Crown',
    kuralCount: 10,
    masteryPercentage: 95,
    category: 'Constitutional Virtues',
    keyPrinciples: ['Article 14 Protection', 'Rule of Law', 'Anti-Arbitrariness'],
    recommendedKuralIds: [541, 547],
    relatedScenarioIds: ['scen-4']
  },
  {
    id: 'duty-of-care',
    title: 'Social Duty & Gratitude',
    tamilTitle: 'செய்ந்நன்றியறிதல்',
    description: 'Fiduciary duties, client trust, pro-bono representation, and social responsibility.',
    icon: 'Handshake',
    kuralCount: 10,
    masteryPercentage: 75,
    category: 'Social Responsibilities',
    keyPrinciples: ['Client Trust', 'Pro-Bono Legal Aid', 'Gratitude'],
    recommendedKuralIds: [101, 108],
    relatedScenarioIds: ['scen-7']
  },
  {
    id: 'justice-integrity',
    title: 'Judicial Equanimity',
    tamilTitle: 'நீதிநெறி',
    description: 'Deliberate investigation, evaluating evidence before judgment, and preventing hasty rulings.',
    icon: 'Award',
    kuralCount: 10,
    masteryPercentage: 88,
    category: 'Judicial Virtues',
    keyPrinciples: ['Due Process', 'Audi Alteram Partem', 'Thorough Investigation'],
    recommendedKuralIds: [541, 542],
    relatedScenarioIds: ['scen-3']
  },
  {
    id: 'professional-dignity',
    title: 'Professional Integrity',
    tamilTitle: 'சான்றாண்மை',
    description: 'Maintaining moral stature, anti-corruption standards, and judicial independence.',
    icon: 'Briefcase',
    kuralCount: 10,
    masteryPercentage: 92,
    category: 'Professional Ethics',
    keyPrinciples: ['Judicial Independence', 'Anti-Bribery', 'Moral Stature'],
    recommendedKuralIds: [981, 988],
    relatedScenarioIds: ['scen-1']
  },
  {
    id: 'civil-decorum',
    title: 'Civil Decorum & Courtesy',
    tamilTitle: 'பண்புடைமை',
    description: 'Courtroom etiquette, respect for opposing counsel, witnesses, and bench officers.',
    icon: 'Users',
    kuralCount: 10,
    masteryPercentage: 68,
    category: 'Courtroom Etiquette',
    keyPrinciples: ['Respect for Bench', 'Counsel Decorum', 'Civil Courtesy'],
    recommendedKuralIds: [991, 998],
    relatedScenarioIds: ['scen-8']
  },
  {
    id: 'purity-of-action',
    title: 'Purity of Action & Clean Hands',
    tamilTitle: 'வினைத்தூய்மை',
    description: 'The Clean Hands Doctrine in equity jurisprudence and ethical legal strategy.',
    icon: 'CheckCircle2',
    kuralCount: 10,
    masteryPercentage: 84,
    category: 'Equity Virtues',
    keyPrinciples: ['Clean Hands Doctrine', 'Ethical Strategy', 'No Malice'],
    recommendedKuralIds: [651, 658],
    relatedScenarioIds: ['scen-9']
  },
  {
    id: 'universal-ethics',
    title: 'Universal Moral Duty',
    tamilTitle: 'அறன் வலியுறுத்தல்',
    description: 'Universal jurisprudence, natural law principles, and fundamental ethical duties.',
    icon: 'Globe',
    kuralCount: 10,
    masteryPercentage: 96,
    category: 'Philosophical Foundations',
    keyPrinciples: ['Natural Law', 'Jurisprudential Foundations', 'Universal Virtue'],
    recommendedKuralIds: [31, 38],
    relatedScenarioIds: ['scen-10']
  }
];

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

  async searchKurals(params: {
    query?: string;
    paal?: string;
    concept?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: RetrievedKuralMatch[]; total: number; totalPages: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params.query) searchParams.append('query', params.query);
      if (params.paal) searchParams.append('paal', params.paal);
      if (params.concept) searchParams.append('concept', params.concept);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.limit) searchParams.append('limit', params.limit.toString());

      const res = await fetch(`/api/kurals?${searchParams.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          return {
            data: json.data || [],
            total: json.pagination?.total || 0,
            totalPages: json.pagination?.totalPages || 1
          };
        }
      }
    } catch (err) {
      console.warn('[legalService] Error searching Kurals:', err);
    }

    return { data: [], total: 0, totalPages: 1 };
  },

  async getKuralByNumber(number: number): Promise<RetrievedKuralMatch | null> {
    try {
      const res = await fetch(`/api/kurals/${number}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[legalService] Error fetching Kural by number:', err);
    }
    return null;
  },

  async getEthicsCategories(): Promise<EthicalConcept[]> {
    try {
      const res = await fetch('/api/legal/ethics-categories');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[legalService] Error fetching ethics categories:', err);
    }
    return DEFAULT_ETHICS_CATEGORIES;
  },

  async getCategoryById(id: string): Promise<EthicalConcept | null> {
    const cats = await this.getEthicsCategories();
    return cats.find((c) => c.id === id) || null;
  },
};

