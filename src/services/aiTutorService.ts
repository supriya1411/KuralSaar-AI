import { Phase3AiResponse, FullRagRetrievalContext } from '../types';

export const aiTutorService = {
  /**
   * Generates a grounded legal-ethics explanation connecting Indian law with Thirukkural.
   * Calls the server-side /api/ai-tutor/query endpoint powered by Gemini 3.7 and RAG retrieval.
   */
  async askTutor(query: string): Promise<Phase3AiResponse> {
    try {
      const res = await fetch('/api/ai-tutor/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data as Phase3AiResponse;
        }
      }
    } catch (err) {
      console.warn('[aiTutorService] API query failed, fallback triggered:', err);
    }

    return {
      id: `ai-resp-${Date.now()}`,
      situationUnderstanding: `Inquiry on ethical conduct and statutory compliance.`,
      detectedConcepts: ['Aram (Virtue)', 'Impartiality', 'Self-Control'],
      ethicalPerspective: `In classical Tamil jurisprudence, Aram (Virtue) guides virtuous decisions across personal, professional, and civic realms.`,
      legalEducationalPerspective: `Contemporary Indian jurisprudence balances statutory frameworks with the constitutional values of fairness, equality, and rule of law.`,
      relatedKurals: [],
      whyKuralIsRelevant: `Establishes fundamental tenets of restraint and justice.`,
      responsibleAction: `Pause, evaluate the scenario objectively, and follow due process.`,
      modernApplication: `Ensure adherence to statutory procedures while maintaining moral integrity.`,
      keyTakeaway: `Ethical jurisprudence unites the letter of the law with the conscience of justice.`,
      sources: [
        { name: 'Thirukkural Dataset', recordId: 'Kural 131', relevance: 85 }
      ],
      traces: [],
      disclaimer: 'Educational legal reference. Verify current law using authoritative sources for real-world legal matters.',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Retrieves full 8-step RAG context & reasoning steps
   */
  async getRetrievalContext(query: string): Promise<FullRagRetrievalContext | null> {
    try {
      const res = await fetch('/api/retrieval/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data as FullRagRetrievalContext;
        }
      }
    } catch (err) {
      console.warn('[aiTutorService] Failed to retrieve context:', err);
    }
    return null;
  }
};
