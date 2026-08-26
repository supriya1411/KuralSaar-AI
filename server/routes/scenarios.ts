import { Router, Request, Response } from 'express';
import { ScenarioService } from '../services/scenarioService';
import { LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';

const router = Router();
const scenarioService = ScenarioService.getInstance();

/**
 * GET /api/scenarios
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const difficulty = (req.query.difficulty as string)?.trim().toLowerCase();
    const category = (req.query.category as string)?.trim().toLowerCase();
    const search = (req.query.search as string)?.trim().toLowerCase();

    let scenarios = scenarioService.getAllScenarios();

    if (difficulty) {
      scenarios = scenarios.filter((s) => s.difficulty.toLowerCase() === difficulty);
    }

    if (category) {
      scenarios = scenarios.filter((s) => s.category.toLowerCase().includes(category));
    }

    if (search) {
      scenarios = scenarios.filter(
        (s) =>
          s.title.toLowerCase().includes(search) ||
          s.description.toLowerCase().includes(search) ||
          s.category.toLowerCase().includes(search)
      );
    }

    res.json({
      success: true,
      data: scenarios,
      disclaimer: LEGAL_DISCLAIMER_TEXT
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * GET /api/scenarios/:id
 */
router.get('/:id', (req: Request, res: Response): void => {
  const scenario = scenarioService.getScenarioById(req.params.id);
  if (!scenario) {
    res.status(404).json({ success: false, error: `Scenario ${req.params.id} not found.` });
    return;
  }

  res.json({
    success: true,
    data: scenario,
    disclaimer: LEGAL_DISCLAIMER_TEXT
  });
});

/**
 * POST /api/scenarios/:id/submit
 * Body: { selectedOption: 'A' | 'B' | 'C' | 'D' }
 */
router.post('/:id/submit', async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedOption } = req.body;
    if (!selectedOption || !['A', 'B', 'C', 'D'].includes(selectedOption)) {
      res.status(400).json({
        success: false,
        error: 'Invalid or missing selectedOption. Must be one of A, B, C, D.'
      });
      return;
    }

    const result = await scenarioService.submitAnswer(req.params.id, selectedOption);

    res.json({
      success: true,
      data: result,
      disclaimer: LEGAL_DISCLAIMER_TEXT
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(400).json({ success: false, error: errorMsg });
  }
});

export default router;
