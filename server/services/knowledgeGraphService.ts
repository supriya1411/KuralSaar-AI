import {
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  KnowledgeGraphResponse
} from '../types';
import { DatasetPreprocessor } from '../preprocessing/datasetPreprocessor';

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
      // Only add edge if both source and target exist
      if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
        edges.push(edge);
      }
    };

    // Color definitions for node types
    const colors = {
      chapter: '#4338CA', // Indigo
      kural: '#3B82F6', // Blue
      ethical_concept: '#059669', // Emerald
      legal_concept: '#D97706', // Amber
      scenario: '#DC2626', // Crimson / Red
      legal_knowledge: '#7C3AED' // Purple
    };

    // 1. Add Chapters & Core Kurals
    const keyKurals = this.preprocessor.kurals.filter((k) =>
      [34, 111, 118, 127, 129, 131, 282, 291, 304, 314, 391, 541, 547, 651, 656, 972].includes(k.kuralNumber)
    );

    const chaptersMap = new Map<string, string>();

    for (const kural of keyKurals) {
      const chapterId = `chapter-${kural.chapterNumber}`;
      if (!chaptersMap.has(chapterId)) {
        chaptersMap.set(chapterId, kural.chapter);
        addNode({
          id: chapterId,
          label: kural.chapter.split('(')[0].trim(),
          type: 'chapter',
          color: colors.chapter,
          val: 24,
          details: {
            chapterNumber: kural.chapterNumber,
            tamilName: kural.chapterTamil,
            paal: kural.paal
          }
        });
      }

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
          paal: kural.paal
        }
      });

      addEdge({
        source: kuralNodeId,
        target: chapterId,
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
          val: 16
        });

        addEdge({
          source: kuralNodeId,
          target: conceptId,
          label: 'TEACHES'
        });
      }
    }

    // 2. Add Legal Knowledge Nodes
    for (const legalItem of this.preprocessor.legalKnowledge) {
      const legalNodeId = `legal-${legalItem.id}`;
      addNode({
        id: legalNodeId,
        label: legalItem.question.slice(0, 32) + '...',
        type: 'legal_knowledge',
        color: colors.legal_knowledge,
        val: 20,
        details: {
          category: legalItem.category,
          statute: legalItem.metadata.statute,
          source: legalItem.source
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
          val: 16
        });

        addEdge({
          source: legalNodeId,
          target: lConceptId,
          label: 'SUPPORTED_BY'
        });
      }
    }

    // 3. Add Scenarios & Cross-Links
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
          category: scen.category,
          difficulty: scen.difficulty
        }
      });

      // Link to Kurals
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

      // Link to Legal Knowledge
      for (const legalId of scen.relatedLegalKnowledgeIds) {
        const legalNodeId = `legal-${legalId}`;
        if (nodeIds.has(legalNodeId)) {
          addEdge({
            source: scenNodeId,
            target: legalNodeId,
            label: 'INVOLVES'
          });
        }
      }

      // Link to Ethical Concepts
      for (const eConcept of scen.ethicalConcepts) {
        const conceptId = `eth-concept-${eConcept.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        if (nodeIds.has(conceptId)) {
          addEdge({
            source: scenNodeId,
            target: conceptId,
            label: 'INVOLVES'
          });
        }
      }

      // Link to Legal Concepts
      for (const lConcept of scen.legalConcepts) {
        const lConceptId = `leg-concept-${lConcept.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        if (nodeIds.has(lConceptId)) {
          addEdge({
            source: scenNodeId,
            target: lConceptId,
            label: 'INVOLVES'
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
