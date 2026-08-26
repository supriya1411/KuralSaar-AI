import fs from 'fs';
import path from 'path';
import { UserProgressData, ScenarioAttempt, BadgeItem, LeaderboardUserData } from '../types';
import { BADGES_DATASET, INITIAL_LEADERBOARD_USERS } from '../data/badgesDataset';

const DATA_DIR = path.join(process.cwd(), '.data');
const PROGRESS_FILE = path.join(DATA_DIR, 'user_progress.json');

export const DEFAULT_USER_PROGRESS: UserProgressData = {
  userId: 'user-curr',
  userName: 'Arun Kumar',
  userRole: 'Senior Legal-Ethics Scholar',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  xp: 2840,
  level: 4,
  levelTitle: 'Dharma & Nyaya Practitioner',
  nextLevelXp: 3500,
  streakDays: 5,
  bestStreak: 12,
  casesCompleted: 4,
  totalCases: 12,
  accuracyPercentage: 94,
  skills: {
    legalAwareness: 88,
    ethicalReasoning: 92,
    criticalThinking: 86,
    prosocialDecisionMaking: 90,
    professionalEthics: 94
  },
  unlockedBadgeIds: ['badge-1', 'badge-2', 'badge-3', 'badge-4'],
  completedScenarioIds: ['scen-1', 'scen-2', 'scen-3', 'scen-4'],
  reviewedKuralIds: [34, 111, 118, 127, 129, 131, 282, 291, 304, 314],
  scenarioAttempts: [
    {
      scenarioId: 'scen-1',
      scenarioNumber: 1,
      selectedOption: 'B',
      isCorrect: true,
      timestamp: '2026-08-22T14:30:00.000Z',
      xpEarned: 100
    },
    {
      scenarioId: 'scen-2',
      scenarioNumber: 2,
      selectedOption: 'B',
      isCorrect: true,
      timestamp: '2026-08-23T09:15:00.000Z',
      xpEarned: 100
    },
    {
      scenarioId: 'scen-3',
      scenarioNumber: 3,
      selectedOption: 'B',
      isCorrect: true,
      timestamp: '2026-08-24T11:45:00.000Z',
      xpEarned: 100
    },
    {
      scenarioId: 'scen-4',
      scenarioNumber: 4,
      selectedOption: 'B',
      isCorrect: true,
      timestamp: '2026-08-25T08:20:00.000Z',
      xpEarned: 100
    }
  ],
  bookmarks: {
    kuralIds: [118, 131, 541],
    scenarioIds: ['scen-1', 'scen-5'],
    legalIds: ['legal-qa-1', 'legal-qa-5']
  },
  lastActiveDate: new Date().toISOString()
};

export class StorageService {
  private static instance: StorageService;
  private progress: UserProgressData;
  private badges: BadgeItem[];
  private leaderboard: LeaderboardUserData[];

  private constructor() {
    this.ensureDataDirectory();
    this.progress = this.loadProgressFromFile();
    this.badges = JSON.parse(JSON.stringify(BADGES_DATASET));
    this.leaderboard = JSON.parse(JSON.stringify(INITIAL_LEADERBOARD_USERS));
    this.syncBadges();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private ensureDataDirectory(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch {
      // Ignored for environments without write permission
    }
  }

  private loadProgressFromFile(): UserProgressData {
    try {
      if (fs.existsSync(PROGRESS_FILE)) {
        const raw = fs.readFileSync(PROGRESS_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_USER_PROGRESS, ...parsed };
      }
    } catch {
      // Return default if file corrupted
    }
    return JSON.parse(JSON.stringify(DEFAULT_USER_PROGRESS));
  }

  private saveProgressToFile(): void {
    try {
      this.ensureDataDirectory();
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(this.progress, null, 2), 'utf-8');
    } catch {
      // Fallback in memory
    }
  }

  public getProgress(): UserProgressData {
    return { ...this.progress };
  }

  public getBadges(): BadgeItem[] {
    this.syncBadges();
    return [...this.badges];
  }

  public getLeaderboard(): LeaderboardUserData[] {
    // Update current user stats in leaderboard
    const curr = this.leaderboard.find((u) => u.isCurrentUser || u.id === this.progress.userId);
    if (curr) {
      curr.xp = this.progress.xp;
      curr.streak = this.progress.streakDays;
      curr.accuracy = this.progress.accuracyPercentage;
    }
    return [...this.leaderboard].sort((a, b) => b.xp - a.xp).map((u, idx) => ({ ...u, rank: idx + 1 }));
  }

  public recordScenarioAttempt(attempt: ScenarioAttempt): UserProgressData {
    this.progress.scenarioAttempts.push(attempt);

    if (attempt.isCorrect && !this.progress.completedScenarioIds.includes(attempt.scenarioId)) {
      this.progress.completedScenarioIds.push(attempt.scenarioId);
      this.progress.casesCompleted = this.progress.completedScenarioIds.length;
    }

    // Award XP
    this.progress.xp += attempt.xpEarned;

    // Recalculate level
    const newLevel = Math.floor(this.progress.xp / 800) + 1;
    this.progress.level = newLevel;
    this.progress.nextLevelXp = newLevel * 800;

    const titles = [
      'Nyaya Novice',
      'Aram Apprentice',
      'Jurisprudence Scholar',
      'Dharma & Nyaya Practitioner',
      'Constitutional Advocate',
      'Grand Ethics Jurist'
    ];
    this.progress.levelTitle = titles[Math.min(newLevel - 1, titles.length - 1)];

    // Calculate accuracy
    const totalAttempts = this.progress.scenarioAttempts.length;
    const correctAttempts = this.progress.scenarioAttempts.filter((a) => a.isCorrect).length;
    this.progress.accuracyPercentage = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;

    // Incremental skill updates
    if (attempt.isCorrect) {
      this.progress.skills.legalAwareness = Math.min(100, this.progress.skills.legalAwareness + 2);
      this.progress.skills.ethicalReasoning = Math.min(100, this.progress.skills.ethicalReasoning + 2);
      this.progress.skills.criticalThinking = Math.min(100, this.progress.skills.criticalThinking + 2);
      this.progress.skills.prosocialDecisionMaking = Math.min(100, this.progress.skills.prosocialDecisionMaking + 2);
      this.progress.skills.professionalEthics = Math.min(100, this.progress.skills.professionalEthics + 2);
    }

    this.progress.lastActiveDate = new Date().toISOString();
    this.syncBadges();
    this.saveProgressToFile();

    return this.getProgress();
  }

  public recordReviewedKural(kuralNumber: number): UserProgressData {
    if (!this.progress.reviewedKuralIds.includes(kuralNumber)) {
      this.progress.reviewedKuralIds.push(kuralNumber);
      this.progress.xp += 25; // Award 25 XP per Kural study
      this.syncBadges();
      this.saveProgressToFile();
    }
    return this.getProgress();
  }

  public toggleBookmark(type: 'kural' | 'scenario' | 'legal', id: string | number): { isBookmarked: boolean; progress: UserProgressData } {
    let isBookmarked = false;
    if (type === 'kural') {
      const num = typeof id === 'number' ? id : parseInt(id, 10);
      if (this.progress.bookmarks.kuralIds.includes(num)) {
        this.progress.bookmarks.kuralIds = this.progress.bookmarks.kuralIds.filter((k) => k !== num);
        isBookmarked = false;
      } else {
        this.progress.bookmarks.kuralIds.push(num);
        isBookmarked = true;
      }
    } else if (type === 'scenario') {
      const str = String(id);
      if (this.progress.bookmarks.scenarioIds.includes(str)) {
        this.progress.bookmarks.scenarioIds = this.progress.bookmarks.scenarioIds.filter((s) => s !== str);
        isBookmarked = false;
      } else {
        this.progress.bookmarks.scenarioIds.push(str);
        isBookmarked = true;
      }
    } else if (type === 'legal') {
      const str = String(id);
      if (this.progress.bookmarks.legalIds.includes(str)) {
        this.progress.bookmarks.legalIds = this.progress.bookmarks.legalIds.filter((l) => l !== str);
        isBookmarked = false;
      } else {
        this.progress.bookmarks.legalIds.push(str);
        isBookmarked = true;
      }
    }

    this.saveProgressToFile();
    return { isBookmarked, progress: this.getProgress() };
  }

  private syncBadges(): void {
    for (const badge of this.badges) {
      if (badge.unlocked) continue;

      if (badge.casesThreshold && this.progress.casesCompleted >= badge.casesThreshold) {
        badge.unlocked = true;
        badge.unlockedAt = new Date().toISOString();
        if (!this.progress.unlockedBadgeIds.includes(badge.id)) {
          this.progress.unlockedBadgeIds.push(badge.id);
        }
      }

      if (badge.xpThreshold && this.progress.xp >= badge.xpThreshold) {
        badge.unlocked = true;
        badge.unlockedAt = new Date().toISOString();
        if (!this.progress.unlockedBadgeIds.includes(badge.id)) {
          this.progress.unlockedBadgeIds.push(badge.id);
        }
      }

      if (badge.streakThreshold && this.progress.streakDays >= badge.streakThreshold) {
        badge.unlocked = true;
        badge.unlockedAt = new Date().toISOString();
        if (!this.progress.unlockedBadgeIds.includes(badge.id)) {
          this.progress.unlockedBadgeIds.push(badge.id);
        }
      }
    }
  }

  public updateProgress(updated: Partial<UserProgressData>): UserProgressData {
    this.progress = {
      ...this.progress,
      ...updated,
      skills: {
        ...this.progress.skills,
        ...(updated.skills || {})
      }
    };
    this.syncBadges();
    this.saveProgressToFile();
    return this.getProgress();
  }

  public resetProgress(): UserProgressData {
    this.progress = JSON.parse(JSON.stringify(DEFAULT_USER_PROGRESS));
    this.saveProgressToFile();
    return this.getProgress();
  }
}
