import { KnowledgeNode, KnowledgeEdge } from '../types';

export const knowledgeGraphService = {
  async getGraphData(): Promise<{ nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }> {
    try {
      const res = await fetch('/api/knowledge-graph');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const rawNodes = json.data.nodes || [];
          const rawEdges = json.data.edges || [];

          const nodes: KnowledgeNode[] = rawNodes.map((n: any) => ({
            id: n.id,
            label: n.label,
            type: n.type === 'kural' ? 'Kural' :
                  n.type === 'chapter' ? 'Chapter' :
                  n.type === 'ethical_concept' ? 'EthicalConcept' :
                  n.type === 'legal_concept' ? 'LegalConcept' :
                  n.type === 'scenario' ? 'Scenario' : 'ResponsibleAction',
            category: n.type,
            details: {
              title: n.label,
              description: n.details?.tamilName ? `Tamil: ${n.details.tamilName} • Paal: ${n.details.paal}` : (n.details?.category || `Node type: ${n.type}`),
              meta: n.details || {}
            }
          }));

          const edges: KnowledgeEdge[] = rawEdges.map((e: any, index: number) => ({
            id: `edge-${index}`,
            source: e.source,
            target: e.target,
            label: e.label
          }));

          return { nodes, edges };
        }
      }
    } catch (err) {
      console.warn('[knowledgeGraphService] API fetch error:', err);
    }

    return {
      nodes: [],
      edges: [],
    };
  },

  async getNodeDetails(nodeId: string): Promise<KnowledgeNode | null> {
    const graph = await this.getGraphData();
    const node = graph.nodes.find((n) => n.id === nodeId);
    return node || null;
  },
};

