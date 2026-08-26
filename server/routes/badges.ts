import { Router, Request, Response } from 'express';
import { StorageService } from '../services/storageService';

const router = Router();
const storage = StorageService.getInstance();

/**
 * GET /api/badges
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const badges = storage.getBadges();
    res.json({
      success: true,
      data: badges
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
