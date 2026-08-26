import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const DATA_DIR = path.join(process.cwd(), '.data');
const FORUM_FILE = path.join(DATA_DIR, 'forum_posts.json');

export interface ForumPostItem {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  replyCount: number;
  timestamp: string;
  tags: string[];
}

const INITIAL_FORUM_POSTS: ForumPostItem[] = [
  {
    id: 'post-1',
    authorName: 'Adv. Priyadarshini M.',
    authorRole: 'Madras High Court Advocate',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'How does Kural 118 reconcile with the standard of proof beyond reasonable doubt?',
    content:
      'Kural 118 emphasizes unswerving impartiality without bending like a balance scale. In criminal trials with circumstantial evidence, how do trial judges balance the presumption of innocence with moral certitude?',
    category: 'Legal Ethics',
    upvotes: 42,
    replyCount: 14,
    timestamp: '2 hours ago',
    tags: ['Kural 118', 'Natural Justice', 'Criminal Law', 'BNS'],
  },
  {
    id: 'post-2',
    authorName: 'Rohan Deshmukh',
    authorRole: 'National Law School Scholar',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'AI in Judicial Decision-Making: A Thirukkural Critique of Automated Bias',
    content:
      'Chapter 55 (Sengolmai) posits that righteous governance requires deep personal understanding of both sides. Can predictive policing algorithms or algorithmic sentencing ever satisfy Aram?',
    category: 'Scenario Debates',
    upvotes: 38,
    replyCount: 9,
    timestamp: '5 hours ago',
    tags: ['AI Ethics', 'Sengolmai', 'Constitutional Law'],
  },
  {
    id: 'post-3',
    authorName: 'Kavitha Sundaram',
    authorRole: 'Corporate Governance Legal Advisor',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Whistleblower Protection vs Confidentiality Agreements: Lessons from Kural 291 (Vaaimai)',
    content:
      'When an associate discovers environmental non-compliance concealed by a non-disclosure agreement, what is the higher duty under Indian law and classical truthfulness?',
    category: 'Kural Interpretations',
    upvotes: 29,
    replyCount: 7,
    timestamp: 'Yesterday',
    tags: ['Whistleblower', 'Vaaimai', 'Companies Act'],
  },
  {
    id: 'post-4',
    authorName: 'Vikramaditya Sen',
    authorRole: 'Constitutional Law Researcher',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Restraint in Road Rage: Private Defence (Sec 34-44 BNS) and Kural 304 on Anger Control',
    content:
      'Exploring the boundary between legitimate self-defence during high-stress public confrontations and unlawful retaliation when anger exceeds necessity.',
    category: 'Scenario Debates',
    upvotes: 51,
    replyCount: 18,
    timestamp: '2 days ago',
    tags: ['Road Rage', 'BNS', 'Anger Control', 'Kural 304'],
  }
];

function loadPosts(): ForumPostItem[] {
  try {
    if (fs.existsSync(FORUM_FILE)) {
      const data = fs.readFileSync(FORUM_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // fallback
  }
  return INITIAL_FORUM_POSTS;
}

function savePosts(posts: ForumPostItem[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FORUM_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch {
    // fallback
  }
}

let postsCache: ForumPostItem[] = loadPosts();

/**
 * GET /api/forum or /api/forum/posts
 */
router.get(['/', '/posts'], (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string)?.trim();
    const search = (req.query.search as string)?.trim().toLowerCase();

    let filtered = [...postsCache];

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.content.toLowerCase().includes(search) ||
          p.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    res.json({
      success: true,
      data: filtered,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/forum or /api/forum/posts
 */
router.post(['/', '/posts'], (req: Request, res: Response): void => {
  try {
    const { authorName, authorRole, authorAvatar, title, content, category, tags } = req.body;

    if (!title || !content) {
      res.status(400).json({ success: false, error: 'Title and content are required.' });
      return;
    }

    const newPost: ForumPostItem = {
      id: `post-${Date.now()}`,
      authorName: authorName || 'Anonymous Scholar',
      authorRole: authorRole || 'Legal-Ethics Scholar',
      authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: title.trim(),
      content: content.trim(),
      category: category || 'Scenario Debates',
      upvotes: 1,
      replyCount: 0,
      timestamp: 'Just now',
      tags: tags || ['Discussion', 'Ethics'],
    };

    postsCache = [newPost, ...postsCache];
    savePosts(postsCache);

    res.json({
      success: true,
      data: newPost,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

/**
 * POST /api/forum/:id/upvote or /api/forum/:id/like or /api/forum/posts/:id/like
 */
router.post(['/:id/upvote', '/:id/like', '/posts/:id/like', '/posts/:id/upvote'], (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const post = postsCache.find((p) => p.id === id);

    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found.' });
      return;
    }

    post.upvotes += 1;
    savePosts(postsCache);

    res.json({
      success: true,
      data: post,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
