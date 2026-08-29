import { Router, Request, Response } from 'express';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';

const router = Router();
const preprocessor = DatasetPreprocessor.getInstance();

/**
 * GET /api/legal
 * Query parameters: category, search, concept, page, limit
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));
    const category = (req.query.category as string)?.trim().toLowerCase();
    const search = (req.query.search as string)?.trim().toLowerCase();
    const concept = (req.query.concept as string)?.trim().toLowerCase();

    let results = preprocessor.legalKnowledge;

    if (category) {
      results = results.filter((item) => item.category.toLowerCase().includes(category));
    }

    if (concept) {
      results = results.filter((item) =>
        item.legalConcepts.some((c) => c.toLowerCase().includes(concept))
      );
    }

    if (search) {
      results = results.filter((item) => item.searchText.includes(search));
    }

    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      data: paginated,
      disclaimer: LEGAL_DISCLAIMER_TEXT,
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
 * GET /api/legal/categories
 */
router.get('/categories', (_req: Request, res: Response) => {
  const categories = Object.keys(preprocessor.stats.legalKnowledge.categoriesCount);
  res.json({
    success: true,
    data: categories
  });
});

/**
 * GET /api/legal/ethics-categories
 */
router.get('/ethics-categories', (_req: Request, res: Response) => {
  const ETHICS_CATEGORIES = [
    {
      id: 'cat-righteousness',
      title: 'Righteousness & Integrity',
      tamilTitle: 'அறன் வலியுறுத்தல் (Aran Valiyuruthal)',
      description: 'The foundation of justice and the moral imperative of unwavering honesty in public and personal life.',
      icon: 'Flame',
      kuralCount: 10,
      relatedKurals: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      keyPrinciples: ['Moral Imperative', 'Universal Virtue', 'Absolute Honesty'],
      statutes: ['Constitution of India Art 14', 'Prevention of Corruption Act Sec 7'],
      color: 'indigo',
    },
    {
      id: 'cat-justice',
      title: 'Impartiality & Fairness',
      tamilTitle: 'நடுவு நிலைமை (Naduvunilaimai)',
      description: 'Balancing the scales of judgment without fear or favor, mirroring natural justice principles.',
      icon: 'Scale',
      kuralCount: 10,
      relatedKurals: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
      keyPrinciples: ['Nemo Judex In Causa Sua', 'Equanimity', 'No Conflict of Interest'],
      statutes: ['Principles of Natural Justice', 'Bharatiya Nyaya Sanhita', 'Art 21'],
      color: 'blue',
    },
    {
      id: 'cat-self-control',
      title: 'Self-Control & Restraint',
      tamilTitle: 'அடக்கமுடைமை (Adakkamudaimai)',
      description: 'Disciplining one\'s speech, senses, and desires as a prerequisite for fair deliberation.',
      icon: 'Compass',
      kuralCount: 10,
      relatedKurals: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130],
      keyPrinciples: ['Judicial Temperament', 'Restraint', 'Speech Discipline'],
      statutes: ['Contempt of Courts Act', 'Advocates Act Rules of Decorum'],
      color: 'teal',
    },
    {
      id: 'cat-decorum',
      title: 'Propriety of Conduct',
      tamilTitle: 'ஒழுக்கமுடைமை (Ozhukkamudaimai)',
      description: 'Ethical behavior that upholds professional dignity and community trust above personal convenience.',
      icon: 'Shield',
      kuralCount: 10,
      relatedKurals: [131, 132, 133, 134, 135, 136, 137, 138, 139, 140],
      keyPrinciples: ['Bar Council Standards', 'Fiduciary Duty', 'Dignity of Office'],
      statutes: ['Bar Council of India Standards of Conduct', 'Judicial Code of Ethics'],
      color: 'emerald',
    },
    {
      id: 'cat-forgiveness',
      title: 'Patience & Forbearance',
      tamilTitle: 'பொறையுடைமை (Poraiyudaimai)',
      description: 'Enduring insults and demonstrating restraint in conflict, foundational to mediation and restorative justice.',
      icon: 'Heart',
      kuralCount: 10,
      relatedKurals: [151, 152, 153, 154, 155, 156, 157, 158, 159, 160],
      keyPrinciples: ['Endurance of Insults', 'Non-Retaliation', 'Restorative Justice'],
      statutes: ['Mediation Act 2023', 'Arbitration & Conciliation Act Sec 30'],
      color: 'rose',
    },
    {
      id: 'cat-non-envy',
      title: 'Absence of Malice & Envy',
      tamilTitle: 'அழுக்காறாமை (Azhukkaaraamai)',
      description: 'Eliminating malice, jealousy, and unfair competitive practices that corrupt legal proceedings.',
      icon: 'Crown',
      kuralCount: 10,
      relatedKurals: [161, 162, 163, 164, 165, 166, 167, 168, 169, 170],
      keyPrinciples: ['Elimination of Malice', 'Fair Competition', 'Institutional Probity'],
      statutes: ['Competition Act 2002', 'Professional Non-Poaching & Conflicts'],
      color: 'amber',
    },
    {
      id: 'cat-non-coveting',
      title: 'Non-Covetousness & Integrity',
      tamilTitle: 'வெஃகாமை (Vekkaamai)',
      description: 'Refraining from desiring what belongs to others, foundational to anti-fraud and fiduciary duties.',
      icon: 'Award',
      kuralCount: 10,
      relatedKurals: [171, 172, 173, 174, 175, 176, 177, 178, 179, 180],
      keyPrinciples: ['Refusal of Illicit Gain', 'Anti-Theft', 'Fiduciary Custody'],
      statutes: ['Bharatiya Nyaya Sanhita Sec 316 (Cheating)', 'Companies Act Sec 447'],
      color: 'purple',
    },
    {
      id: 'cat-non-slander',
      title: 'Truthful Speech & Non-Backbiting',
      tamilTitle: 'புறங்கூறாமை (Purankooramai)',
      description: 'Avoiding defamatory remarks and falsehoods behind others\' backs; upholding evidentiary probity.',
      icon: 'CheckCircle2',
      kuralCount: 10,
      relatedKurals: [181, 182, 183, 184, 185, 186, 187, 188, 189, 190],
      keyPrinciples: ['Anti-Defamation', 'Open Candor', 'Probity of Speech'],
      statutes: ['Bharatiya Nyaya Sanhita Sec 356 (Defamation)', 'Bharatiya Sakshya Adhiniyam'],
      color: 'cyan',
    },
    {
      id: 'cat-non-injury',
      title: 'Non-Injury & Harm Prevention',
      tamilTitle: 'இன்னா செய்யாமை (Inna Seyyaamai)',
      description: 'Refusing to cause harm even in response to provocation, reflecting the duty of care in torts.',
      icon: 'Users',
      kuralCount: 10,
      relatedKurals: [311, 312, 313, 314, 315, 316, 317, 318, 319, 320],
      keyPrinciples: ['Duty of Care', 'Harm Prevention', 'Universal Compassion'],
      statutes: ['Law of Torts (Negligence & Duty of Care)', 'BNS Bodily Harm Provisions'],
      color: 'red',
    },
    {
      id: 'cat-truthfulness',
      title: 'Veracity & Truthfulness',
      tamilTitle: 'வாய்மை (Vaaimai)',
      description: 'Speaking truth that produces beneficial outcomes; the cornerstone of testimony under oath.',
      icon: 'Handshake',
      kuralCount: 10,
      relatedKurals: [291, 292, 293, 294, 295, 296, 297, 298, 299, 300],
      keyPrinciples: ['Oath of Truth', 'Evidentiary Integrity', 'Beneficial Speech'],
      statutes: ['Oaths Act 1969', 'Perjury Provisions in BSA/BNS', 'Art 51A'],
      color: 'violet',
    },
    {
      id: 'cat-governance',
      title: 'Righteous Governance & Leadership',
      tamilTitle: 'செங்கோன்மை (Sengolmai)',
      description: 'The duty of rulers and adjudicators to protect the weak and investigate before decreeing.',
      icon: 'Briefcase',
      kuralCount: 10,
      relatedKurals: [541, 542, 543, 544, 545, 546, 547, 548, 549, 550],
      keyPrinciples: ['Rule of Law', 'Equal Protection', 'Anti-Arbitrariness'],
      statutes: ['Administrative Law', 'Judicial Review Art 32 & 226', 'Lokpal Act'],
      color: 'orange',
    },
    {
      id: 'cat-investigation',
      title: 'Diligent Investigation & Evidence',
      tamilTitle: 'தெரிந்து செயல்வகை (Therinthu Seyalvagai)',
      description: 'Acting only after rigorous scrutiny of facts, resources, and consequences.',
      icon: 'Globe',
      kuralCount: 10,
      relatedKurals: [461, 462, 463, 464, 465, 466, 467, 468, 469, 470],
      keyPrinciples: ['Standard of Proof', 'Fact-Finding Diligence', 'Consequential Scrutiny'],
      statutes: ['Bharatiya Nagarik Suraksha Sanhita (BNSS) Investigation Procedures', 'BSA Standard of Proof'],
      color: 'sky',
    },
  ];

  res.json({
    success: true,
    data: ETHICS_CATEGORIES
  });
});

/**
 * GET /api/legal/:id
 */
router.get('/:id', (req: Request, res: Response): void => {
  const item = preprocessor.legalKnowledgeMap.get(req.params.id);
  if (!item) {
    res.status(404).json({ success: false, error: `Legal knowledge item ${req.params.id} not found.` });
    return;
  }

  res.json({
    success: true,
    data: item,
    disclaimer: LEGAL_DISCLAIMER_TEXT
  });
});

export default router;
