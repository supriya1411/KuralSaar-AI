import { Scenario, RetrievalResult } from '../types';

export const scenarioService = {
  async getAllScenarios(): Promise<RetrievalResult<Scenario>> {
    try {
      const res = await fetch('/api/scenarios');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const transformed: Scenario[] = json.data.map((item: any) => ({
            id: item.id,
            number: item.number,
            title: item.title,
            difficulty: item.difficulty,
            category: item.category,
            summary: item.description?.slice(0, 120) + '...',
            description: item.description,
            question: item.question,
            options: item.options || [],
            correctOptionId: item.correctAnswer || item.correctOptionId || 'B',
            xpReward: item.difficulty === 'Hard' ? 150 : item.difficulty === 'Medium' ? 100 : 75,
            thinkEthicallyHint: item.thinkEthicallyHint,
            ethicalConcepts: item.ethicalConcepts || [],
            legalConcepts: item.legalConcepts || [],
            skillsImproved: item.skillsImproved || [],
            relatedKuralNumber: item.relatedKuralIds?.[0] || item.relatedKuralNumber || 118,
            legalPerspective: item.legalPerspective || {
              title: 'Indian Legal Context',
              statutes: ['Statutory Indian Law'],
              explanation: 'Educational reference.',
              precedentOrCode: 'Section Reference',
              isDisclaimerDemo: true
            },
            ethicalPerspective: item.ethicalPerspective || {
              title: 'Thirukkural Ethical Foundation',
              principles: item.ethicalConcepts || ['Aram'],
              deepDive: 'Ethical wisdom grounded in classical texts.'
            }
          }));

          return {
            data: transformed,
            total: transformed.length,
            isMockData: false,
            notice: 'Sourced directly from Backend Scenario Service.'
          };
        }
      }
    } catch (err) {
      console.warn('[scenarioService] Failed to load scenarios:', err);
    }

    return {
      data: [],
      total: 0,
      isMockData: false,
      notice: 'Justice AI Scenarios',
    };
  },

  async getScenarioById(id: string): Promise<Scenario | null> {
    try {
      const res = await fetch(`/api/scenarios/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;
          return {
            id: item.id,
            number: item.number,
            title: item.title,
            difficulty: item.difficulty,
            category: item.category,
            summary: item.description?.slice(0, 120) + '...',
            description: item.description,
            question: item.question,
            options: item.options || [],
            correctOptionId: item.correctAnswer || item.correctOptionId || 'B',
            xpReward: item.difficulty === 'Hard' ? 150 : item.difficulty === 'Medium' ? 100 : 75,
            thinkEthicallyHint: item.thinkEthicallyHint,
            ethicalConcepts: item.ethicalConcepts || [],
            legalConcepts: item.legalConcepts || [],
            skillsImproved: item.skillsImproved || [],
            relatedKuralNumber: item.relatedKuralIds?.[0] || item.relatedKuralNumber || 118,
            legalPerspective: item.legalPerspective,
            ethicalPerspective: item.ethicalPerspective
          };
        }
      }
    } catch (err) {
      console.warn('[scenarioService] Failed to fetch scenario:', err);
    }
    return null;
  },

  async getScenarioByNumber(num: number): Promise<Scenario | null> {
    const list = await this.getAllScenarios();
    const found = list.data.find((s) => s.number === num);
    return found || null;
  },

  async getTodayScenario(): Promise<Scenario | null> {
    const list = await this.getAllScenarios();
    return list.data[0] || null;
  },

  async submitScenarioAnswer(scenarioId: string, selectedOption: 'A' | 'B' | 'C' | 'D') {
    try {
      const res = await fetch(`/api/scenarios/${scenarioId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOption })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[scenarioService] Error submitting answer to API:', err);
    }
    return null;
  }
};

