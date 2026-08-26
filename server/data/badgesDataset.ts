import { BadgeItem, LeaderboardUserData } from '../types';

export const BADGES_DATASET: BadgeItem[] = [
  {
    id: 'badge-1',
    name: 'First Verdict',
    description: 'Successfully resolved your very first legal-ethics dilemma scenario.',
    icon: 'Gavel',
    category: 'Milestone',
    casesThreshold: 1,
    unlocked: true,
    unlockedAt: '2026-08-20T10:00:00.000Z'
  },
  {
    id: 'badge-2',
    name: 'Balance of Aram',
    description: 'Mastered the core concepts of Impartiality (Naduvunilaimai) and Natural Justice.',
    icon: 'Scale',
    category: 'Virtue',
    xpThreshold: 200,
    unlocked: true,
    unlockedAt: '2026-08-22T14:30:00.000Z'
  },
  {
    id: 'badge-3',
    name: 'Cyber Sentinel',
    description: 'Demonstrated complete awareness of digital rights, cyberbullying, and online fraud protections.',
    icon: 'ShieldCheck',
    category: 'Legal',
    casesThreshold: 3,
    unlocked: true,
    unlockedAt: '2026-08-23T09:15:00.000Z'
  },
  {
    id: 'badge-4',
    name: 'Ethical Scholar',
    description: 'Reviewed and meditated upon 10+ classical Thirukkural couplets in Kural Quest.',
    icon: 'BookOpen',
    category: 'Mastery',
    xpThreshold: 500,
    unlocked: true,
    unlockedAt: '2026-08-24T18:00:00.000Z'
  },
  {
    id: 'badge-5',
    name: 'Constitutional Guardian',
    description: 'Mastered the fundamentals of Article 14, 15, and 21 in anti-discrimination cases.',
    icon: 'Landmark',
    category: 'Legal',
    casesThreshold: 5,
    unlocked: false
  },
  {
    id: 'badge-6',
    name: '7-Day Wisdom Streak',
    description: 'Maintained an unbroken daily ethical reasoning practice for 7 consecutive days.',
    icon: 'Flame',
    category: 'Milestone',
    streakThreshold: 7,
    unlocked: false
  },
  {
    id: 'badge-7',
    name: 'Purity of Action',
    description: 'Completed the advanced Anti-Corruption and Whistleblowing dilemmas with flawless accuracy.',
    icon: 'Award',
    category: 'Virtue',
    casesThreshold: 8,
    unlocked: false
  },
  {
    id: 'badge-8',
    name: 'Grand Jurist',
    description: 'Resolved all 12 scenario challenges and unlocked complete knowledge graph connections.',
    icon: 'Crown',
    category: 'Mastery',
    casesThreshold: 12,
    unlocked: false
  }
];

export const INITIAL_LEADERBOARD_USERS: LeaderboardUserData[] = [
  {
    id: 'user-curr',
    name: 'Arun Kumar',
    title: 'Senior Legal-Ethics Scholar',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 2840,
    streak: 5,
    accuracy: 94,
    rank: 4,
    institution: 'National Law School of India University',
    isCurrentUser: true
  },
  {
    id: 'user-1',
    name: 'Priya Sundaram',
    title: 'Chief Justice Fellow',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    xp: 4120,
    streak: 18,
    accuracy: 98,
    rank: 1,
    institution: 'Tamil Nadu Dr. Ambedkar Law University'
  },
  {
    id: 'user-2',
    name: 'Kavitha Ramanathan',
    title: 'Senior Jurisprudence Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    xp: 3890,
    streak: 14,
    accuracy: 96,
    rank: 2,
    institution: 'Madras Law College'
  },
  {
    id: 'user-3',
    name: 'Siddharth Iyer',
    title: 'Constitutional Advocate',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 3410,
    streak: 9,
    accuracy: 92,
    rank: 3,
    institution: 'Symbiosis Law School'
  },
  {
    id: 'user-5',
    name: 'Meenakshi Natarajan',
    title: 'Ethics Researcher',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    xp: 2420,
    streak: 4,
    accuracy: 89,
    rank: 5,
    institution: 'School of Excellence in Law'
  },
  {
    id: 'user-6',
    name: 'Deepak Varma',
    title: 'Junior Legal Researcher',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    xp: 1980,
    streak: 3,
    accuracy: 86,
    rank: 6,
    institution: 'NALSAR University of Law'
  }
];
