import { Router, Request, Response } from 'express';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';

const router = Router();
const preprocessor = DatasetPreprocessor.getInstance();

/**
 * GET /api/health or /api/datasets
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Justice AI Legal-Ethics Engine',
    datasets: preprocessor.getHealthSummary()
  });
});

/**
 * GET /api/health/datasets or /api/datasets/health or /api/datasets/summary
 */
router.get(['/datasets/health', '/health', '/summary', '/stats'], (_req: Request, res: Response) => {
  try {
    const summary = preprocessor.getHealthSummary();
    res.json({
      success: true,
      data: summary
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
