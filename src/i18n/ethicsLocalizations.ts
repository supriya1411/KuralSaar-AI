import { Language } from './translations';
import { EthicalConcept } from '../types';

export interface LocalizedEthicsCategory {
  title: string;
  tamilTitle: string;
  description: string;
  category: string;
  keyPrinciples: string[];
  statutes: string[];
}

export const ETHICS_CATEGORY_TRANSLATIONS: Record<Language, Record<string, LocalizedEthicsCategory>> = {
  en: {
    'cat-righteousness': {
      title: 'Righteousness & Integrity',
      tamilTitle: 'அறன் வலியுறுத்தல் (Aran Valiyuruthal)',
      description: 'The foundation of justice and the moral imperative of unwavering honesty in public and personal life.',
      category: 'Philosophical Foundations',
      keyPrinciples: ['Moral Imperative', 'Universal Virtue', 'Absolute Honesty'],
      statutes: ['Constitution of India Art 14', 'Prevention of Corruption Act Sec 7']
    },
    'cat-justice': {
      title: 'Impartiality & Fairness',
      tamilTitle: 'நடுவு நிலைமை (Naduvunilaimai)',
      description: 'Balancing the scales of judgment without fear or favor, mirroring natural justice principles.',
      category: 'Judicial Virtues',
      keyPrinciples: ['Nemo Judex In Causa Sua', 'Equanimity', 'No Conflict of Interest'],
      statutes: ['Principles of Natural Justice', 'Bharatiya Nyaya Sanhita', 'Article 21']
    },
    'cat-self-control': {
      title: 'Self-Control & Restraint',
      tamilTitle: 'அடக்கமுடைமை (Adakkamudaimai)',
      description: 'Disciplining one\'s speech, senses, and desires as a prerequisite for fair deliberation.',
      category: 'Personal Discipline',
      keyPrinciples: ['Judicial Temperament', 'Restraint', 'Speech Discipline'],
      statutes: ['Contempt of Courts Act', 'Advocates Act Rules of Decorum']
    },
    'cat-decorum': {
      title: 'Propriety of Conduct',
      tamilTitle: 'ஒழுக்கமுடைமை (Ozhukkamudaimai)',
      description: 'Ethical behavior that upholds professional dignity and community trust above personal convenience.',
      category: 'Professional Ethics',
      keyPrinciples: ['Bar Council Standards', 'Fiduciary Duty', 'Dignity of Office'],
      statutes: ['Bar Council of India Standards of Conduct', 'Judicial Code of Ethics']
    },
    'cat-forgiveness': {
      title: 'Patience & Forbearance',
      tamilTitle: 'பொறையுடைமை (Poraiyudaimai)',
      description: 'Enduring insults and demonstrating restraint in conflict, foundational to mediation and restorative justice.',
      category: 'Mediation & Justice',
      keyPrinciples: ['Endurance of Insults', 'Non-Retaliation', 'Restorative Justice'],
      statutes: ['Mediation Act 2023', 'Arbitration & Conciliation Act Sec 30']
    },
    'cat-non-envy': {
      title: 'Absence of Malice & Envy',
      tamilTitle: 'அழுக்காறாமை (Azhukkaaraamai)',
      description: 'Eliminating malice, jealousy, and unfair competitive practices that corrupt legal proceedings.',
      category: 'Professional Integrity',
      keyPrinciples: ['Elimination of Malice', 'Fair Competition', 'Institutional Probity'],
      statutes: ['Competition Act 2002', 'Professional Non-Poaching & Conflicts']
    },
    'cat-non-coveting': {
      title: 'Non-Covetousness & Integrity',
      tamilTitle: 'வெஃகாமை (Vekkaamai)',
      description: 'Refraining from desiring what belongs to others, foundational to anti-fraud and fiduciary duties.',
      category: 'Anti-Fraud & Fiduciary',
      keyPrinciples: ['Refusal of Illicit Gain', 'Anti-Theft', 'Fiduciary Custody'],
      statutes: ['Bharatiya Nyaya Sanhita Sec 316 (Cheating)', 'Companies Act Sec 447']
    },
    'cat-non-slander': {
      title: 'Truthful Speech & Non-Backbiting',
      tamilTitle: 'புறங்கூறாமை (Purankooramai)',
      description: 'Avoiding defamatory remarks and falsehoods behind others\' backs; upholding evidentiary probity.',
      category: 'Evidentiary Probity',
      keyPrinciples: ['Anti-Defamation', 'Open Candor', 'Probity of Speech'],
      statutes: ['Bharatiya Nyaya Sanhita Sec 356 (Defamation)', 'Bharatiya Sakshya Adhiniyam']
    },
    'cat-non-injury': {
      title: 'Non-Injury & Harm Prevention',
      tamilTitle: 'இன்னா செய்யாமை (Inna Seyyaamai)',
      description: 'Refusing to cause harm even in response to provocation, reflecting the duty of care in torts.',
      category: 'Humanitarian Law',
      keyPrinciples: ['Duty of Care', 'Harm Prevention', 'Universal Compassion'],
      statutes: ['Law of Torts (Negligence & Duty of Care)', 'BNS Bodily Harm Provisions']
    },
    'cat-truthfulness': {
      title: 'Veracity & Truthfulness',
      tamilTitle: 'வாய்மை (Vaaimai)',
      description: 'Speaking truth that produces beneficial outcomes; the cornerstone of testimony under oath.',
      category: 'Evidentiary Virtues',
      keyPrinciples: ['Oath of Truth', 'Evidentiary Integrity', 'Beneficial Speech'],
      statutes: ['Oaths Act 1969', 'Perjury Provisions in BSA/BNS', 'Article 51A']
    },
    'cat-governance': {
      title: 'Righteous Governance & Leadership',
      tamilTitle: 'செங்கோன்மை (Sengolmai)',
      description: 'The duty of rulers and adjudicators to protect the weak and investigate before decreeing.',
      category: 'Constitutional Virtues',
      keyPrinciples: ['Rule of Law', 'Equal Protection', 'Anti-Arbitrariness'],
      statutes: ['Administrative Law', 'Judicial Review Art 32 & 226', 'Lokpal Act']
    },
    'cat-investigation': {
      title: 'Diligent Investigation & Evidence',
      tamilTitle: 'தெரிந்து செயல்வகை (Therinthu Seyalvagai)',
      description: 'Acting only after rigorous scrutiny of facts, resources, and consequences.',
      category: 'Procedural Justice',
      keyPrinciples: ['Standard of Proof', 'Fact-Finding Diligence', 'Consequential Scrutiny'],
      statutes: ['BNSS Investigation Procedures', 'BSA Standard of Proof']
    }
  },
  ta: {
    'cat-righteousness': {
      title: 'அறன் வலியுறுத்தல் & நேர்மை',
      tamilTitle: 'அறன் வலியுறுத்தல் (Aran Valiyuruthal)',
      description: 'நீதியின் அடித்தளம் மற்றும் பொது வாழ்விலும் தனிப்பட்ட வாழ்விலும் அசைக்க முடியாத நேர்மையைக் கடைப்பிடிக்கும் அறநெறிக் கடமை.',
      category: 'தத்துவ அடிப்படைகள்',
      keyPrinciples: ['அறத்தின் முதன்மை', 'உலகளாவிய நற்பண்பு', 'முழு நேர்மை'],
      statutes: ['இந்திய அரசியலமைப்பு பிரிவு 14', 'ஊழல் தடுப்புச் சட்டம் பிரிவு 7']
    },
    'cat-justice': {
      title: 'நடுவுநிலைமை & இயற்கை நீதி',
      tamilTitle: 'நடுவு நிலைமை (Naduvunilaimai)',
      description: 'எந்தவொரு சார்பும் அச்சமும் இன்றி தராசு முள் போல நடுவுநிலையோடு செயல்படும் இயற்கை நீதிக் கோட்பாடு.',
      category: 'நீதித்துறை நற்பண்புகள்',
      keyPrinciples: ['சார்பின்மை விதி (Nemo Judex)', 'சமநிலைத் தன்மை', 'நலன்களின் முரண்பாடின்மை'],
      statutes: ['இயற்கை நீதிக் கோட்பாடுகள்', 'பாரதீய நியாய சன்ஹிதா', 'அரசியலமைப்பு பிரிவு 21']
    },
    'cat-self-control': {
      title: 'அடக்கமுடைமை & சுயகட்டுப்பாடு',
      tamilTitle: 'அடக்கமுடைமை (Adakkamudaimai)',
      description: 'நாவடக்கம், புலனடக்கம் மற்றும் உணர்ச்சிக் கட்டுப்பாடு ஆகியவற்றை மேற்கொண்டு நீதியை நிலைநாட்டும் பண்பு.',
      category: 'தனிமனித ஒழுக்கம்',
      keyPrinciples: ['நீதிமன்ற நற்பண்பு', 'நாவடக்கம்', 'அமைதி காத்தல்'],
      statutes: ['நீதிமன்ற அவமதிப்புச் சட்டம்', 'வழக்கறிஞர்கள் நடத்தை விதிகள்']
    },
    'cat-decorum': {
      title: 'ஒழுக்கமுடைமை & தொழில்முறை மாண்பு',
      tamilTitle: 'ஒழுக்கமுடைமை (Ozhukkamudaimai)',
      description: 'சுயநலத்தை விட சமூக நம்பிக்கையையும் தொழில்முறை மாண்பையும் உயிரினும் மேலாகப் பாதுகாக்கும் நடத்தை.',
      category: 'தொழில்முறை அறநெறி',
      keyPrinciples: ['பார் கவுன்சில் தரநிலைகள்', 'நம்பிக்கைப் பொறுப்பு', 'அலுவலக மாண்பு'],
      statutes: ['இந்திய பார் கவுன்சில் நடத்தை தரநிலைகள்', 'நீதித்துறை ஒழுங்கு விதிகள்']
    },
    'cat-forgiveness': {
      title: 'பொறையுடைமை & சகிப்புத்தன்மை',
      tamilTitle: 'பொறையுடைமை (Poraiyudaimai)',
      description: 'இகழ்ச்சிகளையும் நிந்தனைகளையும் பொறுத்துக்கொண்டு, பழிவாங்கலைத் தவிர்த்து சமரச நீதியை ஏற்படுத்துதல்.',
      category: 'சமரச நீதி & தீர்வு',
      keyPrinciples: ['பொறுமை காத்தல்', 'பழிவாங்காமை', 'சமரசத் தீர்வு'],
      statutes: ['மத்தியஸ்தம் & சமரசச் சட்டம் 2023', 'சமரசம் மற்றும் தீர்ப்பாய சட்டம் பிரிவு 30']
    },
    'cat-non-envy': {
      title: 'அழுக்காறாமை & பொறாமையின்மை',
      tamilTitle: 'அழுக்காறாமை (Azhukkaaraamai)',
      description: 'பொறாமை, வன்மம் மற்றும் நியாயமற்ற போட்டிகளைத் தவிர்த்து சட்ட நடவடிக்கைகளின் தூய்மையைப் பாதுகாத்தல்.',
      category: 'தொழில்முறை நேர்மை',
      keyPrinciples: ['பொறாமை மறுப்பு', 'நியாயமான போட்டி', 'நிறுவனத் தூய்மை'],
      statutes: ['போட்டிச் சட்டம் 2002', 'தொழில்முறை முரண்பாட்டு விதிகள்']
    },
    'cat-non-coveting': {
      title: 'வெஃகாமை & பிறர் பொருள் விரும்பாமை',
      tamilTitle: 'வெஃகாமை (Vekkaamai)',
      description: 'பிறருக்குரிய பொருளை அநியாயமாக அடைய விரும்பாமல் இருத்தல்; மோசடி தடுப்பு மற்றும் நம்பிக்கைப் பொறுப்பு.',
      category: 'மோசடி தடுப்பு & சொத்து பாதுகாப்பு',
      keyPrinciples: ['சட்டவிரோத லாபம் மறுத்தல்', 'கள்ளாமை', 'சொத்து பாதுகாப்பு'],
      statutes: ['பாரதீய நியாய சன்ஹிதா பிரிவு 316 (மோசடி)', 'நிறுவனங்கள் சட்டம் பிரிவு 447']
    },
    'cat-non-slander': {
      title: 'புறங்கூறாமை & உண்மை உரைத்தல்',
      tamilTitle: 'புறங்கூறாமை (Purankooramai)',
      description: 'பின்னால் அவதூறு பேசுவதைத் தவிர்த்து, சாட்சியத்தின் உண்மைத்தன்மையையும் வெளிப்படைத்தன்மையையும் பேணுதல்.',
      category: 'சாட்சிய நேர்மை',
      keyPrinciples: ['அவதூறு மறுப்பு', 'நேரடி வெளிப்படைத்தன்மை', 'சொல் நேர்மை'],
      statutes: ['பாரதீய நியாய சன்ஹிதா பிரிவு 356 (அவதூறு)', 'பாரதீய சாட்சிய அதிநியம்']
    },
    'cat-non-injury': {
      title: 'இன்னா செய்யாமை & தீங்கு தராமை',
      tamilTitle: 'இன்னா செய்யாமை (Inna Seyyaamai)',
      description: 'எதிரி துன்பம் செய்தாலும் திருப்பித் தீங்கு செய்யாமல் பாதுகாத்தல்; மனித உரிமைகள் மற்றும் இழப்பீட்டு அறம்.',
      category: 'மனிதநேய சட்டம்',
      keyPrinciples: ['கவனக் கடமை (Duty of Care)', 'தீங்கு தவிர்த்தல்', 'அனைத்துயிர் இரக்கம்'],
      statutes: ['தீங்கியல் சட்டம் (Law of Torts)', 'BNS உடல் காயம் தடுப்புப் பிரிவுகள்']
    },
    'cat-truthfulness': {
      title: 'வாய்மை & சத்திய வாக்குமூலம்',
      tamilTitle: 'வாய்மை (Vaaimai)',
      description: 'தீமை தராத நன்மையான உண்மையை மட்டுமே பேசுதல்; சத்தியப்பிரமாணம் மற்றும் சாட்சியத்தின் மூலாதாரம்.',
      category: 'சாட்சிய நற்பண்புகள்',
      keyPrinciples: ['சத்தியப்பிரமாணம்', 'சாட்சிய தூய்மை', 'நன்மை தரும் உண்மை'],
      statutes: ['பிரமாண சட்டம் 1969 (Oaths Act)', 'பொய்ச்சாட்சி தடுப்புச் சட்டப் பிரிவுகள்', 'அரசியலமைப்பு பிரிவு 51A']
    },
    'cat-governance': {
      title: 'செங்கோன்மை & நல்லாட்சி',
      tamilTitle: 'செங்கோன்மை (Sengolmai)',
      description: 'ஆட்சியாளர்களும் நீதிபதிகளும் எளியோரைக் காத்து, ஆராய்ந்து பாரபட்சமின்றி நடுநிலைத் தீர்ப்பு வழங்கும் கடமை.',
      category: 'அரசியலமைப்பு நற்பண்புகள்',
      keyPrinciples: ['சட்டத்தின் ஆட்சி', 'சமமான பாதுகாப்பு', 'எதேச்சதிகாரத் தடுப்பு'],
      statutes: ['நிர்வாகச் சட்டம்', 'நீதிமன்ற மறுஆய்வு (Art 32 & 226)', 'லோக்பால் சட்டம்']
    },
    'cat-investigation': {
      title: 'தெரிந்து செயல்வகை & சான்று விசாரணை',
      tamilTitle: 'தெரிந்து செயல்வகை (Therinthu Seyalvagai)',
      description: 'உண்மைகளையும் சான்றுகளையும் முழுமையாக ஆராய்ந்து விளைவுகளை முன்கூட்டியே உணர்ந்து செயல்படுதல்.',
      category: 'நடைமுறை நீதி',
      keyPrinciples: ['சான்று நிரூபணத் தரம்', 'ஆராய்ந்து செயல்படல்', 'விளைவு முன்கணிப்பு'],
      statutes: ['BNSS குற்ற விசாரணை நடைமுறைகள்', 'BSA சாட்சியத் தரநிலைகள்']
    }
  },
  hi: {
    'cat-righteousness': {
      title: 'धर्म परायणता और सत्यनिष्ठा',
      tamilTitle: 'அறன் வலியுறுத்தல் (Aran Valiyuruthal)',
      description: 'न्याय की नींव और व्यक्तिगत तथा सार्वजनिक जीवन में अडिग ईमानदारी का नैतिक दायित्व।',
      category: 'दार्शनिक आधार',
      keyPrinciples: ['नैतिक अनिवार्यता', 'सार्वभौमिक सदाचार', 'सत्यनिष्ठा'],
      statutes: ['भारतीय संविधान अनुच्छेद 14', 'भ्रष्टाचार निवारण अधिनियम धारा 7']
    },
    'cat-justice': {
      title: 'निष्पक्षता और प्राकृतिक न्याय',
      tamilTitle: 'நடுவு நிலைமை (Naduvunilaimai)',
      description: 'तराजू के कांटे की तरह बिना किसी भय या पक्षपात के न्याय के पलड़े संतुलित रखना।',
      category: 'न्यायिक गुण',
      keyPrinciples: ['नेमो जुडेक्स इन कौसा सुआ', 'समानता', 'हितों का टकराव न होना'],
      statutes: ['प्राकृतिक न्याय के सिद्धांत', 'भारतीय न्याय संहिता', 'अनुच्छेद 21']
    },
    'cat-self-control': {
      title: 'आत्म-नियंत्रण और संयम',
      tamilTitle: 'அடக்கமுடைமை (Adakkamudaimai)',
      description: 'निष्पक्ष निर्णय लेने के लिए अपनी वाणी, इंद्रियों और इच्छाओं पर अनुशासन रखना।',
      category: 'व्यक्तिगत अनुशासन',
      keyPrinciples: ['न्यायिक संयम', 'वाणी संयम', 'शालीनता'],
      statutes: ['न्यायालय की अवमानना अधिनियम', 'अधिवक्ता आचार संहिता']
    },
    'cat-decorum': {
      title: 'सदाचार और व्यावसायिक गरिमा',
      tamilTitle: 'ஒழுக்கமுடைமை (Ozhukkamudaimai)',
      description: 'व्यक्तिगत सुविधा से ऊपर सार्वजनिक विश्वास और व्यावसायिक मर्यादा को बनाए रखना।',
      category: 'व्यावसायिक नैतिकता',
      keyPrinciples: ['बार काउंसिल मानक', 'विश्वस्त कर्तव्य', 'पद की गरिमा'],
      statutes: ['भारतीय बार काउंसिल आचरण मानक', 'न्यायिक आचार संहिता']
    },
    'cat-forgiveness': {
      title: 'धैर्य और क्षमाशीलता',
      tamilTitle: 'பொறையுடைமை (Poraiyudaimai)',
      description: 'अपमान को सहन करना और बदले की भावना से बचना; मध्यस्थता और पुनर्स्थापनात्मक न्याय का आधार।',
      category: 'मध्यस्थता न्याय',
      keyPrinciples: ['सहनशीलता', 'प्रतिशोध निषेध', 'मध्यस्थता समाधान'],
      statutes: ['मध्यस्थता अधिनियम 2023', 'सुलह अधिनियम धारा 30']
    },
    'cat-non-envy': {
      title: 'ईर्ष्या और द्वेष से मुक्ति',
      tamilTitle: 'அழுக்காறாமை (Azhukkaaraamai)',
      description: 'ईर्ष्या, द्वेष और अनुचित प्रतिस्पर्धा से बचकर कानूनी कार्यवाही की पवित्रता बनाए रखना।',
      category: 'व्यावसायिक सत्यनिष्ठा',
      keyPrinciples: ['द्वेष का त्याग', 'उचित प्रतिस्पर्धा', 'संस्थागत पवित्रता'],
      statutes: ['प्रतिस्पर्धा अधिनियम 2002', 'हितों के टकराव नियम']
    },
    'cat-non-coveting': {
      title: 'दूसरों की संपत्ति न चाहना (अलोभ)',
      tamilTitle: 'வெஃகாமை (Vekkaamai)',
      description: 'दूसरों की वस्तु पर अनुचित अधिकार न जताना; धोखाधड़ी निषेध और न्यासी कर्तव्य का पालन।',
      category: 'धोखाधड़ी निषेध',
      keyPrinciples: ['अनुचित लाभ का त्याग', 'चोरी निषेध', 'विश्वस्त संरक्षण'],
      statutes: ['भारतीय न्याय संहिता धारा 316', 'कंपनी अधिनियम धारा 447']
    },
    'cat-non-slander': {
      title: 'निंदा न करना और सत्य बोलना',
      tamilTitle: 'புறங்கூறாமை (Purankooramai)',
      description: 'पीठ पीछे चुगली और मानहानिकारक बातों से बचना; साक्ष्य की सत्यता बनाए रखना।',
      category: 'साक्ष्य सत्यनिष्ठा',
      keyPrinciples: ['मानहानि निषेध', 'प्रत्यक्ष सत्यवादिता', 'वाणी की पवित्रता'],
      statutes: ['भारतीय न्याय संहिता धारा 356 (मानहानि)', 'भारतीय साक्ष्य अधिनियम']
    },
    'cat-non-injury': {
      title: 'अहिंसा और क्षति निवारण',
      tamilTitle: 'இன்னா செய்யாமை (Inna Seyyaamai)',
      description: 'उकसावे के बावजूद किसी को नुकसान न पहुंचाना; जीवन और मानवाधिकारों की रक्षा।',
      category: 'मानवीय कानून',
      keyPrinciples: ['देखभाल का कर्तव्य (Duty of Care)', 'क्षति निवारण', 'सर्वभूत दया'],
      statutes: ['अपकृत्य कानून (Law of Torts)', 'BNS शारीरिक क्षति प्रावधान']
    },
    'cat-truthfulness': {
      title: 'सत्यवादिता और शपथ साक्ष्य',
      tamilTitle: 'வாய்மை (Vaaimai)',
      description: 'केवल वही सत्य बोलना जो कल्याणकारी हो; शपथ और साक्ष्य की आधारशिला।',
      category: 'साक्ष्य गुण',
      keyPrinciples: ['सत्य की शपथ', 'साक्ष्य सत्यनिष्ठा', 'कल्याणकारी सत्य'],
      statutes: ['शपथ अधिनियम 1969', 'झूठी गवाही प्रावधान', 'अनुच्छेद 51A']
    },
    'cat-governance': {
      title: 'न्यायपूर्ण शासन और नेतृत्व',
      tamilTitle: 'செங்கோன்மை (Sengolmai)',
      description: 'कमजोरों की रक्षा करना और बिना पक्षपात के जांच-परख कर न्यायपूर्ण निर्णय देना।',
      category: 'संवैधानिक गुण',
      keyPrinciples: ['कानून का शासन', 'समान सुरक्षा', 'मनमानेपन पर रोक'],
      statutes: ['प्रशासनिक कानून', 'न्यायिक समीक्षा (अनुच्छेद 32 और 226)', 'लोकपाल अधिनियम']
    },
    'cat-investigation': {
      title: 'तथ्य-जांच और साक्ष्य मूल्यांकन',
      tamilTitle: 'தெரிந்து செயல்வகை (Therinthu Seyalvagai)',
      description: 'तथ्यों, संसाधनों और परिणामों की गहन जांच के बाद ही विवेकपूर्ण कदम उठाना।',
      category: 'प्रक्रियात्मक न्याय',
      keyPrinciples: ['साक्ष्य मानक', 'गहन तथ्य-जांच', 'परिणाम का मूल्यांकन'],
      statutes: ['BNSS जांच प्रक्रियाएं', 'BSA साक्ष्य मानक']
    }
  }
};

// Map legacy IDs to canonical IDs if necessary
const LEGACY_ID_MAP: Record<string, string> = {
  'impartiality': 'cat-justice',
  'veracity': 'cat-truthfulness',
  'propriety': 'cat-decorum',
  'self-control': 'cat-self-control',
  'compassion': 'cat-non-injury',
  'righteous-governance': 'cat-governance',
  'duty-of-care': 'cat-decorum',
  'justice-integrity': 'cat-justice',
  'professional-dignity': 'cat-righteousness',
  'civil-decorum': 'cat-decorum',
  'purity-of-action': 'cat-righteousness',
  'universal-ethics': 'cat-righteousness'
};

export function getLocalizedCategory(cat: EthicalConcept, lang: Language = 'en'): EthicalConcept {
  if (!cat) return cat;

  const canonicalId = LEGACY_ID_MAP[cat.id] || cat.id;
  const translation = ETHICS_CATEGORY_TRANSLATIONS[lang]?.[canonicalId] ||
                      ETHICS_CATEGORY_TRANSLATIONS[lang]?.[cat.id];

  if (!translation) {
    return {
      ...cat,
      keyPrinciples: cat.keyPrinciples || [],
      statutes: cat.statutes || []
    };
  }

  return {
    ...cat,
    title: translation.title,
    tamilTitle: translation.tamilTitle || cat.tamilTitle,
    description: translation.description,
    category: translation.category || cat.category,
    keyPrinciples: translation.keyPrinciples || cat.keyPrinciples || [],
    statutes: translation.statutes || cat.statutes || []
  };
}
