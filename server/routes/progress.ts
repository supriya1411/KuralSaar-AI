import { Router, Request, Response } from 'express';
import { StorageService } from '../services/storageService';
import { AiLearningInsight } from '../types';

const router = Router();
const storage = StorageService.getInstance();

/**
 * GET /api/progress
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const progress = storage.getProgress();
    res.json({
      success: true,
      data: progress
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * GET /api/progress/insights
 * Generates dynamic AI learning insight from user progress and skill scores
 */
router.get('/insights', (_req: Request, res: Response) => {
  try {
    const progress = storage.getProgress();
    const skills = progress.skills;

    const skillEntries = Object.entries(skills) as [string, number][];
    skillEntries.sort((a, b) => b[1] - a[1]);

    const topSkill = skillEntries[0] || ['ethicalReasoning', 80];
    const lowestSkill = skillEntries[skillEntries.length - 1] || ['professionalEthics', 65];

    const formatSkillName = (s: string) =>
      s.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

    const insight: AiLearningInsight = {
      summary: `Your performance shows robust analytical aptitude in ${formatSkillName(topSkill[0])} (${topSkill[1]}% mastery), with a high consistency streak of ${progress.streakDays} days.`,
      strengths: [
        `Strong grasp of foundational principles in ${formatSkillName(topSkill[0])}`,
        `High accuracy (${progress.accuracyPercentage}%) across ${progress.casesCompleted} evaluated legal-ethical scenarios`,
        `Consistent daily engagement reflected in Level ${progress.level} (${progress.levelTitle})`
      ],
      improvementAreas: [
        `Deepen statutory exposure in ${formatSkillName(lowestSkill[0])} (currently at ${lowestSkill[1]}%)`,
        `Practice multi-factor corporate conflict of interest cases to boost complex decision making`
      ],
      recommendedAction: `Review Kural 118 on Impartiality and attempt Case Scenario #2 to master Fiduciary Duty standards.`,
      suggestedKuralNumber: 118,
      suggestedScenarioId: 'SCEN-002'
    };

    res.json({
      success: true,
      data: insight
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/progress/sync
 */
router.post('/sync', (req: Request, res: Response): void => {
  try {
    const updated = storage.updateProgress(req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/progress/attempt
 */
router.post('/attempt', (req: Request, res: Response): void => {
  try {
    const { scenarioId, scenarioNumber, selectedOption, isCorrect, xpEarned } = req.body;
    if (!scenarioId || !selectedOption) {
      res.status(400).json({ success: false, error: 'scenarioId and selectedOption are required.' });
      return;
    }

    const updated = storage.recordScenarioAttempt({
      scenarioId,
      scenarioNumber: scenarioNumber || 1,
      selectedOption,
      isCorrect: Boolean(isCorrect),
      timestamp: new Date().toISOString(),
      xpEarned: xpEarned || (isCorrect ? 100 : 10),
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/progress/review-kural
 * Body: { kuralNumber: number }
 */
router.post('/review-kural', (req: Request, res: Response): void => {
  try {
    const { kuralNumber } = req.body;
    if (!kuralNumber || typeof kuralNumber !== 'number') {
      res.status(400).json({ success: false, error: 'Valid kuralNumber is required.' });
      return;
    }

    const updated = storage.recordReviewedKural(kuralNumber);
    res.json({
      success: true,
      data: updated
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/progress/bookmark
 * Body: { type: 'kural' | 'scenario' | 'legal', id: string | number }
 */
router.post('/bookmark', (req: Request, res: Response): void => {
  try {
    const { type, id } = req.body;
    if (!type || !id || !['kural', 'scenario', 'legal'].includes(type)) {
      res.status(400).json({ success: false, error: 'Valid type (kural|scenario|legal) and id are required.' });
      return;
    }

    const result = storage.toggleBookmark(type, id);
    res.json({
      success: true,
      data: result
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/progress/reset
 */
router.post('/reset', (_req: Request, res: Response) => {
  try {
    const reset = storage.resetProgress();
    res.json({
      success: true,
      data: reset
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
