import {
  NormalizedKural,
  NormalizedLegalKnowledge,
  NormalizedScenario,
  DatasetHealthResponse,
  PaalType
} from '../types';
import { generateCanonical1330Kurals } from '../data/kuralDataset';
import { RAW_LEGAL_DATASET, LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';
import { SCENARIOS_DATASET } from '../data/scenariosDataset';

export class DatasetPreprocessor {
  private static instance: DatasetPreprocessor;

  public kurals: NormalizedKural[] = [];
  public kuralsMap: Map<number, NormalizedKural> = new Map();

  public legalKnowledge: NormalizedLegalKnowledge[] = [];
  public legalKnowledgeMap: Map<string, NormalizedLegalKnowledge> = new Map();

  public scenarios: NormalizedScenario[] = [];
  public scenariosMap: Map<string, NormalizedScenario> = new Map();

  // Statistics for dataset health monitoring
  public stats = {
    thirukkural: {
      totalRecords: 0,
      validRecords: 0,
      duplicates: 0,
      missingValues: 0,
      fieldsAvailable: [
        'id',
        'kuralNumber',
        'tamilVerse',
        'englishVerse',
        'tamilExplanation',
        'englishExplanation',
        'chapter',
        'chapterTamil',
        'iyal',
        'iyalTamil',
        'paal',
        'paalTamil',
        'concepts',
        'keywords',
        'searchText',
        'metadata'
      ],
      paalsCount: { Aram: 0, Porul: 0, Inbam: 0 } as Record<PaalType, number>,
      chaptersCount: 133
    },
    legalKnowledge: {
      totalRecords: 0,
      validRecords: 0,
      duplicates: 0,
      missingValues: 0,
      fieldsAvailable: [
        'id',
        'question',
        'answer',
        'category',
        'legalConcepts',
        'keywords',
        'source',
        'metadata',
        'searchText'
      ],
      categoriesCount: {} as Record<string, number>
    },
    scenarios: {
      totalRecords: 0,
      validRecords: 0,
      duplicates: 0,
      categoriesCovered: [] as string[]
    }
  };

  private constructor() {
    this.processAllDatasets();
  }

  public static getInstance(): DatasetPreprocessor {
    if (!DatasetPreprocessor.instance) {
      DatasetPreprocessor.instance = new DatasetPreprocessor();
    }
    return DatasetPreprocessor.instance;
  }

  /**
   * Main pipeline to preprocess, deduplicate, and index all datasets
   */
  public processAllDatasets(): void {
    this.processThirukkuralDataset();
    this.processLegalDataset();
    this.processScenariosDataset();
    console.log(
      `[JusticeAI Preprocessor] Successfully initialized ${this.kurals.length} Kurals, ${this.legalKnowledge.length} Legal QA records, and ${this.scenarios.length} Scenarios.`
    );
  }

  /**
   * Ingest, sanitize, deduplicate, and index Thirukkural records
   */
  private processThirukkuralDataset(): void {
    const rawKurals = generateCanonical1330Kurals();
    this.stats.thirukkural.totalRecords = rawKurals.length;
    this.stats.thirukkural.paalsCount = { Aram: 0, Porul: 0, Inbam: 0 };

    const seenNumbers = new Set<number>();
    const sanitizedList: NormalizedKural[] = [];

    for (const raw of rawKurals) {
      if (!raw || typeof raw.kuralNumber !== 'number') {
        this.stats.thirukkural.missingValues++;
        continue;
      }

      // Deduplicate if uploaded or seeded more than once
      if (seenNumbers.has(raw.kuralNumber)) {
        this.stats.thirukkural.duplicates++;
        continue;
      }

      const cleanedTamilVerse = (raw.tamilVerse || '').trim();
      const cleanedEnglishVerse = (raw.englishVerse || '').trim();
      const cleanedTamilExp = (raw.tamilExplanation || '').trim();
      const cleanedEnglishExp = (raw.englishExplanation || '').trim();
      const paal = (raw.paal || 'Aram') as PaalType;

      const keywordsStr = (raw.keywords || []).join(' ');
      const conceptsStr = (raw.concepts || []).join(' ');
      const legalConceptsStr = (raw.metadata?.relatedLegalConcepts || []).join(' ');
      const relevanceStr = raw.metadata?.modernRelevance || '';
      const translitStr = raw.transliteration || '';
      const kuralAliases = `kural ${raw.kuralNumber} kural-${raw.kuralNumber} #${raw.kuralNumber} chapter ${raw.chapterNumber || ''}`;

      const searchText = `${raw.kuralNumber} ${kuralAliases} ${raw.chapter} ${raw.chapterTamil} ${paal} ${conceptsStr} ${keywordsStr} ${cleanedEnglishVerse} ${cleanedTamilVerse} ${cleanedEnglishExp} ${cleanedTamilExp} ${legalConceptsStr} ${relevanceStr} ${translitStr}`.toLowerCase();

      const normalizedKural: NormalizedKural = {
        ...raw,
        tamilVerse: cleanedTamilVerse,
        englishVerse: cleanedEnglishVerse,
        tamilExplanation: cleanedTamilExp,
        englishExplanation: cleanedEnglishExp,
        paal,
        searchText,
        metadata: {
          lineCount: cleanedTamilVerse.split('\n').length || 2,
          wordCount: cleanedEnglishVerse.split(/\s+/).length || 7,
          modernRelevance: raw.metadata?.modernRelevance || `Moral and legal wisdom for ${raw.chapter}.`,
          relatedLegalConcepts: raw.metadata?.relatedLegalConcepts || ['General Jurisprudence'],
          relatedScenarioIds: raw.metadata?.relatedScenarioIds || []
        }
      };

      seenNumbers.add(raw.kuralNumber);
      sanitizedList.push(normalizedKural);
      this.kuralsMap.set(normalizedKural.kuralNumber, normalizedKural);

      if (this.stats.thirukkural.paalsCount[paal] !== undefined) {
        this.stats.thirukkural.paalsCount[paal]++;
      }
    }

    this.kurals = sanitizedList;
    this.stats.thirukkural.validRecords = sanitizedList.length;
  }

  /**
   * Ingest, deduplicate, and normalize Indian Legal Text QA records
   */
  private processLegalDataset(): void {
    const rawItems = RAW_LEGAL_DATASET;
    this.stats.legalKnowledge.totalRecords = rawItems.length;
    this.stats.legalKnowledge.categoriesCount = {};

    const seenIds = new Set<string>();
    const seenQuestionHashes = new Set<string>();
    const sanitizedList: NormalizedLegalKnowledge[] = [];

    for (const raw of rawItems) {
      if (!raw || !raw.id || !raw.question || !raw.answer) {
        this.stats.legalKnowledge.missingValues++;
        continue;
      }

      // Check deduplication both by ID and by normalized Question text
      const normalizedQ = raw.question.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenIds.has(raw.id) || seenQuestionHashes.has(normalizedQ)) {
        this.stats.legalKnowledge.duplicates++;
        continue;
      }

      const category = (raw.category || 'General Legal Principles').trim();
      const normalizedItem: NormalizedLegalKnowledge = {
        id: raw.id.trim(),
        question: raw.question.trim(),
        answer: raw.answer.trim(),
        category,
        legalConcepts: (raw.legalConcepts || []).map((c) => c.trim()),
        keywords: (raw.keywords || []).map((k) => k.trim()),
        source: raw.source.trim(),
        metadata: {
          statute: raw.metadata?.statute || 'Statutory Indian Law',
          sectionCode: raw.metadata?.sectionCode || 'General Provisions',
          educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
          historicalNote: raw.metadata?.historicalNote,
          complexity: raw.metadata?.complexity || 'Intermediate',
          applicability: raw.metadata?.applicability || 'National Jurisdiction'
        },
        searchText: `${raw.id} ${raw.question} ${raw.answer} ${category} ${raw.legalConcepts.join(' ')} ${raw.keywords.join(' ')}`.toLowerCase()
      };

      seenIds.add(raw.id);
      seenQuestionHashes.add(normalizedQ);
      sanitizedList.push(normalizedItem);
      this.legalKnowledgeMap.set(normalizedItem.id, normalizedItem);

      this.stats.legalKnowledge.categoriesCount[category] =
        (this.stats.legalKnowledge.categoriesCount[category] || 0) + 1;
    }

    this.legalKnowledge = sanitizedList;
    this.stats.legalKnowledge.validRecords = sanitizedList.length;
  }

  /**
   * Ingest and validate Scenarios
   */
  private processScenariosDataset(): void {
    const rawScenarios = SCENARIOS_DATASET;
    this.stats.scenarios.totalRecords = rawScenarios.length;

    const seenIds = new Set<string>();
    const categoriesSet = new Set<string>();
    const sanitizedList: NormalizedScenario[] = [];

    for (const raw of rawScenarios) {
      if (!raw || !raw.id || !raw.title || !raw.options || raw.options.length < 2) {
        continue;
      }

      if (seenIds.has(raw.id)) {
        this.stats.scenarios.duplicates++;
        continue;
      }

      seenIds.add(raw.id);
      categoriesSet.add(raw.category);
      sanitizedList.push(raw);
      this.scenariosMap.set(raw.id, raw);
    }

    this.scenarios = sanitizedList;
    this.stats.scenarios.validRecords = sanitizedList.length;
    this.stats.scenarios.categoriesCovered = Array.from(categoriesSet);
  }

  /**
   * Get health and diagnostics payload
   */
  public getHealthSummary(): DatasetHealthResponse {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      datasets: {
        thirukkural: {
          ...this.stats.thirukkural
        },
        legalKnowledge: {
          ...this.stats.legalKnowledge
        },
        scenarios: {
          ...this.stats.scenarios
        }
      },
      legalDisclaimer: LEGAL_DISCLAIMER_TEXT
    };
  }
}
