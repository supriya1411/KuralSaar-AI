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

          // Auto-layout positioning engine for multi-tier semantic graph layout
          const yCounters: Record<string, number> = {
            Chapter: 40,
            Question: 40,
            Kural: 40,
            EthicalConcept: 40,
            LegalConcept: 40,
            Scenario: 40,
            ResponsibleAction: 40,
          };

          const xPositions: Record<string, number> = {
            Chapter: 40,
            Question: 40,
            Kural: 260,
            EthicalConcept: 480,
            LegalConcept: 700,
            Scenario: 920,
            ResponsibleAction: 1140,
          };

          const nodes: KnowledgeNode[] = rawNodes.map((n: any) => {
            const type: KnowledgeNode['type'] =
              n.type === 'kural' ? 'Kural' :
              n.type === 'chapter' ? 'Chapter' :
              n.type === 'ethical_concept' ? 'EthicalConcept' :
              n.type === 'legal_concept' ? 'LegalConcept' :
              n.type === 'legal_knowledge' ? 'LegalConcept' :
              n.type === 'scenario' ? 'Scenario' : 'ResponsibleAction';

            const currentY = yCounters[type] || 40;
            yCounters[type] = currentY + 68; // 68px vertical step

            return {
              id: n.id,
              label: n.label,
              type,
              category: n.type,
              x: n.x ?? xPositions[type] ?? 100,
              y: n.y ?? currentY,
              details: {
                title: n.label,
                description: n.details?.description || (n.details?.tamilName ? `Tamil: ${n.details.tamilName} • Paal: ${n.details.paal}` : (n.details?.category || `Node type: ${n.type}`)),
                subtitle: n.details?.statute || n.details?.tamilVerse || '',
                tags: n.details?.keywords || [type, n.type],
                meta: n.details || {}
              }
            };
          });

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

