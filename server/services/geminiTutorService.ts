import { GoogleGenAI, Type } from '@google/genai';
import { RetrievalService } from './retrievalService';
import { LEGAL_DISCLAIMER_TEXT } from '../data/legalDataset';
import { Phase3AiResponse } from '../types';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

export class GeminiTutorService {
  private static instance: GeminiTutorService;
  private retrievalService: RetrievalService;

  private constructor() {
    this.retrievalService = RetrievalService.getInstance();
  }

  public static getInstance(): GeminiTutorService {
    if (!GeminiTutorService.instance) {
      GeminiTutorService.instance = new GeminiTutorService();
    }
    return GeminiTutorService.instance;
  }

  public async queryTutor(userPrompt: string, lang: 'en' | 'ta' | 'hi' = 'en'): Promise<Phase3AiResponse> {
    // 1. Run full 8-step RAG retrieval
    const retrieval = this.retrievalService.retrieveContext(userPrompt, {
      limitKurals: 3,
      limitLegal: 2,
      limitScenarios: 1
    });

    const ai = getGeminiClient();

    let structuredOutput: Partial<Phase3AiResponse> | null = null;

    const languageInstruction = lang === 'ta'
      ? 'CRITICAL MANDATE: You MUST write your entire JSON response in TAMIL (தமிழ் மொழி). All explanations, ethical perspectives, legal rules, recommendations, and key takeaways must be fully articulated in clear, natural Tamil (தமிழ்).'
      : lang === 'hi'
      ? 'CRITICAL MANDATE: You MUST write your entire JSON response in HINDI (हिंदी भाषा). All explanations, ethical perspectives, legal rules, recommendations, and key takeaways must be fully articulated in clear Hindi (हिंदी).'
      : 'Write your response in clear English.';

    if (ai) {
      try {
        const systemInstruction = `You are "Justice AI Legal-Ethics Tutor", an authoritative educational mentor connecting classical Tamil ethical philosophy (Thirukkural) with modern Indian statutory jurisprudence.

${languageInstruction}

CRITICAL DIRECTIVES:
1. Ground your reasoning strictly on the provided RETRIEVED GROUNDING CONTEXT (Kurals, legal statutes, knowledge graph).
2. Prefer retrieved evidence over unsupported general knowledge.
3. NEVER fabricate Kural numbers, verse lines, or legal section citations. Use only retrieved ones or state they are unavailable.
4. Clearly distinguish Ethical Guidance (Aram / Duty) from Statutory Legal Provisions (BNS, IT Act, Advocates Act, Constitution).
5. Explain legal and ethical concepts in simple, accessible language suitable for civic learners and law students.
6. Admit when retrieved evidence is insufficient: if no exact matching Kural or statute exists, state "No sufficiently relevant Kural/Statute was retrieved."
7. DO NOT provide personalized legal advice, represent yourself as a lawyer or judge, or make definitive legal adjudications.
8. Output MUST be valid JSON conforming to the requested schema.`;

        const userContent = `USER QUESTION:
"${retrieval.normalizedQuery}"

RETRIEVED GROUNDING CONTEXT:
${retrieval.ragPromptContext}

Please synthesize a grounded legal-ethics response in JSON (${lang.toUpperCase()} language).`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: userContent,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                situationUnderstanding: {
                  type: Type.STRING,
                  description: 'Empathic, objective synthesis of the user situation or legal-ethics question.'
                },
                detectedConcepts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of ethical and legal concepts detected.'
                },
                ethicalPerspective: {
                  type: Type.STRING,
                  description: 'Deep philosophical and moral reasoning grounded in Thirukkural virtues.'
                },
                legalEducationalPerspective: {
                  type: Type.STRING,
                  description: 'Educational explanation of relevant Indian statutory provisions and procedures.'
                },
                whyKuralIsRelevant: {
                  type: Type.STRING,
                  description: 'Precise explanation of why the primary retrieved Kural applies to this situation.'
                },
                responsibleAction: {
                  type: Type.STRING,
                  description: 'Constructive, ethical next steps and de-escalation strategies for the individual.'
                },
                modernApplication: {
                  type: Type.STRING,
                  description: 'How this intersection applies in modern corporate, civic, or digital life.'
                },
                keyTakeaway: {
                  type: Type.STRING,
                  description: 'One memorable sentence capturing the ethical and legal essence.'
                }
              },
              required: [
                'situationUnderstanding',
                'detectedConcepts',
                'ethicalPerspective',
                'legalEducationalPerspective',
                'whyKuralIsRelevant',
                'responsibleAction',
                'modernApplication',
                'keyTakeaway'
              ]
            }
          }
        });

        if (response.text) {
          try {
            structuredOutput = JSON.parse(response.text.trim());
            console.log(`[GeminiTutorService] Live Gemini API call succeeded (Language: ${lang})`);
            if (retrieval.traces && retrieval.traces[7]) {
              retrieval.traces[7].details = `Live Gemini generation succeeded in ${lang.toUpperCase()} language.`;
            }
          } catch {
            structuredOutput = null;
          }
        }
      } catch (err) {
        console.warn('[GeminiTutorService] Gemini API call fallback:', err);
      }
    }

    // Deterministic fallback synthesis if Gemini API key absent or parsing failed
    if (!structuredOutput) {
      const topKural = retrieval.kurals[0];
      const topLegal = retrieval.legalKnowledge[0];
      const conceptList = retrieval.detectedConcepts.map((c) => c.name);

      if (lang === 'ta') {
        structuredOutput = {
          situationUnderstanding: `உங்கள் கேள்வி தமிழ் அறநெறி (திருக்குறள்) மற்றும் இந்திய சட்டப் பின்னணி குறித்த ஆய்வு ஆகும்: "${retrieval.normalizedQuery}".`,
          detectedConcepts: conceptList.length > 0 ? conceptList : ['அறம் (Virtue)', 'நடுவுநிலைமை', 'சுயகட்டுப்பாடு'],
          ethicalPerspective: topKural
            ? `திருக்குறளில் ${topKural.chapter} அதிகாரத்தில், வள்ளுவர் கூறுவது: "${topKural.tamilVerse}". நடுவுநிலைமையுடன் செயல்படுவது மனிதனின் உயர்ந்த அறநெறிப் பண்பாகும்.`
            : `தமிழ் அறநெறி தத்துவத்தின்படி, அறம் என்பது நடுவுநிலைமையையும் நேர்மையையும் பேணுவது ஆகும்.`,
          legalEducationalPerspective: topLegal
            ? `இந்திய சட்டத்தின் கீழ் (${topLegal.statute}), அனைத்து குடிமக்களுக்கும் சட்டத்தின் முன் சமத்துவமும் (அரசியலமைப்பு பிரிவு 14) நடைமுறை நீதியும் உறுதி செய்யப்படுகின்றன.`
            : `இந்திய சட்டக் கட்டமைப்பின் கீழ், தன்னிச்சையான நடவடிக்கைகளைத் தடுக்க சட்டத்தின் ஆட்சி நடைமுறைப்படுத்தப்படுகிறது.`,
          whyKuralIsRelevant: topKural ? `குறள் ${topKural.kuralNumber} இந்த அறநெறி கடமையை வலியுறுத்துகிறது.` : `அறநெறி கடமையை வலியுறுத்துகிறது.`,
          responsibleAction: `1. அமைதியுடன் சூழலை ஆராயுங்கள்.\n2. தன்னிச்சையான முடிவுகளைத் தவிர்த்து சட்ட வழிகளைப் பின்பற்றுங்கள்.\n3. நேர்மையையும் அறத்தையும் பேணுங்கள்.`,
          modernApplication: `நவீன நிறுவனங்கள் மற்றும் சமுதாய வாழ்க்கையில் நேர்மையும் நடுவுநிலைமையும் சட்டப் பாதுகாப்பையும் நன்மதிப்பையும் அளிக்கின்றன.`,
          keyTakeaway: `அறமும் நீதியும் இணைந்த வழியே உண்மையான வெற்றியைத் தரும்.`
        };
      } else if (lang === 'hi') {
        structuredOutput = {
          situationUnderstanding: `आपका प्रश्न तिरुक्कुरल नीतिशास्त्र और भारतीय कानूनी संदर्भ पर आधारित है: "${retrieval.normalizedQuery}".`,
          detectedConcepts: conceptList.length > 0 ? conceptList : ['धर्म (Virtue)', 'निष्पक्षता', 'आत्म-नियंत्रण'],
          ethicalPerspective: topKural
            ? `तिरुक्कुरल के अध्याय ${topKural.chapter} में, वल्लुवर सिखाते हैं कि निष्पक्षता ही सच्चा धर्म है। कुरल ${topKural.kuralNumber} आचरण की पवित्रता पर जोर देता है।`
            : `शास्त्रीय भारतीय दर्शन के अनुसार, धर्म हमें निष्पक्ष और सत्यवादी बनने का मार्गदर्शन करता है।`,
          legalEducationalPerspective: topLegal
            ? `भारतीय कानून (${topLegal.statute}) के तहत, कानून के समक्ष समानता (अनुच्छेद 14) और उचित प्रक्रिया की गारंटी दी गई है।`
            : `भारतीय कानूनी ढांचे के तहत कानून का शासन सर्वोपरि है।`,
          whyKuralIsRelevant: topKural ? `कुरल ${topKural.kuralNumber} इस नैतिक कर्तव्य का बोध कराता है।` : `नैतिक कर्तव्य का बोध कराता है।`,
          responsibleAction: `1. धैर्यपूर्वक स्थिति का विश्लेषण करें।\n2. मनमानी कार्रवाई के बजाय कानूनी और नैतिक प्रक्रियाओं का पालन करें।`,
          modernApplication: `आधुनिक जीवन और व्यावसायिक क्षेत्र में सत्यनिष्ठा और निष्पक्षता कानूनी सुरक्षा प्रदान करती है।`,
          keyTakeaway: `सत्य और धर्म ही न्याय का वास्तविक आधार हैं।`
        };
      } else {
        structuredOutput = {
          situationUnderstanding: `Your inquiry explores the intersection of moral accountability and statutory compliance regarding "${retrieval.normalizedQuery}".`,
          detectedConcepts: conceptList.length > 0 ? conceptList : ['Aram (Virtue)', 'Impartiality', 'Self-Control'],
          ethicalPerspective: topKural
            ? `In Thirukkural's Chapter on ${topKural.chapter} (${topKural.paal}), Valluvar establishes that Kural ${topKural.kuralNumber} explicitly teaches: "${topKural.englishVerse}".`
            : `Classical Tamil jurisprudence holds that Aram (Virtue) demands emotional mastery and non-injury.`,
          legalEducationalPerspective: topLegal
            ? `Under Indian law (${topLegal.statute}), all citizens are entitled to equal protection under the law and due process.`
            : `Under the Indian Legal Framework, all citizens are governed by the Rule of Law.`,
          whyKuralIsRelevant: topKural ? topKural.whyRelevant : `Teaches the fundamental duty of restraint.`,
          responsibleAction: `1. Pause and evaluate objectively.\n2. Utilize statutory legal remedies and ethical channels.`,
          modernApplication: `Responding with composure and utilizing formal mediation protects reputation and avoids legal liability.`,
          keyTakeaway: `Patience and proportional restraint disarm hostility; virtue elevates you above conflict.`
        };
      }
    }

    const responseId = `ai-resp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    return {
      id: responseId,
      situationUnderstanding: structuredOutput.situationUnderstanding || 'Understanding of the situation.',
      detectedConcepts: structuredOutput.detectedConcepts || retrieval.detectedConcepts.map((c) => c.name),
      ethicalPerspective: structuredOutput.ethicalPerspective || 'Classical ethical perspective.',
      legalEducationalPerspective: structuredOutput.legalEducationalPerspective || 'Educational statutory perspective.',
      relatedKurals: retrieval.kurals,
      whyKuralIsRelevant: structuredOutput.whyKuralIsRelevant || (retrieval.kurals[0]?.whyRelevant ?? 'Relevant ethical guidance.'),
      responsibleAction: structuredOutput.responsibleAction || 'Act with restraint and due process.',
      modernApplication: structuredOutput.modernApplication || 'Applicable in modern professional and personal settings.',
      keyTakeaway: structuredOutput.keyTakeaway || 'Truth and virtue endure.',
      sources: retrieval.sources,
      traces: retrieval.traces,
      disclaimer: LEGAL_DISCLAIMER_TEXT,
      timestamp: new Date().toISOString()
    };
  }
}
