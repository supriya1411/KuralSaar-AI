import {
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  KnowledgeGraphResponse
} from '../types';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';
import { CHAPTER_DEFINITIONS } from '../data/kuralDataset';

export class KnowledgeGraphService {
  private static instance: KnowledgeGraphService;
  private preprocessor: DatasetPreprocessor;

  private constructor() {
    this.preprocessor = DatasetPreprocessor.getInstance();
  }

  public static getInstance(): KnowledgeGraphService {
    if (!KnowledgeGraphService.instance) {
      KnowledgeGraphService.instance = new KnowledgeGraphService();
    }
    return KnowledgeGraphService.instance;
  }

  public getKnowledgeGraph(): KnowledgeGraphResponse {
    const nodes: KnowledgeGraphNode[] = [];
    const edges: KnowledgeGraphEdge[] = [];
    const nodeIds = new Set<string>();

    const addNode = (node: KnowledgeGraphNode) => {
      if (!nodeIds.has(node.id)) {
        nodeIds.add(node.id);
        nodes.push(node);
      }
    };

    const addEdge = (edge: KnowledgeGraphEdge) => {
      if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
        edges.push(edge);
      }
    };

    // Colors matching the UI schema
    const colors = {
      chapter: '#3B82F6', // Slate / Blue
      kural: '#10B981', // Emerald / Mint
      ethical_concept: '#8B5CF6', // Purple / Violet
      legal_concept: '#0EA5E9', // Sky / Cyan
      scenario: '#F59E0B', // Amber
      legal_knowledge: '#6366F1' // Indigo
    };

    // 1. Add all Chapters
    for (const chapter of CHAPTER_DEFINITIONS) {
      const chapterId = `chapter-${chapter.number}`;
      addNode({
        id: chapterId,
        label: chapter.name.split('(')[0].trim(),
        type: 'chapter',
        color: colors.chapter,
        val: 24,
        details: {
          chapterNumber: chapter.number,
          tamilName: chapter.tamilName,
          paal: chapter.paal,
          concept: chapter.concept
        }
      });
    }

    // 2. Add Key & Representative Kurals
    const keyKuralNumbers = [
      34, 111, 118, 127, 129, 131, 282, 291, 304, 314,
      391, 541, 547, 551, 651, 656, 972, 1, 11, 41, 71,
      101, 151, 161, 171, 181, 191, 201, 211, 221, 241,
      261, 271, 331, 351, 361, 381, 401, 421, 451, 481,
      501, 521, 561, 581, 601, 631, 671, 691, 711, 731,
      761, 781, 801, 821, 851, 881, 911, 931, 951, 991,
      1001, 1021, 1051
    ];

    const kuralsToInclude = this.preprocessor.kurals.filter((k) =>
      keyKuralNumbers.includes(k.kuralNumber)
    );

    for (const kural of kuralsToInclude) {
      const chapterId = `chapter-${kural.chapterNumber}`;
      const kuralNodeId = `kural-${kural.kuralNumber}`;

      addNode({
        id: kuralNodeId,
        label: `Kural ${kural.kuralNumber}`,
        type: 'kural',
        color: colors.kural,
        val: 18,
        details: {
          number: kural.kuralNumber,
          tamilVerse: kural.tamilVerse,
          englishVerse: kural.englishVerse,
          paal: kural.paal,
          chapter: kural.chapter,
          concepts: kural.concepts
        }
      });

      // Chapter -> Kural (or Kural -> Chapter)
      addEdge({
        source: chapterId,
        target: kuralNodeId,
        label: 'BELONGS_TO'
      });

      // Add Ethical Concepts linked to Kural
      for (const concept of kural.concepts) {
        const conceptId = `eth-concept-${concept.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        addNode({
          id: conceptId,
          label: concept,
          type: 'ethical_concept',
          color: colors.ethical_concept,
          val: 16,
          details: {
            conceptName: concept,
            category: kural.paal === 'Aram' ? 'Virtue & Moral Jurisprudence' : 'Governance & Statecraft'
          }
        });

        // Kural -> EthicalConcept: TEACHES
        addEdge({
          source: kuralNodeId,
          target: conceptId,
          label: 'TEACHES'
        });
      }
    }

    // Additional Core Ethical Principles
    const coreEthicalConcepts = [
      { id: 'eth-concept-integrity', label: 'Integrity', relatedKural: 131 },
      { id: 'eth-concept-clean-hands-doctrine', label: 'Clean Hands Doctrine', relatedKural: 111 },
      { id: 'eth-concept-mens-rea', label: 'Mens Rea', relatedKural: 201 },
      { id: 'eth-concept-moral-purity', label: 'Moral Purity', relatedKural: 34 },
      { id: 'eth-concept-impartiality', label: 'Impartiality', relatedKural: 118 },
      { id: 'eth-concept-judicial-equanimity', label: 'Judicial Equanimity', relatedKural: 541 },
      { id: 'eth-concept-legacy', label: 'Legacy', relatedKural: 231 },
      { id: 'eth-concept-accountability', label: 'Accountability', relatedKural: 551 },
      { id: 'eth-concept-balance-of-evidence', label: 'Balance of Evidence', relatedKural: 351 }
    ];

    for (const ec of coreEthicalConcepts) {
      addNode({
        id: ec.id,
        label: ec.label,
        type: 'ethical_concept',
        color: colors.ethical_concept,
        val: 16,
        details: {
          conceptName: ec.label,
          category: 'Core Ethical Jurisprudence'
        }
      });

      const kNodeId = `kural-${ec.relatedKural}`;
      if (nodeIds.has(kNodeId)) {
        addEdge({
          source: kNodeId,
          target: ec.id,
          label: 'TEACHES'
        });
      }
    }

    // 3. Add Legal Knowledge & Legal Concepts
    const ethicalToLegalMapping: Record<string, string[]> = {
      'eth-concept-impartiality': ['Conflict of Interest', 'Fiduciary Duty', 'Nemo Judex In Causa Sua', 'Natural Justice'],
      'eth-concept-integrity': ['Professional Misconduct', 'Anti-Corruption', 'Client Loyalty', 'Fiduciary Duty'],
      'eth-concept-clean-hands-doctrine': ['Conflict of Interest', 'Public Interest Litigation', 'Equity Law'],
      'eth-concept-moral-purity': ['Professional Misconduct', 'Fiduciary Duty'],
      'eth-concept-judicial-equanimity': ['Article 14 Equality', 'Due Process of Law', 'Impartial Adjudication'],
      'eth-concept-accountability': ['Right to Information', 'Whistleblower Protection', 'Prevention of Corruption Act'],
      'eth-concept-balance-of-evidence': ['Burden of Proof', 'Evidentiary Rigor', 'Standard of Proof beyond Reasonable Doubt'],
      'eth-concept-truth': ['Perjury Deterrence', 'Evidentiary Truth', 'Oaths Act']
    };

    for (const legalItem of this.preprocessor.legalKnowledge) {
      const legalNodeId = `legal-${legalItem.id}`;
      addNode({
        id: legalNodeId,
        label: legalItem.question.length > 34 ? legalItem.question.slice(0, 32) + '...' : legalItem.question,
        type: 'legal_knowledge',
        color: colors.legal_knowledge,
        val: 20,
        details: {
          question: legalItem.question,
          answer: legalItem.answer,
          category: legalItem.category,
          statute: legalItem.metadata.statute,
          source: legalItem.source,
          complexity: legalItem.metadata.complexity
        }
      });

      // Add Legal Concepts
      for (const lConcept of legalItem.legalConcepts) {
        const lConceptId = `leg-concept-${lConcept.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        addNode({
          id: lConceptId,
          label: lConcept,
          type: 'legal_concept',
          color: colors.legal_concept,
          val: 16,
          details: {
            conceptName: lConcept,
            statute: legalItem.metadata.statute,
            category: legalItem.category
          }
        });

        // Legal Knowledge -> Legal Concept: SUPPORTED_BY
        addEdge({
          source: legalNodeId,
          target: lConceptId,
          label: 'SUPPORTED_BY'
        });

        // Connect from Ethical Concepts -> Legal Concept: RELATED_TO
        for (const [ethId, legList] of Object.entries(ethicalToLegalMapping)) {
          if (legList.some(item => lConcept.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(lConcept.toLowerCase()))) {
            if (nodeIds.has(ethId) && nodeIds.has(lConceptId)) {
              addEdge({
                source: ethId,
                target: lConceptId,
                label: 'RELATED_TO'
              });
            }
          }
        }
      }
    }

    // Direct semantic connections from Ethical Concept to Legal Concept
    const directConceptLinks: [string, string][] = [
      ['eth-concept-integrity', 'leg-concept-conflict-of-interest'],
      ['eth-concept-integrity', 'leg-concept-fiduciary-duty'],
      ['eth-concept-clean-hands-doctrine', 'leg-concept-conflict-of-interest'],
      ['eth-concept-clean-hands-doctrine', 'leg-concept-fiduciary-duty'],
      ['eth-concept-mens-rea', 'leg-concept-fiduciary-duty'],
      ['eth-concept-moral-purity', 'leg-concept-professional-misconduct'],
      ['eth-concept-impartiality', 'leg-concept-conflict-of-interest'],
      ['eth-concept-impartiality', 'leg-concept-client-loyalty'],
      ['eth-concept-judicial-equanimity', 'leg-concept-professional-misconduct'],
      ['eth-concept-accountability', 'leg-concept-privacy-violation'],
      ['eth-concept-balance-of-evidence', 'leg-concept-digital-harassment'],
      ['eth-concept-legacy', 'leg-concept-cyber-stalking']
    ];

    for (const [sourceEth, targetLeg] of directConceptLinks) {
      if (nodeIds.has(sourceEth) && nodeIds.has(targetLeg)) {
        addEdge({
          source: sourceEth,
          target: targetLeg,
          label: 'RELATED_TO'
        });
      }
    }

    // 4. Add Scenarios
    for (const scen of this.preprocessor.scenarios) {
      const scenNodeId = `scenario-${scen.id}`;
      addNode({
        id: scenNodeId,
        label: `Case ${scen.number}: ${scen.title.slice(0, 24)}...`,
        type: 'scenario',
        color: colors.scenario,
        val: 26,
        details: {
          number: scen.number,
          title: scen.title,
          category: scen.category,
          difficulty: scen.difficulty,
          question: scen.question
        }
      });

      for (const kuralNum of scen.relatedKuralIds) {
        const kuralNodeId = `kural-${kuralNum}`;
        if (nodeIds.has(kuralNodeId)) {
          addEdge({
            source: scenNodeId,
            target: kuralNodeId,
            label: 'RELATED_TO'
          });
        }
      }
    }

    return {
      nodes,
      edges,
      metadata: {
        nodeCount: nodes.length,
        edgeCount: edges.length,
        nodeTypes: Object.keys(colors),
        relationships: ['BELONGS_TO', 'TEACHES', 'RELATED_TO', 'INVOLVES', 'SUPPORTED_BY']
      }
    };
  }
}
