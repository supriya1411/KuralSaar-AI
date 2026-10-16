import React, { useState, useEffect, useMemo } from 'react';
import { Kural, KnowledgeNode } from '../../types';
import { kuralService } from '../../services/kuralService';
import { useApp } from '../../context/AppContext';
import { Language } from '../../i18n/translations';
import {
  Sparkles,
  Globe,
  Shield,
  Scale,
  Briefcase,
  Laptop,
  Users
} from 'lucide-react';

export type KuralThemeKey = 'ethical' | 'legal' | 'workplace' | 'cyber' | 'civic';

export interface RingNodeData {
  id: string;
  category: 'saaramsam' | 'theme' | 'values' | 'context' | 'application' | 'keywords' | 'center';
  label: string;
  sublabel: string;
  color: string;
  textColor?: string;
  angleDeg: number; // degrees around circle
  description: string;
  statuteOrContext?: string;
  tags: string[];
}

interface RingKnowledgeGraphProps {
  selectedKuralNumber: number;
  onSelectKuralNumber: (num: number) => void;
  selectedNode: KnowledgeNode | null;
  onSelectNode: (node: KnowledgeNode) => void;
  zoomLevel: number;
  onZoomChange: (newZoom: number) => void;
  isFullscreen?: boolean;
}

// 5 Multi-Themed Perspectives for a Single Kural
const THEME_CONFIGS: Record<
  KuralThemeKey,
  {
    key: KuralThemeKey;
    icon: any;
    color: string;
    ringAccent: string;
    accentBg: string;
    labels: Record<Language, { title: string; subtitle: string }>;
  }
> = {
  ethical: {
    key: 'ethical',
    icon: Shield,
    color: '#16a34a', // Emerald green
    ringAccent: '#22c55e',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    labels: {
      en: { title: 'Ethical & Moral Philosophy', subtitle: 'Ahimsa, Conscience & Mindful Speech' },
      ta: { title: 'அறநெறி & தத்துவம்', subtitle: 'அகிம்சை, மனசாட்சி & நாவடக்கம்' },
      hi: { title: 'नैतिक एवं दार्शनिक सिद्धांत', subtitle: 'अहिंसा, अंतःकरण एवं वाणी संयम' },
    },
  },
  legal: {
    key: 'legal',
    icon: Scale,
    color: '#2563eb', // Royal Blue
    ringAccent: '#3b82f6',
    accentBg: 'bg-blue-50 text-blue-800 border-blue-300',
    labels: {
      en: { title: 'Modern Law & Statutes', subtitle: 'BNS 356, Defamation, Constitution Art 19(2)' },
      ta: { title: 'சட்டம் & அரசியலமைப்பு', subtitle: 'பி.என்.எஸ் 356, அவதூறு, அரசமைப்பு உறுப்பு 19/21' },
      hi: { title: 'विधिक एवं संवैधानिक अधिकार', subtitle: 'बीएनएस 356, मानहानि, संविधान अनुच्छेद 19(2)' },
    },
  },
  workplace: {
    key: 'workplace',
    icon: Briefcase,
    color: '#ea580c', // Warm Amber / Sunset Orange
    ringAccent: '#f97316',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-300',
    labels: {
      en: { title: 'Workplace & Professional Conduct', subtitle: 'POSH, Corporate Civility & Conflict Resolution' },
      ta: { title: 'பணியிட & தொழில்முறை நெறிமுறைகள்', subtitle: 'பணியிடப் பாதுகாப்பு, கண்ணியம் & நிறுவன ஆளுகை' },
      hi: { title: 'कार्यस्थल एवं व्यावसायिक आचरण', subtitle: 'पीओएसएच (POSH), कार्यस्थल मर्यादा व विवाद निवारण' },
    },
  },
  cyber: {
    key: 'cyber',
    icon: Laptop,
    color: '#7c3aed', // Royal Violet / Purple
    ringAccent: '#8b5cf6',
    accentBg: 'bg-purple-50 text-purple-800 border-purple-300',
    labels: {
      en: { title: 'Cyber Law & Digital Ethics', subtitle: 'IT Act Sec 66E/67, Anti-Bullying & Online Slander' },
      ta: { title: 'சைபர் சட்டம் & டிஜிட்டல் அறம்', subtitle: 'ஐடி சட்டம் பிரிவு 66E/67 & இணைய அச்சுறுத்தல் தடுப்பு' },
      hi: { title: 'साइबर कानून एवं डिजिटल नीति', subtitle: 'आईटी एक्ट 66E/67, साइबर बुलिंग व ऑनलाइन बदनामी' },
    },
  },
  civic: {
    key: 'civic',
    icon: Users,
    color: '#db2777', // Hot Pink / Magenta
    ringAccent: '#ec4899',
    accentBg: 'bg-rose-50 text-rose-800 border-rose-300',
    labels: {
      en: { title: 'Civic Responsibility & Harmony', subtitle: 'Public Order, Community Peace & Tolerance' },
      ta: { title: 'குடிமைப் பொறுப்பு & சமூக நல்லிணக்கம்', subtitle: 'பொது அமைதி, நல்லிணக்கம் & சகிப்புத்தன்மை' },
      hi: { title: 'सामाजिक सद्भाव एवं नागरिक दायित्व', subtitle: 'लोक शांति, सहिष्णुता एवं सामाजिक समरसता' },
    },
  },
};

// Localized Category Headers
const CATEGORY_LABELS: Record<
  'saaramsam' | 'theme' | 'values' | 'context' | 'application' | 'keywords' | 'center',
  Record<Language, string>
> = {
  center: {
    en: 'Kural',
    ta: 'குறள்',
    hi: 'कुरल'
  },
  saaramsam: {
    en: 'Saaramsam',
    ta: 'சாராம்சம்',
    hi: 'सारांश'
  },
  theme: {
    en: 'Theme',
    ta: 'கருப்பொருள்',
    hi: 'मूल भाव'
  },
  values: {
    en: 'Values',
    ta: 'மதிப்புகள்',
    hi: 'मूल्य'
  },
  context: {
    en: 'Context',
    ta: 'சூழல்',
    hi: 'संदर्भ'
  },
  application: {
    en: 'Application',
    ta: 'பயன்பாடு',
    hi: 'अनुप्रयोग'
  },
  keywords: {
    en: 'Keywords',
    ta: 'முக்கியச் சொற்கள்',
    hi: 'प्रमुख शब्द'
  }
};

// Clean, authentic presets without the word 'example'
const PRESET_KURALS = [
  { number: 127, titleEn: 'Kural 127', titleTa: 'குறள் 127', titleHi: 'कुरल 127', theme: 'Speech Ethics & Restraint' },
  { number: 41, titleEn: 'Kural 41', titleTa: 'குறள் 41', titleHi: 'कुरल 41', theme: 'Domestic Virtue & Clean Hands' },
  { number: 111, titleEn: 'Kural 111', titleTa: 'குறள் 111', titleHi: 'कुरल 111', theme: 'Impartiality & Natural Justice' },
  { number: 131, titleEn: 'Kural 131', titleTa: 'குறள் 131', titleHi: 'कुरल 131', theme: 'Integrity & Propriety of Conduct' },
  { number: 241, titleEn: 'Kural 241', titleTa: 'குறள் 241', titleHi: 'कुरल 241', theme: 'Universal Compassion & Human Rights' },
  { number: 391, titleEn: 'Kural 391', titleTa: 'குறள் 391', titleHi: 'कुरल 391', theme: 'Flawless Education & Wisdom' },
  { number: 541, titleEn: 'Kural 541', titleTa: 'குறள் 541', titleHi: 'कुरल 541', theme: 'Equal Protection & Just Rule' }
];

// Helper to ensure sublabels fit inside pills and never overflow
function formatSublabel(rawText: string, maxLen = 22): string {
  if (!rawText) return '';
  // Strip outside parentheses
  let cleaned = rawText.replace(/^\(/, '').replace(/\)$/, '').trim();
  // Strip nested brackets like '(domestic life)'
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, '').trim();
  if (cleaned.length > maxLen) {
    cleaned = cleaned.slice(0, maxLen - 1).trim() + '…';
  }
  return `(${cleaned})`;
}

export const RingKnowledgeGraph: React.FC<RingKnowledgeGraphProps> = ({
  selectedKuralNumber,
  onSelectKuralNumber,
  selectedNode,
  onSelectNode,
  zoomLevel,
  onZoomChange
}) => {
  const { language, setLanguage } = useApp();
  const [kural, setKural] = useState<Kural | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRingCategory, setActiveRingCategory] = useState<string>('center');
  const [selectedTheme, setSelectedTheme] = useState<KuralThemeKey>('ethical');

  // Load Kural details whenever selectedKuralNumber changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    kuralService.getKuralByNumber(selectedKuralNumber).then((data) => {
      if (isMounted) {
        setKural(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedKuralNumber]);

  // Multilingual Theme-Specific Node Generator
  const ringNodes: RingNodeData[] = useMemo(() => {
    const isTa = language === 'ta';
    const isHi = language === 'hi';

    // -----------------------------------------------------------------
    // 1. KURAL 41: ILLVAAZHKKAI (DOMESTIC VIRTUE & CIVIC STEWARDSHIP)
    // -----------------------------------------------------------------
    if (selectedKuralNumber === 41) {
      if (selectedTheme === 'ethical') {
        return [
          {
            id: 'ring-saaramsam-41-ethical',
            category: 'saaramsam',
            label: CATEGORY_LABELS.saaramsam[language],
            sublabel: isTa ? '(இல்லற தர்மம்)' : isHi ? '(गृहस्थ धर्म)' : '(Domestic Virtue)',
            color: '#16a34a',
            angleDeg: -140,
            description: isTa
              ? 'இல்லற தர்மம்: இல்வாழ்வான் என்பவன் தவம் செய்வோர், கற்போர், வறியோர் ஆகிய மூவருக்கும் அறவழியில் நின்று துணை நிற்பவனே ஆவான்.'
              : isHi
              ? 'गृहस्थ धर्म: सदाचारी गृहस्थ वह है जो संन्यासियों, विद्यार्थियों एवं असहायों को धर्म के मार्ग पर संबल प्रदान करता है।'
              : 'Domestic Virtue: The householder serves as the primary earthly anchor supporting ascetics, students, and the destitute in virtue.',
            statuteOrContext: isTa ? 'அறத்துப்பால் - இல்லறவியல்' : isHi ? 'धर्म - गृहस्थ आश्रम' : 'Aram - Domestic Virtue',
            tags: ['Illvaazhkkai', 'Domestic Virtue', 'Stewardship', 'Dharma']
          },
          {
            id: 'ring-theme-41-ethical',
            category: 'theme',
            label: CATEGORY_LABELS.theme[language],
            sublabel: isTa ? '(இல்வாழ்க்கை)' : isHi ? '(गृहस्थ जीवन)' : '(Domestic Life)',
            color: '#ea580c',
            angleDeg: -40,
            description: isTa
              ? 'அதிகாரம் 5: இல்வாழ்க்கை - இல்லற நெறியே சமுதாயக் கடமையின் முதன்மையான அடித்தளமாகும்.'
              : isHi
              ? 'अध्याय 5: गृहस्थ जीवन - गृहस्थ आश्रम संपूर्ण समाज के कल्याण और संतुलन की आधारशिला है।'
              : 'Chapter 5: Illvaazhkkai (Domestic Life). The ethical householder sustains all other stations of life.',
            statuteOrContext: isTa ? 'அதிகாரம் 5: இல்வாழ்க்கை' : isHi ? 'अध्याय 5: गृहस्थ जीवन' : 'Chapter 5: Illvaazhkkai',
            tags: ['Theme', 'Illvaazhkkai', 'Domestic Life']
          },
          {
            id: 'ring-values-41-ethical',
            category: 'values',
            label: CATEGORY_LABELS.values[language],
            sublabel: isTa ? '(பொறுப்புணர்வு)' : isHi ? '(कर्तव्यनिष्ठा)' : '(Social Duty)',
            color: '#7e22ce',
            angleDeg: 10,
            description: isTa
              ? 'பொறுப்புணர்வு & தர்மம்: தனக்கென வாழாமல் பிறருக்கு உதவும் ஈகை மற்றும் சமூகத் தொண்டு நெறி.'
              : isHi
              ? 'कर्तव्यनिष्ठा एवं सेवा: स्वार्थ से ऊपर उठकर समाज के आश्रितों एवं जरूरतमंदों की सेवा का संकल्प।'
              : 'Social Responsibility: Cultivating stewardship and selflessness to care for vulnerable members of society.',
            statuteOrContext: isTa ? 'சமூகத் தொண்டு நெறி' : isHi ? 'कर्तव्य परायणता' : 'Values: Altruism & Responsibility',
            tags: ['Values', 'Responsibility', 'Altruism', 'Stewardship']
          },
          {
            id: 'ring-context-41-ethical',
            category: 'context',
            label: CATEGORY_LABELS.context[language],
            sublabel: isTa ? '(குடும்ப ஒழுங்கு)' : isHi ? '(पारिवारिक धर्म)' : '(Family Duties)',
            color: '#0284c7',
            angleDeg: 65,
            description: isTa
              ? 'குடும்பம் & குடிமை ஒழுங்கு: குடும்பப் பொறுப்புகள் மற்றும் மூத்தோர், சார்ந்திருப்போரைப் பாதுகாக்கும் கடமை.'
              : isHi
              ? 'पारिवारिक एवं नागरिक कर्तव्य: परिवार, वृद्धजनों एवं आश्रितों के पोषण से संबंधित सामाजिक एवं नैतिक दायित्व।'
              : 'Family & Civic Law: Moral and statutory duties surrounding the care, maintenance, and support of dependents.',
            statuteOrContext: isTa ? 'குடும்ப நலச் சட்டம்' : isHi ? 'पारिवारिक दायित्व' : 'Context: Family & Maintenance Laws',
            tags: ['Context', 'Family Duty', 'Caregiving']
          },
          {
            id: 'ring-application-41-ethical',
            category: 'application',
            label: CATEGORY_LABELS.application[language],
            sublabel: isTa ? '(கடமை ஆற்றுதல்)' : isHi ? '(कर्तव्य पालन)' : '(Fulfilling Duty)',
            color: '#db2777',
            angleDeg: 125,
            description: isTa
              ? 'கடமை ஆற்றுதல்: அன்றாட வாழ்வில் குடும்ப மற்றும் சமூகப் பொறுப்புகளை நேர்மையுடன் நிறைவேற்றுதல்.'
              : isHi
              ? 'कर्तव्य निर्वहन: दैनिक जीवन में पारिवारिक एवं सामाजिक उत्तरदायित्वों का सत्यनिष्ठा से पालन।'
              : 'Fulfilling Obligations: Harmonizing personal goals with familial caregiving and community assistance.',
            statuteOrContext: isTa ? 'நல்வழி நிற்றல்' : isHi ? 'सदाचरण' : 'Application: Duty Execution',
            tags: ['Application', 'Duty Execution', 'Action']
          },
          {
            id: 'ring-keywords-41-ethical',
            category: 'keywords',
            label: CATEGORY_LABELS.keywords[language],
            sublabel: isTa ? '(அறம், துணை, கடமை)' : isHi ? '(धर्म, संबल, कर्तव्य)' : '(Virtue, Duty, Care)',
            color: '#84cc16',
            angleDeg: 185,
            description: isTa
              ? 'முக்கியச் சொற்கள்: இல்வாழ்வான், நின்ற துணை, நல்வழி, கடமை, அறநெறி.'
              : isHi
              ? 'प्रमुख शब्द: गृहस्थ, संबल, सन्मार्ग, कर्तव्य, धर्म।'
              : 'Key markers: Householder, Support, Righteous Path, Duty, Virtue.',
            statuteOrContext: isTa ? 'சொற்களஞ்சியம்' : isHi ? 'शब्दावली' : 'Lexicon',
            tags: ['Keywords', 'Virtue', 'Duty', 'Support']
          }
        ];
      } else {
        // Legal & Civic perspective for Kural 41
        return [
          {
            id: 'ring-saaramsam-41-legal',
            category: 'saaramsam',
            label: CATEGORY_LABELS.saaramsam[language],
            sublabel: isTa ? '(ஆதரவுக் கடமை)' : isHi ? '(भरण-पोषण दायित्व)' : '(Duty of Support)',
            color: '#2563eb',
            angleDeg: -140,
            description: isTa
              ? 'சார்ந்தோரைப் பாதுகாக்கும் சட்டக் கடமை: பெற்றோர் மற்றும் சார்ந்திருப்போரின் பராமரிப்புச் சட்டம் 2007.'
              : isHi
              ? 'आश्रितों के भरण-पोषण का विधिक दायित्व: माता-पिता एवं वरिष्ठ नागरिक भरण-पोषण अधिनियम 2007।'
              : 'Statutory Support Duty: Legal obligations under Maintenance and Welfare of Parents and Senior Citizens Act 2007.',
            statuteOrContext: 'Senior Citizens Act 2007',
            tags: ['Maintenance Law', 'Senior Citizens', 'Support']
          },
          {
            id: 'ring-theme-41-legal',
            category: 'theme',
            label: CATEGORY_LABELS.theme[language],
            sublabel: isTa ? '(குடிமைப் பொறுப்பு)' : isHi ? '(नागरिक दायित्व)' : '(Civic Duty)',
            color: '#ea580c',
            angleDeg: -40,
            description: isTa
              ? 'அரசமைப்பு உறுப்பு 51A: சமுதாயத்தின் பின்தங்கியோர்க்கு உதவும் அடிப்படைக் குடிமைக் கடமைகள்.'
              : isHi
              ? 'संविधान अनुच्छेद 51A: समाज के दुर्बल वर्गों के प्रति मौलिक नागरिक कर्तव्यों का निर्वहन।'
              : 'Constitutional Duties: Article 51A fundamental duties to render assistance to the vulnerable.',
            statuteOrContext: 'Constitution Art. 51A',
            tags: ['Article 51A', 'Fundamental Duties']
          },
          {
            id: 'ring-values-41-legal',
            category: 'values',
            label: CATEGORY_LABELS.values[language],
            sublabel: isTa ? '(சமூக நீதி)' : isHi ? '(सामाजिक न्याय)' : '(Social Justice)',
            color: '#7e22ce',
            angleDeg: 10,
            description: isTa
              ? 'சமூக நீதி & சமத்துவம்: வறியோர்க்கு மறுவாழ்வு மற்றும் சட்ட உதவி வழங்கும் நற்பண்பு.'
              : isHi
              ? 'सामाजिक न्याय एवं समानता: निर्धनों एवं असहायों को विधिक सहायता व संरक्षण का सिद्धांत।'
              : 'Social Justice: Providing legal aid and protection to economically weaker sections (Article 39A).',
            statuteOrContext: 'Legal Services Authorities Act & Art 39A',
            tags: ['Social Justice', 'Legal Aid', 'Article 39A']
          },
          {
            id: 'ring-context-41-legal',
            category: 'context',
            label: CATEGORY_LABELS.context[language],
            sublabel: isTa ? '(குடும்பச் சட்டம்)' : isHi ? '(पारिवारिक विधि)' : '(Family Law)',
            color: '#0284c7',
            angleDeg: 65,
            description: isTa
              ? 'குடும்பச் சட்டம் & வாரிசுரிமை: குடும்ப உறுப்பினர்களின் பொருளாதாரப் பாதுகாப்பு மற்றும் உரிமைகள்.'
              : isHi
              ? 'पारिवारिक कानून एवं संरक्षण: परिवार के सदस्यों के आर्थिक एवं सामाजिक अधिकारों की विधिक सुरक्षा।'
              : 'Family Welfare Jurisprudence: Institutional support networks and child/elder protection frameworks.',
            statuteOrContext: 'Family Courts Act 1984',
            tags: ['Family Law', 'Protection', 'Courts']
          },
          {
            id: 'ring-application-41-legal',
            category: 'application',
            label: CATEGORY_LABELS.application[language],
            sublabel: isTa ? '(சட்ட இணக்கம்)' : isHi ? '(विधिक अनुपालन)' : '(Legal Caregiving)',
            color: '#db2777',
            angleDeg: 125,
            description: isTa
              ? 'சட்டப்பூர்வ ஆதரவு: மூத்தோர் மற்றும் ஆதரவற்றோருக்கான நலத்திட்டங்களை முறையாகச் செயல்படுத்துதல்.'
              : isHi
              ? 'विधिक सुरक्षा: वरिष्ठ नागरिकों एवं आश्रितों के वैधानिक अधिकारों का सम्मान एवं सुरक्षा।'
              : 'Caregiving Compliance: Ensuring elderly parents and vulnerable dependants are not abandoned or neglected.',
            statuteOrContext: 'Statutory Caregiving Rules',
            tags: ['Caregiving', 'Compliance']
          },
          {
            id: 'ring-keywords-41-legal',
            category: 'keywords',
            label: CATEGORY_LABELS.keywords[language],
            sublabel: isTa ? '(பாதுகாப்பு, சட்டம், உரிமை)' : isHi ? '(संरक्षण, कानून, अधिकार)' : '(Care, Statute, Duty)',
            color: '#84cc16',
            angleDeg: 185,
            description: isTa
              ? 'சட்டச் சொற்கள்: பராமரிப்பு, குடிமைச் சட்டம், குடும்ப நலன், மூத்த குடிமக்கள்.'
              : isHi
              ? 'विधिक शब्द: भरण-पोषण, नागरिक विधि, परिवार, वरिष्ठ नागरिक।'
              : 'Legal terms: Maintenance, Dependent, Senior Citizens, Civic Duty.',
            statuteOrContext: 'Legal Lexicon',
            tags: ['Maintenance', 'Civic Duty', 'Law']
          }
        ];
      }
    }

    // -----------------------------------------------------------------
    // 2. KURAL 127: ADAKKAM UDAIMAI (SELF-CONTROL & SPEECH ETHICS)
    // -----------------------------------------------------------------
    if (selectedKuralNumber === 127 || !kural) {
      if (selectedTheme === 'ethical') {
        return [
          {
            id: 'ring-saaramsam-127-ethical',
            category: 'saaramsam',
            label: CATEGORY_LABELS.saaramsam[language],
            sublabel: isTa ? '(தீங்கின்மை)' : isHi ? '(अहिंसा)' : '(Non-harm)',
            color: '#16a34a',
            angleDeg: -140,
            description: isTa
              ? 'தீங்கின்மை (அகிம்சை & நாவடக்கம்): நாவை அடக்கிக் காக்க வேண்டும்; காக்கத் தவறினால் சொல் குற்றத்தில் சிக்கித் துன்பப்படுவர்.'
              : isHi
              ? 'अहिंसा एवं वाणी संयम: यदि सभी इंद्रियों पर नियंत्रण संभव न हो, तो भी वाणी पर नियंत्रण रखना आवश्यक है; अन्यथा कटु वचन अनर्थकारी होते हैं।'
              : 'Non-harm (Ahimsa & Moral Restraint) through disciplined speech. Guarding one’s tongue prevents irreversible psychological injury and moral harm.',
            statuteOrContext: isTa ? 'அறத்துப்பால் - இல்லறவியல்' : isHi ? 'धर्म - गृहस्थ धर्म' : 'Core Ethical Essence: Ahimsa in Expression',
            tags: ['Saaramsam', 'Non-harm', 'Ahimsa', 'Speech Ethics', 'Adakkam']
          },
          {
            id: 'ring-theme-127-ethical',
            category: 'theme',
            label: CATEGORY_LABELS.theme[language],
            sublabel: isTa ? '(அருளுடைமை)' : isHi ? '(करुणा)' : '(Compassion)',
            color: '#ea580c',
            angleDeg: -40,
            description: isTa
              ? 'அடக்கம் உடைமை (அதிகாரம் 13): நாவடக்கம் என்பது பிறர் மனம் நோகாமல் காக்கும் கருணையின் உயர் வெளிப்பாடு.'
              : isHi
              ? 'आत्म-संयम एवं करुणा (अध्याय 13): वाणी का संयम दूसरों के प्रति वास्तविक करुणा और आत्मीयता का सर्वोच्च प्रमाण है।'
              : 'Compassion & Self-Restraint (Adakkam Udaimai - Chapter 13). Genuine compassion demands suppressing impulsive speech that causes grievance.',
            statuteOrContext: isTa ? 'அதிகாரம் 13: அடக்கம் உடைமை' : isHi ? 'अध्याय 13: आत्म-संयम' : 'Chapter 13: Adakkam Udaimai',
            tags: ['Theme', 'Compassion', 'Adakkam Udaimai', 'Self-Control']
          },
          {
            id: 'ring-values-127-ethical',
            category: 'values',
            label: CATEGORY_LABELS.values[language],
            sublabel: isTa ? '(அன்புடைமை)' : isHi ? '(सहानुभूति)' : '(Kindness)',
            color: '#7e22ce',
            angleDeg: 10,
            description: isTa
              ? 'அன்பு, வாய்மை மற்றும் பொறுப்புணர்வு: பேசும் ஒவ்வொரு சொல்லும் மனித மாண்பை உயர்த்தும் அன்புடனும் நேர்மையுடனும் இருக்க வேண்டும்.'
              : isHi
              ? 'सहानुभूति, दया एवं सत्यनिष्ठा: प्रत्येक शब्द में मानवीय गरिमा और सद्भावना का वास होना चाहिए।'
              : 'Kindness, Truthfulness, and Moral Responsibility. The ethical virtue ensuring spoken discourse upholds human dignity.',
            statuteOrContext: isTa ? 'அன்பு & வாய்மை நெறி' : isHi ? 'सत्य व करुणा मूल्य' : 'Universal Values: Kindness & Civility',
            tags: ['Values', 'Kindness', 'Moral Purity', 'Speech Integrity']
          },
          {
            id: 'ring-context-127-ethical',
            category: 'context',
            label: CATEGORY_LABELS.context[language],
            sublabel: isTa ? '(பணியிடம்)' : isHi ? '(कार्यस्थल)' : '(Workplace)',
            color: '#0284c7',
            angleDeg: 65,
            description: isTa
              ? 'பணியிட மற்றும் சமூகச் சூழல்: கூட்டுப் பணியிடங்களிலும் மக்கள் தொடர்பிலும் வன்முறையற்ற நாகரிக உரையாடலை நிலைநாட்டுதல்.'
              : isHi
              ? 'कार्यस्थल एवं सामाजिक परिवेश: सहकर्मियों एवं समाज के बीच सम्मानजनक और अहिंसक संवाद का वातावरण।'
              : 'Workplace communication and social harmony. Fostering psychological safety and respectful communication in collaborative settings.',
            statuteOrContext: isTa ? 'சமூக நன்னடத்தை சூழல்' : isHi ? 'कार्यस्थल वातावरण' : 'Context: Workplace Civility & Professional Ethics',
            tags: ['Context', 'Workplace', 'Civility', 'Communication']
          },
          {
            id: 'ring-application-127-ethical',
            category: 'application',
            label: CATEGORY_LABELS.application[language],
            sublabel: isTa ? '(சிக்கல் தீர்வு)' : isHi ? '(विवाद निवारण)' : '(Conflict Resolution)',
            color: '#db2777',
            angleDeg: 125,
            description: isTa
              ? 'சிக்கல் தீர்வு: வாக்குவாதங்களின் போது கோபத்தை அடக்கி, நிதானத்துடன் கூடிய பேச்சுவார்த்தை மூலம் பிணக்குகளைத் தீர்த்தல்.'
              : isHi
              ? 'विवाद निवारण: क्रोध के आवेग में कटु शब्दों के प्रयोग से बचकर शांत मध्यस्थता द्वारा मतभेदों को सुलझाना।'
              : 'Conflict Resolution: De-escalating disputes before uncontrolled words inflict lasting damage. Practicing mindful pauses before responding.',
            statuteOrContext: isTa ? 'சிக்கல் தணிப்பு நெறி' : isHi ? 'शांतिपूर्ण समाधान' : 'Application: Mindful Dialogue & De-escalation',
            tags: ['Application', 'Conflict Resolution', 'Mediation', 'De-escalation']
          },
          {
            id: 'ring-keywords-127-ethical',
            category: 'keywords',
            label: CATEGORY_LABELS.keywords[language],
            sublabel: isTa ? '(உதவி, பரிவு, மரியாதை)' : isHi ? '(सहायता, परवाह, सम्मान)' : '(Help, Care, Respect)',
            color: '#84cc16',
            angleDeg: 185,
            description: isTa
              ? 'முக்கியச் சொற்கள்: உதவி, பரிவு, மரியாதை, நாவடக்கம், அஹிம்சை, அறநெறி.'
              : isHi
              ? 'प्रमुख शब्द: सहायता, परवाह, सम्मान, वाणी-संयम, अहिंसा, धर्म।'
              : 'Key markers: Help, Care, Respect, Restraint, Non-harm, Mindful Tongue.',
            statuteOrContext: isTa ? 'சொற்களஞ்சியம்' : isHi ? 'शब्दकोश' : 'Semantic Lexicon: Help, Care, Respect',
            tags: ['Keywords', 'Help', 'Care', 'Respect', 'Restraint']
          }
        ];
      } else {
        // Legal perspective for Kural 127
        return [
          {
            id: 'ring-saaramsam-127-legal',
            category: 'saaramsam',
            label: CATEGORY_LABELS.saaramsam[language],
            sublabel: isTa ? '(பேச்சுரிமை vs அவதூறு)' : isHi ? '(अभिव्यक्ति बनाम मानहानि)' : '(Free Speech vs Slander)',
            color: '#2563eb',
            angleDeg: -140,
            description: isTa
              ? 'அவதூறு மற்றும் பேச்சுரிமை எல்லை: கருத்து சுதந்திரம் (உறுப்பு 19(1)(a)) வரம்பற்றதல்ல; பிறர் நற்பெயரைக் குலைக்கக் கூடாது (உறுப்பு 19(2)).'
              : isHi
              ? 'अभिव्यक्ति की स्वतंत्रता (अनुच्छेद 19(1)(a)) निरंकुश नहीं है; मानहानि से बचाव (अनुच्छेद 19(2)) कानूनी सीमा निर्धारित करता है।'
              : 'Balancing Article 19(1)(a) Free Speech with Article 19(2) Reasonable Restrictions against Criminal Defamation.',
            statuteOrContext: 'Constitution Art. 19(1)(a) & Art. 19(2)',
            tags: ['Free Speech', 'Defamation', 'Article 19(2)', 'Due Process']
          },
          {
            id: 'ring-theme-127-legal',
            category: 'theme',
            label: CATEGORY_LABELS.theme[language],
            sublabel: isTa ? '(மான நஷ்டம் & தற்காப்பு)' : isHi ? '(आपराधिक मानहानि)' : '(Criminal Defamation)',
            color: '#ea580c',
            angleDeg: -40,
            description: isTa
              ? 'பாரதிய நியாய சன்ஹிதா பிரிவு 356 (IPC 499): திட்டமிட்டு பிறர் கௌரவத்திற்கு பங்கம் விளைவிக்கும் அவதூறு சொற்கள் தண்டனைக்குரிய குற்றமாகும்.'
              : isHi
              ? 'भारतीय न्याय संहिता (BNS) धारा 356 (IPC 499): प्रतिष्ठा को जानबूझकर आघात पहुँचाने वाले वक्तव्य दाण्डिक अपराध हैं।'
              : 'BNS Section 356 (Defamation): Untamed false statements causing reputational injury carry criminal and civil liabilities.',
            statuteOrContext: 'BNS 2023 Sec 356 / IPC Sec 499-500',
            tags: ['BNS 356', 'Defamation', 'Reputational Injury']
          },
          {
            id: 'ring-values-127-legal',
            category: 'values',
            label: CATEGORY_LABELS.values[language],
            sublabel: isTa ? '(சட்டத்தின் ஆட்சி)' : isHi ? '(विधि का शासन)' : '(Rule of Law)',
            color: '#7e22ce',
            angleDeg: 10,
            description: isTa
              ? 'சட்டத்தின் ஆட்சி & மனித மாண்பு: அரசமைப்புச் சட்டம் உறுப்பு 21-ன் கீழ் கண்ணியமாக வாழும் உரிமை அனைவருக்கும் உறுதி செய்யப்படுகிறது.'
              : isHi
              ? 'विधि का शासन एवं व्यक्तिगत गरिमा: संविधान अनुच्छेद 21 के अंतर्गत प्रत्येक नागरिक को गरिमापूर्ण जीवन का मौलिक अधिकार है।'
              : 'Rule of Law & Dignity under Article 21. Every individual possesses a constitutional right to reputation as part of personal liberty.',
            statuteOrContext: 'Constitution of India Art. 21',
            tags: ['Rule of Law', 'Article 21', 'Right to Reputation']
          },
          {
            id: 'ring-context-127-legal',
            category: 'context',
            label: CATEGORY_LABELS.context[language],
            sublabel: isTa ? '(நீதிமன்ற நடவடிக்கைகள்)' : isHi ? '(न्यायिक प्रक्रिया)' : '(Judicial Process)',
            color: '#0284c7',
            angleDeg: 65,
            description: isTa
              ? 'நீதிமன்ற வழக்காடல் & சாட்சியச் சட்டம்: சாட்சியங்கள் மற்றும் நீதிமன்ற விசாரணைகளில் ஆதாரமற்ற குற்றச்சாட்டுகளைத் தவிர்த்தல்.'
              : isHi
              ? 'न्यायिक प्रक्रिया एवं साक्ष्य विधि: न्यायालयीन कार्यवाहियों में बिना साक्ष्य के निराधार आक्षेप लगाने से परहेज।'
              : 'Judicial Proceedings & Injunctions against malicious defamatory claims.',
            statuteOrContext: 'Civil Procedure & Specific Relief Act',
            tags: ['Judicial Injunction', 'Evidence Act', 'Legal Safeguards']
          },
          {
            id: 'ring-application-127-legal',
            category: 'application',
            label: CATEGORY_LABELS.application[language],
            sublabel: isTa ? '(சட்டப்படியான இணக்கம்)' : isHi ? '(विधिक अनुपालन)' : '(Statutory Compliance)',
            color: '#db2777',
            angleDeg: 125,
            description: isTa
              ? 'சட்டப்பூர்வ இணக்கம்: பொது மற்றும் ஊடக அறிக்கைகளில் உண்மைத்தன்மையை உறுதி செய்த பின்னரே வெளியிடுதல்.'
              : isHi
              ? 'विधिक अनुपालन: सार्वजनिक बयानों में सत्यता और प्रमाणिकता सुनिश्चित करने के बाद ही प्रसारण।'
              : 'Statutory Compliance: Verifying evidentiary basis before publishing statements to prevent civil tort damages.',
            statuteOrContext: 'Pre-litigation Due Diligence',
            tags: ['Compliance', 'Due Diligence', 'Tort Law']
          },
          {
            id: 'ring-keywords-127-legal',
            category: 'keywords',
            label: CATEGORY_LABELS.keywords[language],
            sublabel: isTa ? '(அவதூறு, வழக்கு, உரிமை)' : isHi ? '(मानहानि, दंड, अधिकार)' : '(Defamation, Statute, Tort)',
            color: '#84cc16',
            angleDeg: 185,
            description: isTa
              ? 'சட்டச் சொற்கள்: அவதூறு, பாரதிய நியாய சன்ஹிதா, தடையுத்தரவு, நஷ்டஈடு, உறுப்பு 19.'
              : isHi
              ? 'विधिक शब्दावली: मानहानि, बीएनएस 356, क्षतिपूर्ति, अनुच्छेद 19, विधिक दायित्व।'
              : 'Legal terms: Defamation, Libel, Slander, Tort Damages, BNS 356, Article 19.',
            statuteOrContext: 'Legal Lexicon: Tortious Liability',
            tags: ['Defamation', 'BNS 356', 'Tort', 'Injunction']
          }
        ];
      }
    }

    // -----------------------------------------------------------------
    // 3. KURAL 111: NADUVUNILAIMAI (IMPARTIALITY & NATURAL JUSTICE)
    // -----------------------------------------------------------------
    if (selectedKuralNumber === 111) {
      return [
        {
          id: 'ring-saaramsam-111',
          category: 'saaramsam',
          label: CATEGORY_LABELS.saaramsam[language],
          sublabel: isTa ? '(நடுவுநிலைமை)' : isHi ? '(निष्पक्षता)' : '(Impartiality)',
          color: '#16a34a',
          angleDeg: -140,
          description: isTa
            ? 'நடுவுநிலைமை: தக்கார் தகவிலர் என்பது அவரவர் எச்சத்தால் காணப்படும். எவரிடத்தும் பக்கச்சார்பின்றி நீதி வழுவாது நிற்றலே அறம்.'
            : isHi
            ? 'निष्पक्षता एवं समभाव: तटस्थ रहकर दोनों पक्षों को समान दृष्टि से देखना ही धर्म और न्याय का मूल मंत्र है।'
            : 'Impartiality & Neutrality: The worthy and unworthy are discerned by their legacy. Equity demands neutrality without bias.',
          statuteOrContext: isTa ? 'அதிகாரம் 12: நடுவுநிலைமை' : isHi ? 'अध्याय 12: निष्पक्षता' : 'Chapter 12: Naduvunilaimai',
          tags: ['Impartiality', 'Neutrality', 'Fairness']
        },
        {
          id: 'ring-theme-111',
          category: 'theme',
          label: CATEGORY_LABELS.theme[language],
          sublabel: isTa ? '(இயற்கை நீதி)' : isHi ? '(नैसर्गिक न्याय)' : '(Natural Justice)',
          color: '#ea580c',
          angleDeg: -40,
          description: isTa
            ? 'இயற்கை நீதி தத்துவம்: தனக்குரிய வழக்கில் தானே நீதிபதியாக இருத்தலாகாது (Nemo Judex In Causa Sua).'
            : isHi
            ? 'नैसर्गिक न्याय का सिद्धांत: कोई भी व्यक्ति अपने ही मामले में न्यायाधीश नहीं हो सकता।'
            : 'Principles of Natural Justice: Nemo Judex In Causa Sua & Audi Alteram Partem.',
          statuteOrContext: 'Constitution Art. 14 & 21',
          tags: ['Natural Justice', 'Nemo Judex', 'Article 14']
        },
        {
          id: 'ring-values-111',
          category: 'values',
          label: CATEGORY_LABELS.values[language],
          sublabel: isTa ? '(சமநீதி மாண்பு)' : isHi ? '(समदृष्टि भाव)' : '(Equity & Balance)',
          color: '#7e22ce',
          angleDeg: 10,
          description: isTa
            ? 'துலாக்கோல் போன்ற சமநிலை: ஒருபுறம் சாயாது நேர்நிற்கும் துலாக்கோல் போன்ற நடுவுநிலைமை.'
            : isHi
            ? 'तुला के समान समता: कांटे की भांति किसी एक ओर न झुककर निष्पक्ष संतुलन बनाए रखना।'
            : 'Judicial Neutrality: Maintaining balance like precision scales without tilting toward wealth or relation.',
          statuteOrContext: 'Bar Council & Judicial Standards',
          tags: ['Judicial Neutrality', 'Integrity', 'Equilibrium']
        },
        {
          id: 'ring-context-111',
          category: 'context',
          label: CATEGORY_LABELS.context[language],
          sublabel: isTa ? '(நீதித்துறை நிர்வாகம்)' : isHi ? '(न्यायिक प्रशासन)' : '(Adjudication)',
          color: '#0284c7',
          angleDeg: 65,
          description: isTa
            ? 'நீதித்துறை நிர்வாகம்: ஆர்வ முரண்பாடு உள்ள வழக்குகளிலிருந்து தாமாகவே விலகிக் கொள்ளுதல் (Recusal).'
            : isHi
            ? 'न्यायिक प्रशासन: हितों के टकराव की स्थिति में मामले से स्वयं को अलग करना (Recusal)।'
            : 'Judicial Recusal: Voluntary recusal when personal interest or relationship conflicts with impartial duty.',
          statuteOrContext: 'Supreme Court Recusal Guidelines',
          tags: ['Recusal', 'Conflict of Interest', 'Judicial Conduct']
        },
        {
          id: 'ring-application-111',
          category: 'application',
          label: CATEGORY_LABELS.application[language],
          sublabel: isTa ? '(சார்பற்ற தீர்ப்பு)' : isHi ? '(निष्पक्ष निर्णय)' : '(Fair Adjudication)',
          color: '#db2777',
          angleDeg: 125,
          description: isTa
            ? 'பக்கச்சார்பற்ற தீர்ப்பு: சாட்சியங்களை ஆராய்ந்து எவ்வித செல்வாக்குக்கும் பணியாமல் நேர்மையான தீர்ப்பு வழங்குதல்.'
            : isHi
            ? 'तटस्थ निर्णय: किसी भी बाह्य प्रभाव से मुक्त होकर केवल साक्ष्यों के आधार पर निर्णय देना।'
            : 'Fair Hearing: Evaluating evidence objectively without bowing to political, familial, or monetary influence.',
          statuteOrContext: 'Objective Due Process',
          tags: ['Fair Hearing', 'Adjudication', 'Integrity']
        },
        {
          id: 'ring-keywords-111',
          category: 'keywords',
          label: CATEGORY_LABELS.keywords[language],
          sublabel: isTa ? '(துலாக்கோல், சமம், நீதி)' : isHi ? '(तुला, समानता, न्याय)' : '(Scales, Equity, Truth)',
          color: '#84cc16',
          angleDeg: 185,
          description: isTa
            ? 'முக்கியச் சொற்கள்: துலாக்கோல், சமன்செய்து, நடுவுநிலை, இயற்கை நீதி, நேர்மை.'
            : isHi
            ? 'प्रमुख शब्द: तुला, निष्पक्षता, समभाव, नैसर्गिक न्याय, सत्य।'
            : 'Keywords: Balance, Impartiality, Natural Justice, Equality, Neutrality.',
          statuteOrContext: 'Lexicon: Neutrality',
          tags: ['Scales', 'Neutrality', 'Justice']
        }
      ];
    }

    // -----------------------------------------------------------------
    // 4. DYNAMIC GENERATOR FOR ALL OTHER 1,330 KURALS
    // -----------------------------------------------------------------
    const chapterName = isTa
      ? kural.adhigaramTamil || kural.adhigaram.split('(')[0].trim()
      : isHi
      ? kural.adhigaram.split('(')[0].trim()
      : kural.adhigaram.split('(')[0].trim();

    const paalName = isTa ? kural.paalTamil : isHi ? (kural.paal === 'Aram' ? 'धर्म' : kural.paal === 'Porul' ? 'अर्थ' : 'काम') : kural.paal;

    // Cleaned multilingual concept mapping
    const rawConcept = kural.ethicalConcept || 'Virtue';
    const cleanConceptTa = kural.ethicalConceptTamil && kural.ethicalConceptTamil !== 'அறநெறி'
      ? kural.ethicalConceptTamil
      : chapterName;
    const cleanConceptHi = kural.ethicalConcept || 'धर्म एवं सदाचार';
    const primaryConcept = isTa ? cleanConceptTa : isHi ? cleanConceptHi : rawConcept;

    // Clean keywords (extract first 2 clean words without brackets/parens)
    let kwTa = 'அறம், கடமை, வாய்மை';
    let kwHi = 'धर्म, कर्तव्य, सत्य';
    let kwEn = 'Virtue, Duty, Truth';

    if (kural.tamilVerse) {
      const words = kural.tamilVerse.split(/\s+/).filter(w => w.length > 2);
      if (words.length >= 2) {
        kwTa = `${words[0]}, ${words[1]}`;
      }
    }
    if (kural.keywords && kural.keywords.length > 0) {
      const firstKw = kural.keywords[0].replace(/\s*\([^)]*\)/g, '').trim();
      kwEn = firstKw.length > 18 ? firstKw.slice(0, 18) : firstKw;
      kwHi = `${paalName}, ${chapterName}`;
    }

    const themeColors: Record<KuralThemeKey, string> = {
      ethical: '#16a34a',
      legal: '#2563eb',
      workplace: '#ea580c',
      cyber: '#7c3aed',
      civic: '#db2777'
    };

    const currentColor = themeColors[selectedTheme];

    return [
      {
        id: `ring-saaramsam-${kural.number}-${selectedTheme}`,
        category: 'saaramsam',
        label: CATEGORY_LABELS.saaramsam[language],
        sublabel: formatSublabel(primaryConcept),
        color: currentColor,
        angleDeg: -140,
        description: isTa
          ? (kural.explanationTamil || kural.verseTamilFull)
          : (kural.explanationEnglish || kural.verseEnglish),
        statuteOrContext: `${paalName} • ${chapterName}`,
        tags: ['Saaramsam', primaryConcept, kural.paal]
      },
      {
        id: `ring-theme-${kural.number}-${selectedTheme}`,
        category: 'theme',
        label: CATEGORY_LABELS.theme[language],
        sublabel: formatSublabel(chapterName),
        color: '#ea580c',
        angleDeg: -40,
        description: isTa
          ? `அதிகாரம்: ${chapterName} (${paalName}) - வாழ்வியல் ஒழுக்க வழிகாட்டி.`
          : isHi
          ? `अध्याय: ${chapterName} (${paalName}) - नैतिक एवं विधिक मार्गदर्शन।`
          : `Chapter: ${chapterName} (${kural.paal}) - Foundational ethical governance.`,
        statuteOrContext: `${chapterName}`,
        tags: ['Theme', chapterName, 'Adhigaram']
      },
      {
        id: `ring-values-${kural.number}-${selectedTheme}`,
        category: 'values',
        label: CATEGORY_LABELS.values[language],
        sublabel: formatSublabel(isTa ? 'நேர்மை & மாண்பு' : isHi ? 'सदाचार एवं निष्ठा' : 'Moral Integrity'),
        color: '#7e22ce',
        angleDeg: 10,
        description: isTa
          ? `அறநெறி விழுமியம்: மனித மாண்பைப் பாதுகாக்கும் உயர் வாழ்வியல் விழுமியம்.`
          : isHi
          ? `नैतिक मूल्य: व्यक्तिगत मर्यादा और समाज कल्याण को सुदृढ़ करने वाला शाश्वत मूल्य।`
          : `Moral Principle: Timeless ethical foundation fostering human dignity.`,
        statuteOrContext: 'Core Value',
        tags: ['Values', 'Integrity']
      },
      {
        id: `ring-context-${kural.number}-${selectedTheme}`,
        category: 'context',
        label: CATEGORY_LABELS.context[language],
        sublabel: formatSublabel(isTa ? 'சட்டத்தின் ஆட்சி' : isHi ? 'विधिक परिप्रेक्ष्य' : 'Rule of Law'),
        color: '#0284c7',
        angleDeg: 65,
        description: isTa
          ? `சட்டச் சூழல்: அரசமைப்புக் கோட்பாடுகள் மற்றும் சட்டத்தின் ஆட்சி.`
          : isHi
          ? `विधिक संदर्भ: संवैधानिक सिद्धांत एवं विधि का शासन।`
          : `Legal Context: Constitutional jurisprudence & modern statutory governance.`,
        statuteOrContext: isTa ? 'சட்டத்தின் ஆட்சி' : isHi ? 'विधि का शासन' : 'Rule of Law',
        tags: ['Context', 'Law']
      },
      {
        id: `ring-application-${kural.number}-${selectedTheme}`,
        category: 'application',
        label: CATEGORY_LABELS.application[language],
        sublabel: formatSublabel(isTa ? 'வாழ்வியல் பயன்பாடு' : isHi ? 'दैनिक आचरण' : 'Daily Action'),
        color: '#db2777',
        angleDeg: 125,
        description: kural.modernRelevance || (isTa ? 'தற்கால வாழ்வில் இக்குறளின் நெறியைப் பின்பற்றுதல்.' : 'Practical ethical reflection in modern decision-making.'),
        statuteOrContext: 'Application',
        tags: ['Application', 'Decision Making']
      },
      {
        id: `ring-keywords-${kural.number}-${selectedTheme}`,
        category: 'keywords',
        label: CATEGORY_LABELS.keywords[language],
        sublabel: formatSublabel(isTa ? kwTa : isHi ? kwHi : kwEn),
        color: '#84cc16',
        angleDeg: 185,
        description: isTa
          ? `முக்கியச் சொற்கள்: ${kural.keywords?.join(', ')}.`
          : `Keywords: ${kural.keywords?.join(', ')}.`,
        statuteOrContext: 'Lexicon',
        tags: ['Keywords', ...(kural.keywords || [])]
      }
    ];
  }, [kural, selectedKuralNumber, selectedTheme, language]);

  // Handle clicking Center Kural Node
  const handleSelectCenter = () => {
    setActiveRingCategory('center');
    const isTa = language === 'ta';
    const isHi = language === 'hi';

    const kuralLabel = isTa
      ? `குறள் ${selectedKuralNumber}`
      : isHi
      ? `कुरल ${selectedKuralNumber}`
      : `Kural ${selectedKuralNumber}`;

    const centerNode: KnowledgeNode = {
      id: `kural-${selectedKuralNumber}`,
      label: kuralLabel,
      type: 'Kural',
      category: 'kural',
      x: 480,
      y: 350,
      details: {
        title: `${kuralLabel}: ${isTa ? (kural?.adhigaramTamil || kural?.adhigaram) : kural?.adhigaram || 'Thirukkural'}`,
        subtitle: isTa
          ? (kural?.verse1Tamil ? `${kural.verse1Tamil} / ${kural.verse2Tamil}` : '')
          : kural?.verseEnglish || '',
        description: isTa
          ? `${kural?.verseTamilFull || kural?.verse1Tamil}\n\nஉரை: ${kural?.explanationTamil || ''}`
          : isHi
          ? `${kural?.verseTamilFull}\n\n${kural?.verseEnglish}\n\nव्याख्या: ${kural?.explanationEnglish}`
          : `${kural?.verseTamilFull || ''}\n\n${kural?.verseEnglish || ''}\n\nExplanation: ${kural?.explanationEnglish || ''}`,
        tags: [
          kuralLabel,
          kural?.paal || 'Aram',
          kural?.adhigaram || 'Thirukkural',
          THEME_CONFIGS[selectedTheme].labels[language].title
        ],
        meta: {
          number: selectedKuralNumber,
          tamilVerse: kural?.verseTamilFull || kural?.verse1Tamil,
          englishVerse: kural?.verseEnglish,
          chapter: kural?.adhigaram,
          paal: kural?.paal,
          activeTheme: selectedTheme
        }
      }
    };
    onSelectNode(centerNode);
  };

  // Handle clicking Satellite Node
  const handleSelectSatellite = (ringItem: RingNodeData) => {
    setActiveRingCategory(ringItem.category);
    const node: KnowledgeNode = {
      id: ringItem.id,
      label: `${ringItem.label} ${ringItem.sublabel}`,
      type: 'EthicalConcept',
      category: ringItem.category,
      x: 0,
      y: 0,
      details: {
        title: `${ringItem.label} ${ringItem.sublabel}`,
        subtitle: ringItem.statuteOrContext,
        description: ringItem.description,
        tags: [...ringItem.tags, THEME_CONFIGS[selectedTheme].labels[language].title],
        meta: {
          kuralNumber: selectedKuralNumber,
          category: ringItem.category,
          color: ringItem.color,
          activeTheme: selectedTheme
        }
      }
    };
    onSelectNode(node);
  };

  // Canvas Geometry Configuration
  const svgWidth = 960;
  const svgHeight = 700;
  const centerX = 480;
  const centerY = 350;
  const centerRadius = 74;
  const orbitRadius = 248;
  const jointDotRadius = 10;
  const jointDistance = 138;

  const currentThemeConfig = THEME_CONFIGS[selectedTheme];

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* ========================================================================= */}
      {/* 1. TOP TOOLBAR: LANGUAGE SELECTOR & KURAL QUICK PRESETS                   */}
      {/* ========================================================================= */}
      <div className="p-3.5 border-b border-slate-200/90 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Language Selector Chips */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <span className="text-[11px] font-extrabold text-slate-500 px-2 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
            </span>
            {(['en', 'ta', 'hi'] as Language[]).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setLanguage(langKey)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === langKey
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {langKey === 'en' ? 'English' : langKey === 'ta' ? 'தமிழ்' : 'हिंदी'}
              </button>
            ))}
          </div>

          {/* Quick preset chips for Kurals - Cleaned of any 'example' text */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold text-[#0B3B75] hidden sm:inline">
              {language === 'ta' ? 'குறள் தெரிவு:' : language === 'hi' ? 'कुरल चयन:' : 'Select Kural:'}
            </span>
            {PRESET_KURALS.map((p) => {
              const isActive = selectedKuralNumber === p.number;
              const title =
                language === 'ta' ? p.titleTa : language === 'hi' ? p.titleHi : p.titleEn;
              return (
                <button
                  key={p.number}
                  onClick={() => onSelectKuralNumber(p.number)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs ${
                    isActive
                      ? 'bg-[#004889] text-white shadow-xs ring-2 ring-blue-400/40'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                  title={`${title} - ${p.theme}`}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Kural Number Jump Input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="1330"
            placeholder={language === 'ta' ? '1-1330 எண்' : language === 'hi' ? '1-1330 संख्या' : 'Jump 1-1330'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const num = parseInt(searchQuery, 10);
                if (num >= 1 && num <= 1330) {
                  onSelectKuralNumber(num);
                  setSearchQuery('');
                }
              }
            }}
            className="w-28 px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 shadow-2xs"
          />
          <button
            onClick={() => {
              const num = parseInt(searchQuery, 10);
              if (num >= 1 && num <= 1330) {
                onSelectKuralNumber(num);
                setSearchQuery('');
              }
            }}
            className="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-2xs cursor-pointer transition-colors"
          >
            {language === 'ta' ? 'செல்' : language === 'hi' ? 'जाएं' : 'Go'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MULTI-THEME LENS SELECTOR BAR FOR THE SINGLE SELECTED KURAL            */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {language === 'ta' ? 'பல்நோக்கு கருப்பொருள்:' : language === 'hi' ? 'बहु-आयामी थीम:' : 'Multi-Themed Lenses:'}
          </span>
        </div>

        {/* 5 Theme Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(THEME_CONFIGS) as KuralThemeKey[]).map((themeKey) => {
            const config = THEME_CONFIGS[themeKey];
            const Icon = config.icon;
            const isSelected = selectedTheme === themeKey;
            const themeLabel = config.labels[language].title;

            return (
              <button
                key={themeKey}
                onClick={() => {
                  setSelectedTheme(themeKey);
                  setActiveRingCategory('center');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                  isSelected
                    ? `${config.accentBg} ring-2 ring-blue-400/30 scale-102`
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                <span>{themeLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN GRAPH CANVAS AREA WITH EXACT PROPORTIONS & CLEAN STYLING          */}
      {/* ========================================================================= */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-sky-50/30 via-white to-blue-50/20 p-4 flex flex-col items-center justify-center relative min-h-[580px]">
        {/* Graph Header Caption - Zero 'Example' text */}
        <div className="text-center mb-1 shrink-0 z-10 pointer-events-none">
          <h2 className="text-xl md:text-2xl font-black text-[#004889] font-heading tracking-tight drop-shadow-2xs">
            {language === 'ta'
              ? 'அறிவு வரைபடம்'
              : language === 'hi'
              ? 'ज्ञान आरेख (Knowledge Graph)'
              : 'Knowledge Graph'}
          </h2>
          <span className="text-xs md:text-sm font-bold text-blue-600/90 block mt-0.5">
            {language === 'ta'
              ? `(${CATEGORY_LABELS.center.ta} ${selectedKuralNumber} • ${currentThemeConfig.labels.ta.title})`
              : language === 'hi'
              ? `(${CATEGORY_LABELS.center.hi} ${selectedKuralNumber} • ${currentThemeConfig.labels.hi.title})`
              : `(${CATEGORY_LABELS.center.en} ${selectedKuralNumber} • ${currentThemeConfig.labels.en.title})`}
          </span>
        </div>

        {/* Scalable Vector Graphics Rendering Engine */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative flex items-center justify-center w-full max-w-[960px] aspect-[960/700] mx-auto select-none"
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradients and Filters */}
            <defs>
              {/* Radial gradient for the center Kural sphere */}
              <radialGradient id="centerRadialGradient" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#0263b8" />
                <stop offset="55%" stopColor="#004889" />
                <stop offset="100%" stopColor="#002d59" />
              </radialGradient>

              {/* Glowing Drop Shadow for interactive nodes */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#002d59" floodOpacity="0.22" />
              </filter>

              {/* Active selection glow */}
              <filter id="activeNodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#38bdf8" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* 1. Spoke Lines and Joint Dots for each satellite */}
            {ringNodes.map((item) => {
              const rad = (item.angleDeg * Math.PI) / 180;
              const satelliteX = centerX + orbitRadius * Math.cos(rad);
              const satelliteY = centerY + orbitRadius * Math.sin(rad);

              const dotX = centerX + jointDistance * Math.cos(rad);
              const dotY = centerY + jointDistance * Math.sin(rad);

              const isSelected = activeRingCategory === item.category;

              return (
                <g key={`spoke-${item.category}`} className="transition-all duration-300">
                  {/* Radial Spoke Line connecting Center to Satellite */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={satelliteX}
                    y2={satelliteY}
                    stroke={item.color}
                    strokeWidth={isSelected ? 4 : 3}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />

                  {/* Intermediate Joint Dot along the spoke */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={isSelected ? jointDotRadius + 2 : jointDotRadius}
                    fill={item.color}
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    className="transition-transform duration-200 cursor-pointer hover:scale-125"
                    onClick={() => handleSelectSatellite(item)}
                  />
                </g>
              );
            })}

            {/* 2. Central Node: Kural ({num}) Sphere */}
            <g
              onClick={handleSelectCenter}
              className="cursor-pointer group"
              filter={activeRingCategory === 'center' ? 'url(#activeNodeGlow)' : 'url(#softGlow)'}
            >
              {/* Outer Pulse Ring showing current theme accent */}
              <circle
                cx={centerX}
                cy={centerY}
                r={centerRadius + 8}
                fill="none"
                stroke={currentThemeConfig.ringAccent}
                strokeWidth={3}
                strokeDasharray="6 4"
                className="animate-spin"
                style={{ animationDuration: '16s' }}
              />

              {/* Central Solid Gradient Disc */}
              <circle
                cx={centerX}
                cy={centerY}
                r={centerRadius}
                fill="url(#centerRadialGradient)"
                stroke="#ffffff"
                strokeWidth={3.5}
                className="group-hover:scale-105 transition-transform duration-200 origin-center"
              />

              {/* Text inside Center Disc in active language */}
              <text
                x={centerX}
                y={centerY - 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={language === 'ta' ? '22' : '24'}
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none tracking-wide"
              >
                {CATEGORY_LABELS.center[language]}
              </text>
              <text
                x={centerX}
                y={centerY + 22}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="18"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none opacity-95"
              >
                ({selectedKuralNumber})
              </text>
            </g>

            {/* 3. Outer Satellite Pill Badges */}
            {ringNodes.map((item) => {
              const rad = (item.angleDeg * Math.PI) / 180;
              const satelliteX = centerX + orbitRadius * Math.cos(rad);
              const satelliteY = centerY + orbitRadius * Math.sin(rad);

              const isSelected = activeRingCategory === item.category;

              // Generous pill dimensions ensuring text never overflows
              const pillWidth = 200;
              const pillHeight = 74;
              const rx = 37;

              const pillX = satelliteX - pillWidth / 2;
              const pillY = satelliteY - pillHeight / 2;

              return (
                <g
                  key={`pill-${item.category}`}
                  onClick={() => handleSelectSatellite(item)}
                  className="cursor-pointer group"
                  filter={isSelected ? 'url(#activeNodeGlow)' : 'url(#softGlow)'}
                >
                  {/* Selection Ring for satellite node */}
                  {isSelected && (
                    <rect
                      x={pillX - 5}
                      y={pillY - 5}
                      width={pillWidth + 10}
                      height={pillHeight + 10}
                      rx={rx + 4}
                      fill="none"
                      stroke={currentThemeConfig.ringAccent}
                      strokeWidth={3}
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Satellite Rounded Capsule / Pill */}
                  <rect
                    x={pillX}
                    y={pillY}
                    width={pillWidth}
                    height={pillHeight}
                    rx={rx}
                    fill={item.color}
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    className="group-hover:scale-104 transition-all duration-200 origin-center"
                  />

                  {/* Primary Bold Title Label */}
                  <text
                    x={satelliteX}
                    y={satelliteY - 7}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={language === 'ta' ? '17' : '18'}
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none tracking-tight"
                  >
                    {item.label}
                  </text>

                  {/* Secondary Parenthesized Subtext with clean font scaling */}
                  <text
                    x={satelliteX}
                    y={satelliteY + 16}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={item.sublabel.length > 18 ? '12' : '13.5'}
                    fontWeight="700"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none opacity-95"
                  >
                    {item.sublabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Guidance Pill */}
        <div className="mt-2 py-1.5 px-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-full shadow-2xs text-center z-10 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs text-slate-700 font-medium">
            💡 {language === 'ta'
              ? <span><strong>வளைய வரைபடம்:</strong> மையத்தில் உள்ள <strong>குறள் ({selectedKuralNumber})</strong> அல்லது ஏதேனும் ஒரு கருப்பொருள் மாத்திரையை சொடுக்கி விரிவான விளக்கங்களைப் பார்க்கவும்.</span>
              : language === 'hi'
              ? <span><strong>रिंग आरेख:</strong> केंद्र में स्थित <strong>कुरल ({selectedKuralNumber})</strong> अथवा किसी भी उपग्रह नोड पर क्लिक कर विस्तृत विवरण देखें।</span>
              : <span><strong>Ring Graph:</strong> Click the center <strong>Kural ({selectedKuralNumber})</strong> disc or any satellite pill to inspect detailed cross-corpus insights.</span>
            }
          </span>
        </div>
      </div>
    </div>
  );
};
