import { Language } from './translations';
import { Badge } from '../types';

export interface BadgeLocalizationItem {
  title: string;
  description: string;
  criteria: string;
}

export const BADGE_TRANSLATIONS: Record<Language, Record<string, BadgeLocalizationItem>> = {
  en: {
    'badge-1': {
      title: 'First Verdict',
      description: 'Successfully resolved your very first legal-ethics dilemma scenario.',
      criteria: 'Resolve 1 scenario challenge.'
    },
    'badge-2': {
      title: 'Balance of Aram',
      description: 'Mastered the core concepts of Impartiality (Naduvunilaimai) and Natural Justice.',
      criteria: 'Attain 200+ XP in ethical reasoning.'
    },
    'badge-3': {
      title: 'Cyber Sentinel',
      description: 'Demonstrated complete awareness of digital rights, cyberbullying, and online fraud protections.',
      criteria: 'Resolve 3 digital & cyber law scenarios.'
    },
    'badge-4': {
      title: 'Ethical Scholar',
      description: 'Reviewed and meditated upon 10+ classical Thirukkural couplets in Kural Quest.',
      criteria: 'Explore 10+ Kurals across Paals.'
    },
    'badge-5': {
      title: 'Constitutional Guardian',
      description: 'Mastered the fundamentals of Article 14, 15, and 21 in anti-discrimination cases.',
      criteria: 'Resolve 5 constitutional law scenarios.'
    },
    'badge-6': {
      title: '7-Day Wisdom Streak',
      description: 'Maintained an unbroken daily ethical reasoning practice for 7 consecutive days.',
      criteria: 'Maintain a 7-day study streak.'
    },
    'badge-7': {
      title: 'Purity of Action',
      description: 'Completed the advanced Anti-Corruption and Whistleblowing dilemmas with flawless accuracy.',
      criteria: 'Resolve 8 scenarios with >90% accuracy.'
    },
    'badge-8': {
      title: 'Grand Jurist',
      description: 'Resolved all 12 scenario challenges and unlocked complete knowledge graph connections.',
      criteria: 'Resolve all 12 scenarios on the platform.'
    }
  },
  ta: {
    'badge-1': {
      title: 'முதல் தீர்ப்பு',
      description: 'உங்கள் முதல் சட்ட-அறநெறி இருதலைக்கொள்ளி வழக்குச் சவாலை வெற்றிகரமாகத் தீர்த்துவிட்டீர்கள்.',
      criteria: '1 வழக்கு சவாலை வெற்றிகரமாக தீர்த்தல்.'
    },
    'badge-2': {
      title: 'அறத்தின் சமநிலை',
      description: 'நடுவுநிலைமை மற்றும் இயற்கை நீதியின் அடிப்படைக் கோட்பாடுகளில் முழுத் தேர்ச்சி பெற்றீர்கள்.',
      criteria: 'அறநெறி சிந்தனையில் 200+ XP புள்ளிகள் பெறுதல்.'
    },
    'badge-3': {
      title: 'சைபர் காவலர்',
      description: 'டிஜிட்டல் உரிமைகள், இணைய மிரட்டல் மற்றும் இணைய மோசடி பாதுகாப்பு குறித்த முழு விழிப்புணர்வை வெளிப்படுத்தினீர்கள்.',
      criteria: '3 இணைய மற்றும் தகவல் தொழில்நுட்ப சட்ட வழக்குகளைத் தீர்த்தல்.'
    },
    'badge-4': {
      title: 'அறநெறி அறிஞர்',
      description: 'குறள் தேடலில் 10+ தொன்மைத் திருக்குறள்களை ஆழமாக ஆராய்ந்து தெளிவு பெற்றீர்கள்.',
      criteria: 'அறத்துப்பால் & பொருட்பாலில் 10+ குறள்களை ஆராய்தல்.'
    },
    'badge-5': {
      title: 'அரசியலமைப்பு பாதுகாவலர்',
      description: 'பாகுபாடு எதிர்ப்பு வழக்குகளில் அரசியலமைப்புப் பிரிவு 14, 15 மற்றும் 21 ஆகியவற்றின் அடிப்படைகளில் தேர்ச்சி பெற்றீர்கள்.',
      criteria: '5 அரசியலமைப்பு சட்ட வழக்குகளைத் தீர்த்தல்.'
    },
    'badge-6': {
      title: '7-நாள் அறிவுத் தொடர்',
      description: 'தொடர்ந்து 7 நாட்களுக்கு இடைவிடாத தினசரி அறநெறி சிந்தனைப் பயிற்சியைப் பேணினீர்கள்.',
      criteria: 'தொடர்ந்து 7 நாட்கள் கற்றல் பயிற்சியைப் பேணல்.'
    },
    'badge-7': {
      title: 'வினைத்தூய்மை சாதனையாளர்',
      description: 'ஊழல் எதிர்ப்பு மற்றும் தகவல் தெரிவிப்பாளர் தொடர்பான உயர்நிலைச் சவால்களைக் குறைபாடற்ற துல்லியத்துடன் நிறைவு செய்தீர்கள்.',
      criteria: '8 வழக்குகளை 90%க்கும் அதிக துல்லியத்துடன் தீர்த்தல்.'
    },
    'badge-8': {
      title: 'முதுபெரும் நீதித்துறை மேதை',
      description: 'அனைத்து 12 வழக்குச் சவால்களையும் தீர்த்து, முழுமையான அறிவு வரைபட இணைப்புகளைத் திறந்தீர்கள்.',
      criteria: 'அனைத்து 12 வழக்குகளையும் நிறைவு செய்தல்.'
    }
  },
  hi: {
    'badge-1': {
      title: 'पहला निर्णय',
      description: 'अपने पहले कानूनी-नैतिक दुविधा परिदृश्य को सफलतापूर्वक हल किया।',
      criteria: '1 केस चुनौती को सफलतापूर्वक हल करें।'
    },
    'badge-2': {
      title: 'धर्म का संतुलन',
      description: 'निष्पक्षता (नडुवुनिलैमई) और प्राकृतिक न्याय की मूल अवधारणाओं में महारत हासिल की।',
      criteria: 'नैतिक तर्क में 200+ XP अर्जित करें।'
    },
    'badge-3': {
      title: 'साइबर प्रहरी',
      description: 'डिजिटल अधिकारों, साइबर बदमाशी और ऑनलाइन धोखाधड़ी सुरक्षा के प्रति पूर्ण जागरूकता प्रदर्शित की।',
      criteria: '3 साइबर कानून परिदृश्यों को हल करें।'
    },
    'badge-4': {
      title: 'नैतिक विद्वान',
      description: 'कुरल खोज में 10+ शास्त्रीय तिरुक्कुरल छंदों की समीक्षा और मनन किया।',
      criteria: '10+ पवित्र कुरल छंदों का अन्वेषण करें।'
    },
    'badge-5': {
      title: 'संवैधानिक संरक्षक',
      description: 'भेदभाव विरोधी मामलों में अनुच्छेद 14, 15 और 21 के मूल सिद्धांतों में महारत हासिल की।',
      criteria: '5 संवैधानिक कानून परिदृश्यों को हल करें।'
    },
    'badge-6': {
      title: '7-दिवसीय ज्ञान श्रृंखला',
      description: 'लगातार 7 दिनों तक अटूट दैनिक नैतिक तर्क अभ्यास बनाए रखा।',
      criteria: '7 दिनों का अध्ययन सिलसिला बनाए रखें।'
    },
    'badge-7': {
      title: 'कर्म की पवित्रता',
      description: 'उन्नत भ्रष्टाचार-विरोधी और व्हिसलब्लोअर दुविधाओं को त्रुटिहीन सटीकता के साथ पूरा किया।',
      criteria: '90% से अधिक सटीकता के साथ 8 केस हल करें।'
    },
    'badge-8': {
      title: 'महान विधिवेत्ता',
      description: 'सभी 12 केस चुनौतियों को हल किया और संपूर्ण ज्ञान ग्राफ कनेक्शन अनलॉक किए।',
      criteria: 'मंच पर सभी 12 केस चुनौतियों को पूरा करें।'
    }
  }
};

export function getLocalizedBadge(badge: Badge, lang: Language = 'en'): Badge {
  if (!badge) return badge;
  const langTable = BADGE_TRANSLATIONS[lang] || BADGE_TRANSLATIONS.en;
  const localized = langTable[badge.id];

  if (!localized) return badge;

  return {
    ...badge,
    title: localized.title || badge.title,
    description: localized.description || badge.description,
    criteria: localized.criteria || badge.criteria
  };
}

export function getLocalizedBadgeList(badges: Badge[], lang: Language = 'en'): Badge[] {
  if (!Array.isArray(badges)) return [];
  return badges.map((b) => getLocalizedBadge(b, lang));
}
