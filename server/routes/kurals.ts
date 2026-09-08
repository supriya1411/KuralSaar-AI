import { Router, Request, Response } from 'express';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { CHAPTER_DEFINITIONS } from '../data/kuralDataset';

const router = Router();
const preprocessor = DatasetPreprocessor.getInstance();

// Strict chapter mappings for core moral and legal concepts
export const CONCEPT_CHAPTER_MAP: Record<string, number[]> = {
  'integrity': [14, 29],
  'justice': [4, 12, 55, 56],
  'anger control': [31],
  'anger': [31],
  'honesty': [30],
  'truth': [30],
  'self-control': [13],
  'self control': [13],
  'leadership': [39, 44, 45, 54],
  'responsibility': [5, 22],
  'duty': [5, 22],
  'conflict resolution': [16, 32],
  'forgiveness': [16],
  'education': [40, 41, 42, 43],
  'learning': [40],
  'friendship': [79, 80, 81],
  'dignity': [97, 98],
  'investigation': [59],
  'speech': [65, 72, 73],
  'charity': [23],
  'compassion': [8, 25],
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * GET /api/kurals
 * Query parameters: page, limit, paal, chapterNumber, search, concept
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(200, Math.max(1, parseInt((req.query.limit as string) || '40', 10)));
    const paal = (req.query.paal as string)?.trim();
    const chapter = (req.query.chapter as string)?.trim();
    const searchRaw = (req.query.search as string)?.trim().toLowerCase();
    const conceptRaw = (req.query.concept as string)?.trim().toLowerCase();

    let results = preprocessor.kurals;

    // 1. Filter by Paal
    if (paal && paal !== 'all') {
      const pNorm = paal.toLowerCase();
      results = results.filter((k) => {
        const kPaal = k.paal.toLowerCase();
        if (kPaal === pNorm) return true;
        if ((pNorm.includes('aram') || pNorm.includes('virtue')) && kPaal === 'aram') return true;
        if ((pNorm.includes('porul') || pNorm.includes('wealth')) && kPaal === 'porul') return true;
        if ((pNorm.includes('inbam') || pNorm.includes('love') || pNorm.includes('kama')) && kPaal === 'inbam') return true;
        return false;
      });
    }

    // 2. Filter by Chapter
    if (chapter) {
      results = results.filter((k) =>
        k.chapter.toLowerCase().includes(chapter.toLowerCase()) ||
        String(k.chapterNumber) === chapter ||
        (k.chapterTamil && k.chapterTamil.includes(chapter))
      );
    }

    // 3. Strict Concept & Topic Filtering
    if (conceptRaw && conceptRaw !== 'all') {
      const c = conceptRaw.toLowerCase().trim();
      const mappedChapters = CONCEPT_CHAPTER_MAP[c];

      if (mappedChapters && mappedChapters.length > 0) {
        // Return strictly the kurals belonging to these mapped chapters plus exact concept matches
        results = results.filter((k) =>
          mappedChapters.includes(k.chapterNumber) ||
          k.concepts.some((cp) => cp.toLowerCase() === c || cp.toLowerCase().includes(c))
        );
      } else {
        // Strict concept match
        results = results.filter((k) =>
          k.concepts.some((cp) => cp.toLowerCase() === c || cp.toLowerCase().includes(c)) ||
          k.chapter.toLowerCase().includes(c)
        );
      }
    }

    // 4. Intelligent Search Query multi-token & fuzzy relevance ranking
    if (searchRaw) {
      const numberMatch = searchRaw.match(/\b(\d{1,4})\b/);
      const searchedKuralNum = numberMatch ? parseInt(numberMatch[1], 10) : null;

      const searchTokens = searchRaw
        .split(/[\s,+/&|#\-_]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0 && t !== 'kural');

      // Check if searchRaw matches or starts with any known concept
      const conceptChapterMatches = new Set<number>();
      for (const [conceptKey, chapters] of Object.entries(CONCEPT_CHAPTER_MAP)) {
        if (
          conceptKey.startsWith(searchRaw) ||
          searchRaw.startsWith(conceptKey) ||
          searchTokens.some((t) => t.length >= 3 && conceptKey.includes(t))
        ) {
          chapters.forEach((ch) => conceptChapterMatches.add(ch));
        }
      }

      const scoredResults = results
        .map((k) => {
          let score = 0;

          // 1. Exact Kural number match
          if (searchedKuralNum !== null && k.kuralNumber === searchedKuralNum) {
            score += 3000;
          }

          // 2. Exact concept-mapped chapter boost
          if (conceptChapterMatches.has(k.chapterNumber)) {
            score += 1000;
          }

          // 3. Exact full phrase match in concepts or chapter
          const searchLower = searchRaw.toLowerCase();
          if (k.chapter.toLowerCase() === searchLower || k.chapterTamil === searchRaw) {
            score += 600;
          } else if (k.chapter.toLowerCase().includes(searchLower)) {
            score += 300;
          }

          if (k.concepts.some((cp) => cp.toLowerCase() === searchLower)) {
            score += 500;
          } else if (k.concepts.some((cp) => cp.toLowerCase().includes(searchLower))) {
            score += 250;
          }

          // 4. Token-by-token strict word boundary matching
          let matchedTokensCount = 0;
          for (const token of searchTokens) {
            const escaped = escapeRegex(token);
            const wordStartRegex = new RegExp(`\\b${escaped}`, 'i');
            const exactWordRegex = new RegExp(`\\b${escaped}\\b`, 'i');

            let matchedForThisToken = false;

            // Check chapter name
            if (exactWordRegex.test(k.chapter) || exactWordRegex.test(k.chapterTamil)) {
              score += 200;
              matchedForThisToken = true;
            } else if (wordStartRegex.test(k.chapter) || wordStartRegex.test(k.chapterTamil)) {
              score += 120;
              matchedForThisToken = true;
            }

            // Check concepts
            if (k.concepts.some((cp) => exactWordRegex.test(cp))) {
              score += 200;
              matchedForThisToken = true;
            } else if (k.concepts.some((cp) => wordStartRegex.test(cp))) {
              score += 120;
              matchedForThisToken = true;
            }

            // Check keywords
            if (k.keywords?.some((kw) => exactWordRegex.test(kw))) {
              score += 150;
              matchedForThisToken = true;
            } else if (k.keywords?.some((kw) => wordStartRegex.test(kw))) {
              score += 90;
              matchedForThisToken = true;
            }

            // Check English & Tamil verses
            if (exactWordRegex.test(k.englishVerse) || exactWordRegex.test(k.tamilVerse)) {
              score += 100;
              matchedForThisToken = true;
            } else if (wordStartRegex.test(k.englishVerse) || wordStartRegex.test(k.tamilVerse)) {
              score += 60;
              matchedForThisToken = true;
            }

            // Check transliteration
            if (k.transliteration && wordStartRegex.test(k.transliteration)) {
              score += 50;
              matchedForThisToken = true;
            }

            if (matchedForThisToken) {
              matchedTokensCount++;
            }
          }

          // Bonus if all tokens matched
          if (searchTokens.length > 1 && matchedTokensCount >= searchTokens.length) {
            score += 200;
          }

          // Require that at least one token actually matched a word start/exact word, or exact number match
          const isMatched = (matchedTokensCount > 0 && score >= 50) || (searchedKuralNum !== null && k.kuralNumber === searchedKuralNum);

          return { kural: k, score, isMatched };
        })
        .filter((item) => item.isMatched)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.kural);

      results = scoredResults;
    }

    // Ensure strict uniqueness by kuralNumber
    const uniqueMap = new Map<number, typeof results[0]>();
    for (const k of results) {
      if (!uniqueMap.has(k.kuralNumber)) {
        uniqueMap.set(k.kuralNumber, k);
      }
    }
    const finalResults = Array.from(uniqueMap.values());

    const total = finalResults.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = finalResults.slice(startIndex, startIndex + limit);

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
