import { Language } from './translations';
import { Kural, PaalType } from '../types';

export const PAAL_TRANSLATIONS: Record<Language, Record<PaalType, string>> = {
  en: {
    Aram: 'Virtue (Aram)',
    Porul: 'Wealth & Governance (Porul)',
    Inbam: 'Love & Harmony (Inbam)'
  },
  ta: {
    Aram: 'அறத்துப்பால்',
    Porul: 'பொருட்பால்',
    Inbam: 'காமத்துப்பால்'
  },
  hi: {
    Aram: 'धर्म (सदाचार व नीति)',
    Porul: 'अर्थ (शासन व संपत्ति)',
    Inbam: 'काम (सद्भाव व प्रेम)'
  }
};

export const CHAPTER_NAMES_LOCALIZED: Record<Language, Record<string, string>> = {
  en: {},
  ta: {
    'Kadavul Vaazhthu (Praise of God)': 'கடவுள் வாழ்த்து',
    'Vaan Sirappu (The Excellence of Rain)': 'வான் சிறப்பு',
    'Neethar Perumai (The Greatness of Ascetics)': 'நீத்தார் பெருமை',
    'Aran Valiyuruthal (Assertion of the Strength of Virtue)': 'அறன் வலியுறுத்தல்',
    'Illvaazhkkai (Domestic Life)': 'இல்வாழ்க்கை',
    'Vazhkkaith Thunainalam (The Goodness of Life Partner)': 'வாழ்க்கைத் துணைநலம்',
    'Pudarperudhal (The Cherishing of Children)': 'புதல்வரைப் பெறுதல்',
    'Anbudaimai (Possession of Love)': 'அன்புடைமை',
    'Virundhombal (Hospitality)': 'விருந்தோம்பல்',
    'Iniyavai Kooraldhal (Pleasant Speech)': 'இனியவை கூறல்',
    'Seinandri Arithal (Gratitude)': 'செய்ந்நன்றி அறிதல்',
    'Naduvunilaimai (Impartiality / Fairness)': 'நடுவுநிலைமை',
    'Adakkam Udaimai (Self-Control / Restraint)': 'அடக்கம் உடைமை',
    'Ozhukkam Udaimai (Right Conduct / Virtue)': 'ஒழுக்கம் உடைமை',
    'Poraiyudaimai (Forgiveness / Tolerance)': 'பொறையுடைமை',
    'Azhukkaarudaimai (Avoidance of Envy)': 'அழுக்காறாமை',
    'Vekkhaamai (Not Coveting Another\'s Property)': 'வெஃகாமை',
    'Puran Kooramai (Not Backbiting / Slander)': 'புறங்கூறாமை',
    'Payanila Sollaamai (Against Fruitless Talk)': 'பயனில சொல்லாமை',
    'Vaaimai (Truthfulness)': 'வாய்மை',
    'Vegulaamai (Restraint of Anger)': 'வெகுளாமை',
    'Innaa Seiyaamai (Not Doing Evil / Non-Injury)': 'இன்னா செய்யாமை',
    'Kollaamai (Non-Killing)': 'கொல்லாமை',
    'Sengonmai (Righteous Sceptre / Just Rule)': 'செங்கோன்மை',
    'Vinai Thooymai (Purity of Action / Clean Means)': 'வினைத்தூய்மை',
    'Perumai (Greatness / Excellence)': 'பெருமை',
    'Saandrannmai (Perfect Goodness / Nobility of Character)': 'சான்றாண்மை',
    'Panbudaimai (Courtesy / Good Manners)': 'பண்புடைமை'
  },
  hi: {
    'Kadavul Vaazhthu (Praise of God)': 'ईश्वर स्तुति (Kadavul Vaazhthu)',
    'Vaan Sirappu (The Excellence of Rain)': 'वर्षा की महिमा (Vaan Sirappu)',
    'Neethar Perumai (The Greatness of Ascetics)': 'महापुरुषों की महानता (Neethar Perumai)',
    'Aran Valiyuruthal (Assertion of the Strength of Virtue)': 'धर्म की महत्ता (Aran Valiyuruthal)',
    'Illvaazhkkai (Domestic Life)': 'गृहस्थ जीवन (Illvaazhkkai)',
    'Vazhkkaith Thunainalam (The Goodness of Life Partner)': 'जीवनसाथी का महत्व (Vazhkkaith Thunainalam)',
    'Pudarperudhal (The Cherishing of Children)': 'संतान सुख (Pudarperudhal)',
    'Anbudaimai (Possession of Love)': 'प्रेम का वास (Anbudaimai)',
    'Virundhombal (Hospitality)': 'अतिथि सत्कार (Virundhombal)',
    'Iniyavai Kooraldhal (Pleasant Speech)': 'मधुर वाणी (Iniyavai Kooraldhal)',
    'Seinandri Arithal (Gratitude)': 'कृतज्ञता (Seinandri Arithal)',
    'Naduvunilaimai (Impartiality / Fairness)': 'निष्पक्षता एवं न्याय (Naduvunilaimai)',
    'Adakkam Udaimai (Self-Control / Restraint)': 'आत्म-नियंत्रण व संयम (Adakkam Udaimai)',
    'Ozhukkam Udaimai (Right Conduct / Virtue)': 'सदाचार एवं उत्तम आचरण (Ozhukkam Udaimai)',
    'Poraiyudaimai (Forgiveness / Tolerance)': 'धैर्य एवं क्षमाशीलता (Poraiyudaimai)',
    'Azhukkaarudaimai (Avoidance of Envy)': 'ईर्ष्या से मुक्ति (Azhukkaarudaimai)',
    'Vekkhaamai (Not Coveting Another\'s Property)': 'अलोभ / दूसरों की संपत्ति न चाहना (Vekkhaamai)',
    'Puran Kooramai (Not Backbiting / Slander)': 'चुगली न करना (Puran Kooramai)',
    'Payanila Sollaamai (Against Fruitless Talk)': 'व्यर्थ बातों से बचना (Payanila Sollaamai)',
    'Vaaimai (Truthfulness)': 'सत्यवादिता (Vaaimai)',
    'Vegulaamai (Restraint of Anger)': 'क्रोध पर नियंत्रण (Vegulaamai)',
    'Innaa Seiyaamai (Not Doing Evil / Non-Injury)': 'अहिंसा एवं क्षति निवारण (Innaa Seiyaamai)',
    'Kollaamai (Non-Killing)': 'प्राणी रक्षा एवं अहिंसा (Kollaamai)',
    'Sengonmai (Righteous Sceptre / Just Rule)': 'न्यायपूर्ण शासन (Sengonmai)',
    'Vinai Thooymai (Purity of Action / Clean Means)': 'कर्म की पवित्रता (Vinai Thooymai)',
    'Perumai (Greatness / Excellence)': 'सार्वभौमिक समानता (Perumai)',
    'Saandrannmai (Perfect Goodness / Nobility of Character)': 'उत्तम चरित्र व सत्यनिष्ठा (Saandrannmai)',
    'Panbudaimai (Courtesy / Good Manners)': 'सभ्यता एवं शिष्टाचार (Panbudaimai)'
  }
};

export const ETHICAL_CONCEPT_LOCALIZED: Record<Language, Record<string, string>> = {
  en: {},
  ta: {
    'Reverence & First Principles': 'முதன்மைக் கோட்பாடுகள் & இறைப்பற்று',
    'Environmental Stewardship & Sustainability': 'சுற்றுச்சூழல் பாதுகாப்பு & நிலைத்தன்மை',
    'Moral Authority & Selflessness': 'அறநெறி அதிகாரம் & தியாகம்',
    'Moral Duty & Jurisprudential Ethics': 'அறக்கடமை & சட்ட நெறிமுறைகள்',
    'Civic Responsibility & Social Duty': 'குடிமைப் பொறுப்பு & சமூகக் கடமை',
    'Universal Compassion & Empathy': 'அனைத்துயிர் இரக்கம் & அன்புடைமை',
    'Fiduciary Reciprocity & Integrity': 'நம்பிக்கைப் பொறுப்பு & செய்ந்நன்றியறிதல்',
    'Impartiality & Judicial Equanimity': 'நடுவுநிலைமை & நீதித்துறை சமநிலை',
    'Self-Restraint & Professional Composure': 'சுயகட்டுப்பாடு & தொழில்முறை அமைதி',
    'Professional Ethics & Inviolable Integrity': 'தொழில்முறை ஒழுக்கம் & நேர்மை',
    'Patience & Forbearance in Dispute Resolution': 'பொறையுடைமை & சமரசத் தீர்வு',
    'Fair Competition & Meritocracy': 'நியாயமான போட்டி & தகுதிமுறை',
    'Anti-Theft & Property Rights': 'கள்ளாமை & சொத்துரிமை பாதுகாப்பு',
    'Anti-Defamation & Cyberbullying Prevention': 'புறங்கூறாமை & அவதூறு தடுப்பு',
    'Constructive Discourse & Evidence Rigor': 'ஆக்கப்பூர்வ பேச்சு & சான்று உறுதிப்பாடு',
    'Truth, Perjury Deterrence & Epistemic Honesty': 'வாய்மை & சான்று நேர்மை',
    'Anger Management & Non-Violence': 'சினமின்மை & வன்முறையின்மை',
    'Non-Retaliation, Anti-Revenge & Restorative Justice': 'பழிவாங்காமை & சமரச நீதி',
    'Sanctity of Life & Right to Life': 'உயிர் காக்கும் அறம் & வாழ்வுரிமை',
    'Equal Protection, Constitutionalism & Due Process': 'சமமான பாதுகாப்பு & சட்டத்தின் ஆட்சி',
    'Clean Hands Doctrine & Prohibition of Unlawful Means': 'வினைத்தூய்மை & நன்னடத்தை'
  },
  hi: {
    'Reverence & First Principles': 'ईश्वर स्तुति एवं मूल सिद्धांत',
    'Environmental Stewardship & Sustainability': 'पर्यावरण संरक्षण एवं संधारणीयता',
    'Moral Authority & Selflessness': 'नैतिक अधिकार एवं निःस्वार्थता',
    'Moral Duty & Jurisprudential Ethics': 'नैतिक कर्तव्य एवं विधिक नीतिशास्त्र',
    'Civic Responsibility & Social Duty': 'नागरिक उत्तरदायित्व एवं सामाजिक कर्तव्य',
    'Universal Compassion & Empathy': 'सार्वभौमिक करुणा एवं सहानुभूति',
    'Fiduciary Reciprocity & Integrity': 'विश्वस्त पारस्परिकता एवं कृतज्ञता',
    'Impartiality & Judicial Equanimity': 'निष्पक्षता एवं न्यायिक संतुलन',
    'Self-Restraint & Professional Composure': 'आत्म-नियंत्रण एवं व्यावसायिक संयम',
    'Professional Ethics & Inviolable Integrity': 'व्यावसायिक नैतिकता एवं अटूट सत्यनिष्ठा',
    'Patience & Forbearance in Dispute Resolution': 'धैर्य, क्षमा एवं मध्यस्थता समाधान',
    'Fair Competition & Meritocracy': 'उचित प्रतिस्पर्धा एवं योग्यता प्रणाली',
    'Anti-Theft & Property Rights': 'अलोभ, चोरी निषेध एवं संपत्ति सुरक्षा',
    'Anti-Defamation & Cyberbullying Prevention': 'मानहानि निषेध एवं साइबर सुरक्षा',
    'Constructive Discourse & Evidence Rigor': 'सार्थक संवाद एवं साक्ष्य प्रामाणिकता',
    'Truth, Perjury Deterrence & Epistemic Honesty': 'सत्य, शपथ निष्ठा एवं प्रामाणिकता',
    'Anger Management & Non-Violence': 'क्रोध नियंत्रण एवं अहिंसा',
    'Non-Retaliation, Anti-Revenge & Restorative Justice': 'प्रतिशोध निषेध एवं पुनर्स्थापनात्मक न्याय',
    'Sanctity of Life & Right to Life': 'जीवन की पवित्रता एवं जीने का अधिकार',
    'Equal Protection, Constitutionalism & Due Process': 'समान संरक्षण, संविधानवाद एवं उचित प्रक्रिया',
    'Clean Hands Doctrine & Prohibition of Unlawful Means': 'निष्कलंक कर्म सिद्धांत एवं गैरकानूनी साधनों का निषेध'
  }
};

export const HINDI_CANONICAL_KURALS: Record<number, { verseHindi: string; explanationHindi: string; modernRelevanceHindi: string }> = {
  1: {
    verseHindi: 'जैसे सभी अक्षरों में पहला अक्षर "अ" है, वैसे ही संसार का आदि मूल ईश्वर है।',
    explanationHindi: 'जिस प्रकार भाषा की शुरुआत "अ" से होती है, उसी प्रकार सृष्टि और समस्त न्याय व्यवस्था का मूल आधार परम सत्य है।',
    modernRelevanceHindi: 'आधुनिक प्रशासनिक कानून, संवैधानिक नैतिकता और मौलिक अधिकारों के लिए आधारभूत दार्शनिक मार्गदर्शन प्रदान करता है।'
  },
  2: {
    verseHindi: 'विद्वान होने का क्या लाभ, यदि वे शुद्ध ज्ञान स्वरूप परमात्मा के पावन चरणों की वंदना न करें?',
    explanationHindi: 'ज्ञान और विद्या की सार्थकता तभी है जब वह अहंकार रहित होकर सत्य और न्याय के प्रति समर्पित हो।',
    modernRelevanceHindi: 'विधिक शिक्षा और न्यायिक निर्णय क्षमता में विनम्रता तथा सत्य के प्रति समर्पण का महत्व।'
  },
  3: {
    verseHindi: 'जो प्रभु के पावन चरणों का निरंतर स्मरण करते हैं, वे इस संसार में दीर्घकाल तक सुखपूर्वक रहते हैं।',
    explanationHindi: 'सत्य और निष्ठा के मार्ग पर चलने वाले व्यक्ति समाज में दीर्घकालिक सम्मान और प्रतिष्ठा प्राप्त करते हैं।',
    modernRelevanceHindi: 'सार्वजनिक जीवन और न्यायिक पदों पर शुचिता तथा कर्तव्यनिष्ठा का प्रभाव।'
  },
  4: {
    verseHindi: 'जो निष्काम और निर्विकार प्रभु की शरण लेते हैं, उन्हें कभी कोई दुःख नहीं सताता।',
    explanationHindi: 'बिना किसी व्यक्तिगत स्वार्थ या राग-द्वेष के कार्य करने वाले को किसी विवाद या संकट का भय नहीं रहता।',
    modernRelevanceHindi: 'न्यायिक स्वतंत्रता और हितों के टकराव (Conflict of Interest) से पूर्ण मुक्ति।'
  },
  34: {
    verseHindi: 'मन को समस्त पापों व विकारों से मुक्त रखना ही सच्चा धर्म है; इसके अतिरिक्त अन्य सभी बाहरी प्रदर्शन मात्र हैं।',
    explanationHindi: 'आंतरिक शुचिता और मन की निर्मलता ही धर्म का वास्तविक स्वरूप है। आडंबर से परे वास्तविक सत्यनिष्ठा ही न्याय की आत्मा है।',
    modernRelevanceHindi: 'न्यायशास्त्र में आंतरिक सत्यनिष्ठा और भ्रष्टाचार मुक्त आचरण की अनिवार्यता।'
  },
  111: {
    verseHindi: 'बिना किसी पक्षपात के निष्पक्ष होकर कार्य करना ही श्रेष्ठ व्यक्तियों का सच्चा आभूषण है।',
    explanationHindi: 'न्याय और धर्म का मूल तत्व यह है कि व्यक्ति अपने-पराए के भेद से ऊपर उठकर निष्पक्ष व्यवहार करे।',
    modernRelevanceHindi: 'अनुच्छेद 14 के तहत कानून के समक्ष समानता और प्राकृतिक न्याय के सिद्धांत (Nemo Judex In Causa Sua)।'
  },
  118: {
    verseHindi: 'तराजू के कांटे की तरह समभाव में रहकर बिना झुके निर्णय करना ही विद्वान न्यायविदों का गुण है।',
    explanationHindi: 'सच्चा न्यायाधीश वही है जो तराजू की भांति दोनों पक्षों को समान दृष्टि से तौलकर निष्पक्ष निर्णय दे।',
    modernRelevanceHindi: 'न्यायिक निष्पक्षता, बार काउंसिल नियम तथा न्यायिक निर्णयों में संतुलन।'
  },
  127: {
    verseHindi: 'भले ही अन्य किसी चीज पर नियंत्रण न रहे, अपनी जीभ पर संयम अवश्य रखें; अन्यथा कटु वचनों से भारी कष्ट होगा।',
    explanationHindi: 'वाणी का संयम मनुष्य को मानहानि, विवाद और आपदाओं से बचाता है।',
    modernRelevanceHindi: 'अभिव्यक्ति की स्वतंत्रता की सीमाएं (अनुच्छेद 19(2)), मानहानि निषेध (धारा 356 BNS) व साइबर बदमाशी की रोकथाम।'
  },
  129: {
    verseHindi: 'आग से जला हुआ घाव समय के साथ भर जाता है, लेकिन कटु वाणी से लगा घाव जीवन भर नहीं भरता।',
    explanationHindi: 'शारीरिक चोट से अधिक गहरी और स्थायी चोट शब्दों द्वारा पहुंचाई गई मानसिक पीड़ा होती है।',
    modernRelevanceHindi: 'डिजिटल उत्पीड़न, हेट स्पीच और मानसिक प्रताड़ना की रोकथाम।'
  },
  131: {
    verseHindi: 'सदाचार ही मनुष्य को गौरव और प्रतिष्ठा प्रदान करता है; इसलिए सदाचार की रक्षा प्राणों से भी बढ़कर करनी चाहिए।',
    explanationHindi: 'चरित्र और उत्तम आचरण ही सबसे बड़ा धन है। किसी भी परिस्थिति में नैतिक आचरण का त्याग नहीं करना चाहिए।',
    modernRelevanceHindi: 'वकीलों और न्यायाधीशों के लिए पेशेवर आचार संहिता एवं संस्थागत सत्यनिष्ठा।'
  },
  282: {
    verseHindi: 'मन में भी यह विचार न लाएं कि छल से दूसरों की संपत्ति हड़प ली जाए; ऐसा विचार भी पाप है।',
    explanationHindi: 'कपट और बेईमानी से दूसरों का धन लेने का विचार भी चरित्र को भ्रष्ट कर देता है।',
    modernRelevanceHindi: 'धोखाधड़ी, संपत्ति का आपराधिक दुर्विनियोग (धारा 314 BNS) व साइबर वित्तीय सुरक्षा।'
  },
  291: {
    verseHindi: 'सत्यवादिता वही है जिससे किसी भी प्राणी को तनिक भी हानि या कष्ट न पहुंचे।',
    explanationHindi: 'सच्ची वाणी वही है जो कल्याणकारी और निष्कपट हो, जिससे समाज में शांति और विश्वास बना रहे।',
    modernRelevanceHindi: 'शपथ अधिनियम, साक्ष्य अधिनियम की प्रामाणिकता तथा झूठी गवाही (Perjury) का निषेध।'
  },
  304: {
    verseHindi: 'क्रोध करने वाले को क्रोध स्वयं उसी प्रकार नष्ट कर देता है जैसे जलता हुआ अंगारा उसे छूने वाले को जलाता है।',
    explanationHindi: 'क्रोध दूसरे को हानि पहुंचाने से पहले स्वयं क्रोध करने वाले के विवेक और शांति को भस्म कर देता है।',
    modernRelevanceHindi: 'सड़क पर विवाद (Road Rage) की रोकथाम, तनाव निवारण और वैकल्पिक विवाद समाधान।'
  },
  314: {
    verseHindi: 'बुराई करने वाले को लज्जित करने का सबसे उत्तम उपाय यह है कि उसके प्रति भलाई की जाए और उस घटना को भुला दिया जाए।',
    explanationHindi: 'प्रतिशोध के चक्र को समाप्त करने के लिए क्षमा और उपकार ही सबसे प्रभावी नीति है।',
    modernRelevanceHindi: 'पुनर्स्थापनात्मक न्याय (Restorative Justice) और मध्यस्थता कानून 2023।'
  },
  321: {
    verseHindi: 'अहिंसा ही सबसे बड़ा धर्म है; किसी भी प्राणी की हत्या न करना और किसी को कष्ट न पहुंचाना ही सर्वोच्च सदाचार है।',
    explanationHindi: 'समस्त प्राणियों के जीवन का सम्मान करना ही मानवता की सर्वोच्च सीमा है।',
    modernRelevanceHindi: 'संविधान अनुच्छेद 21 के तहत जीवन का मौलिक अधिकार और मानवीय कानून।'
  },
  423: {
    verseHindi: 'जो कोई कुछ भी कहे, उसके बाहरी आवरण को छोड़कर उसके वास्तविक सत्य को जानना ही सच्चा ज्ञान है।',
    explanationHindi: 'किसी भी कथन या दावे की गहराई और वास्तविकता की जांच करना ही विवेकशीलता है।',
    modernRelevanceHindi: 'साइबर धोखाधड़ी, फर्जी खबरों की रोकथाम और न्यायिक साक्ष्य मूल्यांकन।'
  },
  541: {
    verseHindi: 'बिना किसी पक्षपात के साक्ष्यों की गहन जांच करना और निष्पक्ष होकर न्यायपूर्वक शासन करना ही सुशासन है।',
    explanationHindi: 'राजा या न्यायाधीश का मुख्य कर्तव्य यह है कि वह किसी के प्रति राग-द्वेष रखे बिना साक्ष्यों के आधार पर निर्णय दे।',
    modernRelevanceHindi: 'संवैधानिक शासन, प्रशासनिक न्याय और मनमानेपन पर न्यायिक समीक्षा।'
  },
  651: {
    verseHindi: 'यद्यपि साधन कितने भी आकर्षक लगें, निष्कलंक और शुद्ध कर्म ही मनुष्य को स्थायी गौरव प्रदान करते हैं।',
    explanationHindi: 'गलत तरीकों से हासिल की गई सफलता क्षणिक होती है; केवल पवित्र कर्म ही स्थायी कल्याण लाते हैं।',
    modernRelevanceHindi: 'निष्कलंक हाथ सिद्धांत (Clean Hands Doctrine) और भ्रष्टाचार निवारण अधिनियम।'
  },
  656: {
    verseHindi: 'माता को भूख से व्याकुल देखकर भी श्रेष्ठ पुरुषों द्वारा निंदित और अनुचित कर्म कभी नहीं करना चाहिए।',
    explanationHindi: 'घोर संकट के समय भी विद्वान व्यक्ति कभी अनैतिक या गैरकानूनी मार्ग नहीं अपनाते।',
    modernRelevanceHindi: 'साथियों के दबाव के बावजूद परीक्षा शुचिता और पेशेवर सत्यनिष्ठा बनाए रखना।'
  },
  972: {
    verseHindi: 'जन्म से सभी मनुष्य समान हैं; विशिष्टता केवल उनके द्वारा किए गए उत्तम कर्मों और गुणों से होती है।',
    explanationHindi: 'जाति, कुल या जन्म के आधार पर कोई बड़ा या छोटा नहीं होता; केवल कर्म ही मनुष्य की श्रेष्ठता निर्धारित करते हैं।',
    modernRelevanceHindi: 'संविधान अनुच्छेद 14, 15 के तहत समानता का अधिकार और जातिगत/सामुदायिक भेदभाव पर पूर्ण रोक।'
  }
};

export function getLocalizedKural(kural: Kural, lang: Language = 'en'): Kural {
  if (!kural) return kural;

  const localizedPaal = PAAL_TRANSLATIONS[lang]?.[kural.paal] || (lang === 'ta' ? kural.paalTamil : kural.paal);
  const localizedAdhigaram = CHAPTER_NAMES_LOCALIZED[lang]?.[kural.adhigaram] ||
                             (lang === 'ta' ? (kural.adhigaramTamil || kural.adhigaram) : kural.adhigaram);
  const localizedConcept = ETHICAL_CONCEPT_LOCALIZED[lang]?.[kural.ethicalConcept] ||
                           (lang === 'ta' ? (kural.ethicalConceptTamil || kural.ethicalConcept) : kural.ethicalConcept);

  if (lang === 'hi') {
    const hindiData = HINDI_CANONICAL_KURALS[kural.number];
    return {
      ...kural,
      paalTamil: localizedPaal,
      adhigaram: localizedAdhigaram,
      ethicalConcept: localizedConcept,
      explanationEnglish: hindiData ? hindiData.explanationHindi : kural.explanationEnglish,
      verseEnglish: hindiData ? hindiData.verseHindi : kural.verseEnglish,
      modernRelevance: hindiData
        ? hindiData.modernRelevanceHindi
        : `आधुनिक भारतीय कानून, प्रशासनिक न्याय और संवैधानिक नैतिकता में ${localizedConcept} का मार्गदर्शन प्रदान करता है।`
    };
  }

  if (lang === 'ta') {
    return {
      ...kural,
      paalTamil: localizedPaal,
      adhigaram: localizedAdhigaram,
      ethicalConcept: localizedConcept,
      modernRelevance: kural.modernRelevance
        ? kural.modernRelevance
        : `நவீன இந்திய சட்டம், நிர்வாக நீதி மற்றும் அரசியலமைப்பு நெறிமுறைகளில் ${localizedConcept} குறித்த வழிகாட்டலை வழங்குகிறது.`
    };
  }

  return {
    ...kural,
    adhigaram: kural.adhigaram,
    ethicalConcept: kural.ethicalConcept
  };
}
