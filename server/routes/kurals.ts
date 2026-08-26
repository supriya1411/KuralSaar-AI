import { Router, Request, Response } from 'express';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { CHAPTER_DEFINITIONS } from '../data/kuralDataset';

const router = Router();
const preprocessor = DatasetPreprocessor.getInstance();

/**
 * GET /api/kurals
 * Query parameters: page, limit, paal, chapterNumber, search, concept
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));
    const paal = (req.query.paal as string)?.trim();
    const chapter = (req.query.chapter as string)?.trim();
    const search = (req.query.search as string)?.trim().toLowerCase();
    const concept = (req.query.concept as string)?.trim().toLowerCase();

    let results = preprocessor.kurals;

    if (paal) {
      results = results.filter((k) => k.paal.toLowerCase() === paal.toLowerCase());
    }

    if (chapter) {
      results = results.filter((k) => k.chapter.toLowerCase().includes(chapter.toLowerCase()) || String(k.chapterNumber) === chapter);
    }

    if (concept) {
      results = results.filter((k) =>
        k.concepts.some((c) => c.toLowerCase().includes(concept)) ||
        k.chapter.toLowerCase().includes(concept)
      );
    }

    if (search) {
      results = results.filter((k) => k.searchText.includes(search));
    }

    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * GET /api/kurals/chapters
 * List of all 133 Adhigarams
 */
router.get('/chapters', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: CHAPTER_DEFINITIONS
  });
});

/**
 * GET /api/kurals/:number
 */
router.get('/:number', (req: Request, res: Response): void => {
  const kuralNum = parseInt(req.params.number, 10);
  if (isNaN(kuralNum)) {
    res.status(400).json({ success: false, error: 'Invalid Kural number.' });
    return;
  }

  const kural = preprocessor.kuralsMap.get(kuralNum);
  if (!kural) {
    res.status(404).json({ success: false, error: `Kural number ${kuralNum} not found.` });
    return;
  }

  res.json({
    success: true,
    data: kural
  });
});

export default router;
