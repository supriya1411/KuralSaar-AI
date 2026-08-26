import { Router, Request, Response } from 'express';
import { KnowledgeGraphService } from '../services/knowledgeGraphService';

const router = Router();
const graphService = KnowledgeGraphService.getInstance();

/**
 * GET /api/knowledge-graph or /api/knowledge-graph/stats
 */
router.get(['/', '/stats'], (_req: Request, res: Response) => {
  try {
    const graph = graphService.getKnowledgeGraph();
    res.json({
      success: true,
      data: graph,
      stats: {
        totalNodes: graph.nodes.length,
        totalEdges: graph.edges.length
      }
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
