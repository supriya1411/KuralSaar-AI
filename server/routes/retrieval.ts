import { Router, Request, Response } from 'express';
import { RetrievalService } from '../services/retrievalService';
import { GeminiTutorService } from '../services/geminiTutorService';
import { LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';

const router = Router();
const retrievalService = RetrievalService.getInstance();
const tutorService = GeminiTutorService.getInstance();

/**
 * GET /api/retrieval/search
 * Query params: q, concept, category, paal, difficulty
 */
router.get('/search', (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string || req.query.query as string)?.trim();
    const concept = (req.query.concept as string)?.trim();
    const category = (req.query.category as string)?.trim();
    const paal = (req.query.paal as string)?.trim();
    const difficulty = (req.query.difficulty as string)?.trim();

    const results = retrievalService.search({
      query,
      concept,
      category,
      paal,
      difficulty,
      limitKurals: 10,
      limitLegal: 8,
      limitScenarios: 6
    });

    res.json({
      success: true,
      data: results,
      disclaimer: LEGAL_DISCLAIMER_TEXT
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/retrieval/context
 * Body: { query: string }
 * Returns full 8-step RAG context & reasoning traces
 */
router.post('/context', (req: Request, res: Response): void => {
  try {
    const { query } = req.body;
    const context = retrievalService.retrieveContext(query || '');
    res.json({
      success: true,
      data: context,
      disclaimer: LEGAL_DISCLAIMER_TEXT
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/ai-tutor/query
 * Body: { prompt?: string, query?: string, message?: string }
 */
router.post('/ai-tutor/query', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawPrompt = req.body.prompt || req.body.query || req.body.message || req.body.input;
    if (!rawPrompt || typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
      res.status(400).json({ success: false, error: 'User prompt is required.' });
      return;
    }

    const response = await tutorService.queryTutor(rawPrompt.trim());
    res.json({
      success: true,
      data: response
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/research-demo/run
 * Body: { query?: string }
 * Returns comprehensive pipeline inspection payload
 */
router.post('/research-demo/run', async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.body.query || 'Someone insulted me and I want revenge. What should I do?';
    const tutorResponse = await tutorService.queryTutor(query);
    const retrievalContext = retrievalService.retrieveContext(query);

    res.json({
      success: true,
      data: {
        query,
        retrieval: retrievalContext,
        aiResponse: tutorResponse
      }
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
