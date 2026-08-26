export type Language = 'en' | 'ta' | 'hi';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & App
    appName: 'KuralSaar AI',
    tagline: 'Legal & Ethics',
    slogan: 'Learn Law. Live Ethics. Think Responsibly.',
    educationalBanner: 'KuralSaar AI pairs Indian law with Thirukkural ethics. This is not formal legal advice.',
    educationalTag: 'EDUCATIONAL PLATFORM',
    
    // Sidebar Navigation
    dashboard: 'Dashboard',
    kuralQuest: 'Kural Quest',
    scenarioChallenge: 'Scenario Challenge',
    ethicsLibrary: 'Ethics Library',
    aiTutor: 'AI Legal-Ethics Tutor',
    knowledgeGraph: 'Knowledge Graph',
    leaderboard: 'Leaderboard',
    myProgress: 'My Progress',
    rewards: 'Rewards',
    discussionForum: 'Discussion Forum',
    socialProgress: 'Social & Progress',
    
    // Language Selector
    language: 'Language',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिंदी',
    
    // Dashboard Hero & Headings
    welcomeTitle: 'Welcome back, Ethical Thinker 👋',
    heroTag: 'Indian Law + Thirukkural Ethics + AI Simulation',
    heroDesc: 'The premier interactive legal-ethics platform bridging 2,000+ years of classical Indian moral philosophy (Thirukkural) with modern constitutional law, statutory frameworks, and professional responsibilities.',
    launchScenarioBtn: 'Launch Scenario Challenge →',
    exploreKuralsBtn: 'Explore Kural Quest',
    
    // Stats & Metrics
    scenariosCount: '10 Interactive Scenarios',
    kuralsCount: '1,330 Ethical Verses',
    aiTutorFeature: 'AI-Assisted Tutor',
    livePreview: 'LIVE PREVIEW',
    solveScenarioNow: 'Solve Scenario Now →',
    
    // Section Titles
    educationalArchitecture: 'EDUCATIONAL ARCHITECTURE',
    howPlatformTransforms: 'How KuralSaar AI Transforms Legal-Ethics Learning',
    architectureSub: 'Moving beyond dry rote memorization to immersive scenario reflection and timeless philosophical reasoning.',
    
    // Metrics
    xpPoints: 'XP Points',
    streakCount: 'Streak Count',
    ethicalReasoning: 'Ethical Reasoning',
    legalAwareness: 'Legal Awareness',
    criticalThinking: 'Critical Thinking',
    decisionMaking: 'Decision Making',
    masteryProfile: 'Mastery Profile',
    statutoryGrounds: 'Statutory Grounds',
    
    // Dilemma & Recommendation
    todaysDilemma: "Today's Legal Dilemma",
    launchSimulation: 'Launch Full Simulation',
    reviewDilemma: 'Review Dilemma',
    yourSkillsMastery: 'Your Skills Mastery',
    analyticsBtn: 'Analytics →',
    recommendedKural: 'Recommended Kural',
    exploreVirtue: 'Explore Virtue (Aram) →',
    
    // AI Insights
    aiInsightsTitle: 'AI Learning & Competency Insights',
    consultAiTutor: 'Consult AI Tutor →',
    recommendedAction: 'Recommended Action:',
    reviewKural: 'Review Kural',
    
    // General UI
    searchPlaceholder: 'Search law or ethics...',
    level: 'Level',
    online: 'Online',
    activeJourney: 'Active Journey',
    filterNodes: 'Filter Nodes:',
  },
  ta: {
    // Brand & App
    appName: 'குறள்சார் AI',
    tagline: 'சட்டம் & அறவியல்',
    slogan: 'சட்டம் கற்போம். அறம் வாழ்வோம். பொறுப்புடன் சிந்திப்போம்.',
    educationalBanner: 'குறள்சார் AI இந்திய சட்டத்தையும் திருக்குறள் அறத்தையும் இணைக்கிறது. இது உத்தியோகபூர்வ சட்ட ஆலோசனையல்ல.',
    educationalTag: 'கல்வி தளம்',
    
    // Sidebar Navigation
    dashboard: 'கட்டுப்பாட்டகம்',
    kuralQuest: 'குறள் தேடல்',
    scenarioChallenge: 'வழக்கு சவால்',
    ethicsLibrary: 'அறவியல் நூலகம்',
    aiTutor: 'AI சட்ட-அறவியல் ஆசிரியர்',
    knowledgeGraph: 'அறிவு வரைபடம்',
    leaderboard: 'முதன்மைப் பட்டியல்',
    myProgress: 'எனது முன்னேற்றம்',
    rewards: 'விருதுகள்',
    discussionForum: 'கலந்துரையாடல்',
    socialProgress: 'சமூகம் & முன்னேற்றம்',
    
    // Language Selector
    language: 'மொழி',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिंदी',
    
    // Dashboard Hero & Headings
    welcomeTitle: 'நல்வரவு, அறவியல் சிந்தனையாளரே 👋',
    heroTag: 'இந்திய சட்டம் + திருக்குறள் அறம் + AI உருவகப்படுத்துதல்',
    heroDesc: '2,000+ ஆண்டுகால தமிழ் அறநெறி தத்துவத்தை நவீன அரசியலமைப்பு சட்டம் மற்றும் தொழில்சார் பொறுப்புகளுடன் இணைக்கும் முன்னணி கற்றல் தளம்.',
    launchScenarioBtn: 'வழக்கு சவாலைத் தொடங்கு →',
    exploreKuralsBtn: 'குறள்களை ஆராய்க',
    
    // Stats & Metrics
    scenariosCount: '10 ஊடாடும் வழக்குகள்',
    kuralsCount: '1,330 அறநெறி குறள்கள்',
    aiTutorFeature: 'AI வழிநடத்தும் ஆசிரியர்',
    livePreview: 'நேரடி முன்னோட்டம்',
    solveScenarioNow: 'வழக்கை தீர்க்கவும் →',
    
    // Section Titles
    educationalArchitecture: 'கல்வி கட்டமைப்பு',
    howPlatformTransforms: 'குறள்சார் AI எவ்வாறு சட்ட-அறவியல் கற்றலை மாற்றுகிறது',
    architectureSub: 'வெறும் மனப்பாடம் செய்யாமல் ஆழ்ந்த வழக்கு சிந்தனை மற்றும் காலமற்ற தத்துவ ரீதியான விளக்கங்கள் மூலம் கற்றல்.',
    
    // Metrics
    xpPoints: 'அனுபவ புள்ளிகள் (XP)',
    streakCount: 'தொடர் நாட்கள்',
    ethicalReasoning: 'அறவியல் சிந்தனை',
    legalAwareness: 'சட்ட விழிப்புணர்வு',
    criticalThinking: 'ஆராய்ச்சி சிந்தனை',
    decisionMaking: 'முடிவெடுக்கும் திறன்',
    masteryProfile: 'தேர்ச்சி விவரம்',
    statutoryGrounds: 'சட்டப் பின்னணி',
    
    // Dilemma & Recommendation
    todaysDilemma: 'இன்றைய சட்ட சவால்',
    launchSimulation: 'முழு உருவகப்படுத்துதலைத் தொடங்கு',
    reviewDilemma: 'வழக்கை மறுபரிசீலனை செய்க',
    yourSkillsMastery: 'உங்கள் திறன்களின் தேர்ச்சி',
    analyticsBtn: 'பகுப்பாய்வு →',
    recommendedKural: 'பரிந்துரைக்கப்பட்ட குறள்',
    exploreVirtue: 'அறத்தை ஆராய்க →',
    
    // AI Insights
    aiInsightsTitle: 'AI கற்றல் மற்றும் திறன் பகுப்பாய்வு',
    consultAiTutor: 'AI ஆசிரியரிடம் கேட்க →',
    recommendedAction: 'பரிந்துரைக்கப்பட்ட நடவடிக்கை:',
    reviewKural: 'குறளைப் பார்க்க',
    
    // General UI
    searchPlaceholder: 'சட்டம் அல்லது அறத்தைத் தேடுக...',
    level: 'நிலை',
    online: 'இணைப்பில்',
    activeJourney: 'செயலில் உள்ள பயணம்',
    filterNodes: 'முனைகளை வடிகட்டுக:',
  },
  hi: {
    // Brand & App
    appName: 'कुरलसार AI',
    tagline: 'कानून एवं नीतिशास्त्र',
    slogan: 'कानून सीखें। नीति जिएं। जिम्मेदारी से सोचें।',
    educationalBanner: 'कुरलसार AI भारतीय कानून को तिरुक्कुरल नीतिशास्त्र के साथ जोड़ता है। यह औपचारिक कानूनी सलाह नहीं है।',
    educationalTag: 'शैक्षणिक मंच',
    
    // Sidebar Navigation
    dashboard: 'डैशबोर्ड',
    kuralQuest: 'कुरल खोज',
    scenarioChallenge: 'केस चुनौती',
    ethicsLibrary: 'नीतिशास्त्र पुस्तकालय',
    aiTutor: 'AI कानूनी नीति गुरु',
    knowledgeGraph: 'ज्ञान आरेख',
    leaderboard: 'लीडरबोर्ड',
    myProgress: 'मेरी प्रगति',
    rewards: 'पुरस्कार',
    discussionForum: 'चर्चा मंच',
    socialProgress: 'सामाजिक एवं प्रगति',
    
    // Language Selector
    language: 'भाषा',
    english: 'English',
    tamil: 'தமிழ்',
    hindi: 'हिंदी',
    
    // Dashboard Hero & Headings
    welcomeTitle: 'आपका स्वागत है, नैतिक विचारक 👋',
    heroTag: 'भारतीय कानून + तिरुक्कुरल नीतिशास्त्र + AI सिमुलेशन',
    heroDesc: '2,000+ वर्षों के शास्त्रीय भारतीय नैतिक दर्शन (तिरुक्कुरल) को आधुनिक संवैधानिक कानून, वैधानिक ढांचे और व्यावसायिक जिम्मेदारियों से जोड़ने वाला अग्रणी मंच।',
    launchScenarioBtn: 'केस चुनौती शुरू करें →',
    exploreKuralsBtn: 'कुरल अन्वेषण करें',
    
    // Stats & Metrics
    scenariosCount: '10 इंटरैक्टिव केस परिदृश्य',
    kuralsCount: '1,330 नैतिक छंद',
    aiTutorFeature: 'AI सहायक गुरु',
    livePreview: 'लाइव पूर्वावलोकन',
    solveScenarioNow: 'केस सुलझाएं →',
    
    // Section Titles
    educationalArchitecture: 'शैक्षणिक वास्तुकला',
    howPlatformTransforms: 'कुरलसार AI कानूनी-नीति सीखने के तरीके को कैसे बदलता है',
    architectureSub: 'केवल रटने के बजाय व्यावहारिक केस चिंतन और कालातीत दार्शनिक तर्क के माध्यम से सीखें।',
    
    // Metrics
    xpPoints: 'अनुभव अंक (XP)',
    streakCount: 'निरंतरता दिन',
    ethicalReasoning: 'नैतिक तर्क क्षमता',
    legalAwareness: 'कानूनी जागरूकता',
    criticalThinking: 'गंभीर सोच',
    decisionMaking: 'निर्णय लेने की क्षमता',
    masteryProfile: 'दक्षता प्रोफ़ाइल',
    statutoryGrounds: 'वैधानिक आधार',
    
    // Dilemma & Recommendation
    todaysDilemma: 'आज की कानूनी दुविधा',
    launchSimulation: 'पूर्ण सिमुलेशन शुरू करें',
    reviewDilemma: 'दुविधा की समीक्षा करें',
    yourSkillsMastery: 'आपकी कौशल दक्षता',
    analyticsBtn: 'विश्लेषण →',
    recommendedKural: 'अनुशंसित कुरल',
    exploreVirtue: 'सद्गुण (अरम) खोजें →',
    
    // AI Insights
    aiInsightsTitle: 'AI शिक्षण एवं क्षमता अंतर्दृष्टि',
    consultAiTutor: 'AI ट्यूटर से परामर्श लें →',
    recommendedAction: 'अनुशंसित कार्रवाई:',
    reviewKural: 'कुरल देखें',
    
    // General UI
    searchPlaceholder: 'कानून या नीतिशास्त्र खोजें...',
    level: 'स्तर',
    online: 'ऑनलाइन',
    activeJourney: 'सक्रिय यात्रा',
    filterNodes: 'नोड्स फ़िल्टर करें:',
  },
};
