import { ForumPost } from '../types';

export const forumService = {
  async getPosts(category?: string, search?: string): Promise<ForumPost[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`/api/forum?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('[forumService] Fetch failed:', err);
      return [];
    }
  },

  async createPost(post: {
    title: string;
    content: string;
    category: string;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
    tags?: string[];
    audioUrl?: string;
  }): Promise<ForumPost | null> {
    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[forumService] Failed to create post:', err);
      return null;
    }
  },

  async createReply(
    postId: string,
    reply: {
      content: string;
      authorName: string;
      authorRole: string;
      authorAvatar: string;
      audioUrl?: string;
    }
  ): Promise<ForumPost | null> {
    try {
      const res = await fetch(`/api/forum/${postId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reply),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[forumService] Failed to create reply:', err);
      return null;
    }
  },

  async upvotePost(id: string): Promise<ForumPost | null> {
    try {
      const res = await fetch(`/api/forum/${id}/upvote`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[forumService] Upvote failed:', err);
      return null;
    }
  },
};
