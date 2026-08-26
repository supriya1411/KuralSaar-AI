import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ForumPost } from '../types';
import { forumService } from '../services/forumService';
import {
  MessagesSquare,
  ThumbsUp,
  MessageCircle,
  Tag,
  Plus,
  Search,
  Sparkles,
  Send,
  X,
  RefreshCw,
} from 'lucide-react';

export const DiscussionForumPage: React.FC = () => {
  const { userProgress } = useApp();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Scenario Debates');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    const data = await forumService.getPosts(activeCategory, searchQuery);
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, searchQuery]);

  const handleUpvote = async (postId: string) => {
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
    await forumService.upvotePost(postId);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsSubmitting(true);
    const created = await forumService.createPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      authorName: userProgress.userName,
      authorRole: userProgress.userRole,
      authorAvatar: userProgress.avatarUrl,
      tags: ['Discussion', 'Ethics'],
    });

    if (created) {
      setPosts([created, ...posts]);
    } else {
      await fetchPosts();
    }

    setNewTitle('');
    setNewContent('');
    setIsSubmitting(false);
    setShowCreateModal(false);
  };

  const filteredPosts = posts;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0E1330] via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <MessagesSquare className="w-3.5 h-3.5" />
            Peer Jurisprudence & Ethical Discourse
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Discussion Forum
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Collaborate with peers, discuss complex moral conflicts, and analyze how classical ethics informs constitutional and courtroom reasoning.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-2xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Start New Topic
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {['All', 'Scenario Debates', 'Kural Interpretations', 'Legal Ethics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 text-slate-900"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 hover:border-indigo-300 transition-all"
          >
            {/* Author info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-indigo-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                  <p className="text-xs text-slate-400">
                    {post.authorRole} • {post.timestamp}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200/60">
                {post.category}
              </span>
            </div>

            {/* Title & Body */}
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                {post.content}
              </p>
            </div>

            {/* Tags & Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-indigo-50"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {post.upvotes} Upvotes
                </button>

                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-indigo-50">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {post.replyCount} Replies
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 bg-white rounded-3xl shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Start a New Discussion
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                >
                  <option value="Scenario Debates">Scenario Debates</option>
                  <option value="Kural Interpretations">Kural Interpretations</option>
                  <option value="Legal Ethics">Legal Ethics</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Topic Title</label>
                <input
                  type="text"
                  placeholder="e.g., How does Kural 131 apply to Section 126 Evidence Act?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussion Details</label>
                <textarea
                  rows={4}
                  placeholder="Elaborate your ethical question or legal synthesis..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
