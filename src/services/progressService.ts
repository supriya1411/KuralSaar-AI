import { UserProgress, Badge, LeaderboardUser } from '../types';
import { Language } from '../i18n/translations';

const STORAGE_KEY = 'justice_ai_user_progress_v1';

const DEFAULT_USER_PROGRESS: UserProgress = {
  userId: 'user-curr',
  userName: 'Arun Kumar',
  userRole: 'Senior Legal-Ethics Scholar',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: 4,
  levelTitle: 'Dharma & Nyaya Practitioner',
  xp: 2840,
  nextLevelXp: 3500,
  streakDays: 5,
  bestStreak: 12,
  casesCompleted: 4,
  totalCases: 12,
  accuracyPercentage: 94,
  skills: {
    legalAwareness: 88,
    ethicalReasoning: 92,
    conflictResolution: 88,
    prosocialDecisionMaking: 90,
    criticalThinking: 86,
    professionalEthics: 94
  },
  unlockedBadgeIds: ['badge-1', 'badge-2', 'badge-3', 'badge-4'],
  solvedScenarioIds: ['scen-1', 'scen-2', 'scen-3', 'scen-4'],
  scenarioAnswers: {},
  recentActivity: [
    { id: 'act-1', title: 'Road Rage Restraint Simulation', type: 'scenario', timestamp: 'Today', xpEarned: 100 },
    { id: 'act-2', title: 'Explored Kural 118 Impartiality', type: 'kural', timestamp: 'Yesterday', xpEarned: 25 },
    { id: 'act-3', title: 'AI Ethics & Algorithmic Sentencing Query', type: 'tutor', timestamp: '2 days ago', xpEarned: 50 },
  ]
};

export const progressService = {
  getUserProgress(): UserProgress {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_USER_PROGRESS;
  },

  async fetchServerProgress(): Promise<UserProgress> {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          const transformed: UserProgress = {
            userId: d.userId || 'user-curr',
            userName: d.userName || 'Arun Kumar',
            userRole: d.userRole || 'Senior Legal-Ethics Scholar',
            avatarUrl: d.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            level: d.level || 4,
            levelTitle: d.levelTitle || 'Dharma & Nyaya Practitioner',
            xp: d.xp || 2840,
            nextLevelXp: d.nextLevelXp || 3500,
            streakDays: d.streakDays || 5,
            bestStreak: d.bestStreak || 12,
            casesCompleted: d.casesCompleted || 4,
            totalCases: d.totalCases || 12,
            accuracyPercentage: d.accuracyPercentage || 94,
            skills: {
              legalAwareness: d.skills?.legalAwareness || 88,
              ethicalReasoning: d.skills?.ethicalReasoning || 92,
              conflictResolution: d.skills?.prosocialDecisionMaking || 88,
              prosocialDecisionMaking: d.skills?.prosocialDecisionMaking || 90,
              criticalThinking: d.skills?.criticalThinking || 86,
              professionalEthics: d.skills?.professionalEthics || 94
            },
            unlockedBadgeIds: d.unlockedBadgeIds || ['badge-1', 'badge-2', 'badge-3', 'badge-4'],
            solvedScenarioIds: d.completedScenarioIds || ['scen-1', 'scen-2', 'scen-3', 'scen-4'],
            scenarioAnswers: {},
            recentActivity: (d.scenarioAttempts || []).map((att: any, idx: number) => ({
              id: `act-${idx}`,
              title: `Scenario Challenge #${att.scenarioNumber}`,
              type: 'scenario' as const,
              timestamp: new Date(att.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
              xpEarned: att.xpEarned
            }))
          };
          this.saveUserProgress(transformed);
          return transformed;
        }
      }
    } catch (err) {
      console.warn('[progressService] fetchServerProgress error:', err);
    }
    return this.getUserProgress();
  },

  saveUserProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  },

  async getAiLearningInsights(lang: Language = 'en'): Promise<import('../types').AiLearningInsight | null> {
    try {
      const res = await fetch('/api/progress/insights');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (lang === 'ta') {
            return {
              ...d,
              summary: 'உங்கள் செயல்திறன் சட்ட விழிப்புணர்வில் (100% தேர்ச்சி) வலுவான பகுப்பாய்வு திறனைக் காட்டுகிறது, தொடர்ச்சியாக 5 நாட்கள் கற்றல் நிறைவு பெற்றுள்ளது.',
              recommendedAction: 'நடுவுநிலைமை குறித்து குறள் 118-ஐப் பார்த்து, வழக்கு சவால் #2-ஐ முயற்சிக்கவும்.'
            };
          } else if (lang === 'hi') {
            return {
              ...d,
              summary: 'आपका प्रदर्शन कानूनी जागरूकता (100% दक्षता) में मजबूत विश्लेषणात्मक क्षमता दिखाता है, और 5 दिनों की निरंतरता बनी हुई है।',
              recommendedAction: 'निष्पक्षता पर कुरल 118 की समीक्षा करें और केस परिदृश्य #2 का प्रयास करें।'
            };
          }
          return d;
        }
      }
    } catch (err) {
      console.warn('[progressService] getAiLearningInsights error:', err);
    }
    if (lang === 'ta') {
      return {
        summary: 'உங்கள் செயல்திறன் சட்ட விழிப்புணர்வில் (100% தேர்ச்சி) வலுவான பகுப்பாய்வு திறனைக் காட்டுகிறது.',
        strengths: ['அரசியலமைப்பு கோட்பாடுகளில் அதிக பகுப்பாய்வு துல்லியம்'],
        improvementAreas: ['நிறுவன அறநெறியில் கூடுதல் சட்டப் பார்வை'],
        recommendedAction: 'நடுவுநிலைமை குறித்து குறள் 118-ஐப் பார்த்து வழக்கு #2-ஐ முயற்சிக்கவும்.',
        suggestedKuralNumber: 118,
        suggestedScenarioId: 'scen-2'
      };
    } else if (lang === 'hi') {
      return {
        summary: 'आपका प्रदर्शन कानूनी जागरूकता (100% दक्षता) में मजबूत विश्लेषणात्मक क्षमता दिखाता है।',
        strengths: ['संवैधानिक सिद्धांतों पर उच्च विश्लेषणात्मक सटीकता'],
        improvementAreas: ['कॉर्पोरेट नीतिशास्त्र में अधिक वैधानिक अनुभव'],
        recommendedAction: 'निष्पक्षता पर कुरल 118 की समीक्षा करें और केस #2 का प्रयास करें।',
        suggestedKuralNumber: 118,
        suggestedScenarioId: 'scen-2'
      };
    }
    return {
      summary: 'Your performance demonstrates balanced discernment between statutory duty and ethical conscience.',
      strengths: ['High analytical accuracy on constitutional principles', 'Consistent daily practice'],
      improvementAreas: ['Deepen statutory exposure in corporate ethics'],
      recommendedAction: 'Explore Kural 118 on Impartiality and practice Scenario #2.',
      suggestedKuralNumber: 118,
      suggestedScenarioId: 'scen-2'
    };
  },

  async getAllBadges(): Promise<Badge[]> {
    try {
      const res = await fetch('/api/badges');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const progress = this.getUserProgress();
          return json.data.map((b: any) => ({
            id: b.id,
            title: b.name || b.title,
            description: b.description,
            icon: b.icon,
            unlocked: b.unlocked || progress.unlockedBadgeIds?.includes(b.id),
            unlockedAt: b.unlockedAt,
            category: (b.category as any) || 'Mastery',
            xpValue: b.xpThreshold || 100,
            rarity: b.xpThreshold && b.xpThreshold > 500 ? 'Epic' : 'Rare',
            criteria: b.description
          }));
        }
      }
    } catch (err) {
      console.warn('[progressService] getAllBadges fetch error:', err);
    }

    return [];
  },

  async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'allTime' = 'weekly'): Promise<LeaderboardUser[]> {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const multiplier = timeframe === 'weekly' ? 1 : timeframe === 'monthly' ? 2.4 : 4.8;
          return json.data.map((u: any) => ({
            id: u.id,
            name: u.name,
            title: u.title || (u.institution ? `${u.institution}` : 'Legal Scholar'),
            avatarUrl: u.avatarUrl,
            xp: Math.round(u.xp * multiplier),
            streak: u.streak,
            accuracy: u.accuracy,
            rank: u.rank,
            badgesCount: 4
          }));
        }
      }
    } catch (err) {
      console.warn('[progressService] getLeaderboard fetch error:', err);
    }

    return [];
  },
};

