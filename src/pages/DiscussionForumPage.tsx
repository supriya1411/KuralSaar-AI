import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ForumPost } from '../types';
import { forumService } from '../services/forumService';
import { VoiceRecorder } from '../components/forum/VoiceRecorder';
import { VoicePlayer } from '../components/forum/VoicePlayer';
import { VoiceDictationButton } from '../components/common/VoiceDictationButton';
import {
  MessagesSquare,
  ThumbsUp,
  MessageCircle,
  Plus,
  Search,
  Send,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const DiscussionForumPage: React.FC = () => {
  const { userProgress, t } = useApp();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Scenario Debates');
  const [newAudioUrl, setNewAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Replies state
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({});
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [replyAudioMap, setReplyAudioMap] = useState<Record<string, string | null>>({});
  const [isSubmittingReplyMap, setIsSubmittingReplyMap] = useState<Record<string, boolean>>({});

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
    if (!newTitle.trim() || (!newContent.trim() && !newAudioUrl)) return;

    setIsSubmitting(true);
    const created = await forumService.createPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      authorName: userProgress.userName,
      authorRole: userProgress.userRole,
      authorAvatar: userProgress.avatarUrl,
      tags: ['Discussion', 'Ethics'],
      audioUrl: newAudioUrl || undefined,
    });

    if (created) {
      setPosts([created, ...posts]);
    } else {
      await fetchPosts();
    }

    setNewTitle('');
    setNewContent('');
    setNewAudioUrl(null);
    setIsSubmitting(false);
    setShowCreateModal(false);
  };

  const toggleReplies = (postId: string) => {
    setExpandedPostIds((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddReply = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const replyText = replyTextMap[postId] || '';
    const replyAudio = replyAudioMap[postId] || null;

    if (!replyText.trim() && !replyAudio) return;

    setIsSubmittingReplyMap((prev) => ({ ...prev, [postId]: true }));

    const updatedPost = await forumService.createReply(postId, {
      content: replyText.trim(),
      authorName: userProgress.userName,
      authorRole: userProgress.userRole,
      authorAvatar: userProgress.avatarUrl,
      audioUrl: replyAudio || undefined,
    });

    if (updatedPost) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
    }

    setReplyTextMap((prev) => ({ ...prev, [postId]: '' }));
    setReplyAudioMap((prev) => ({ ...prev, [postId]: null }));
    setIsSubmittingReplyMap((prev) => ({ ...prev, [postId]: false }));
  };

  const filteredPosts = posts;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <MessagesSquare className="w-3.5 h-3.5 text-amber-600" />
            {t('discussionForum')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            {t('forumTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            {t('slogan')}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400 stroke-[3]" />
          {t('createPost')}
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {['All', 'Scenario Debates', 'Kural Interpretations', 'Legal Ethics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#071B3A] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? t('all') : cat}
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
          />
          <div className="absolute right-1">
            <VoiceDictationButton currentValue={searchQuery} onTranscript={(text) => setSearchQuery(text)} />
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isExpanded = !!expandedPostIds[post.id];
          const replies = post.replies || [];

          return (
            <div
              key={post.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition-all"
            >
              {/* Author info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {post.authorRole} • {post.timestamp}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 text-xs font-bold text-blue-950 bg-blue-100 rounded-full border border-blue-200">
                  {post.category}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
                  {post.title}
                </h3>
                {post.content && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 font-medium">
                    {post.content}
                  </p>
                )}
                {post.audioUrl && (
                  <VoicePlayer audioUrl={post.audioUrl} authorName={post.authorName} />
                )}
              </div>

              {/* Tags & Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  {post.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                    {post.upvotes} Upvotes
                  </button>

                  <button
                    onClick={() => toggleReplies(post.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                    {post.replyCount} Replies
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Replies Thread */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                  <h4 className="text-xs font-extrabold text-[#071B3A] uppercase tracking-wider">
                    Discussion Replies ({replies.length})
                  </h4>

                  {/* List of existing replies */}
                  <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-100">
                    {replies.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No replies yet. Be the first to reply!</p>
                    ) : (
                      replies.map((reply) => (
                        <div key={reply.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={reply.authorAvatar || reply.avatar}
                                alt={reply.authorName || reply.author}
                                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-900 block leading-tight">
                                  {reply.authorName || reply.author}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {reply.authorRole} • {reply.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>

                          {reply.content && (
                            <p className="text-xs text-slate-700 leading-relaxed font-medium pl-9">
                              {reply.content}
                            </p>
                          )}

                          {reply.audioUrl && (
                            <div className="pl-9">
                              <VoicePlayer
                                audioUrl={reply.audioUrl}
                                authorName={reply.authorName || reply.author}
                                compact
                              />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Reply form */}
                  <form
                    onSubmit={(e) => handleAddReply(post.id, e)}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <h5 className="text-xs font-bold text-slate-800">Add a Reply</h5>
                    <div className="relative">
                      <textarea
                        rows={2}
                        placeholder="Write your legal or ethical reply..."
                        value={replyTextMap[post.id] || ''}
                        onChange={(e) =>
                          setReplyTextMap((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        className="w-full p-2.5 pr-9 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                      />
                      <div className="absolute right-2 top-2.5">
                        <VoiceDictationButton
                          currentValue={replyTextMap[post.id] || ''}
                          onTranscript={(text) =>
                            setReplyTextMap((prev) => ({ ...prev, [post.id]: text }))
                          }
                        />
                      </div>
                    </div>

                    <VoiceRecorder
                      compact
                      onAudioChange={(audioUrl) =>
                        setReplyAudioMap((prev) => ({ ...prev, [post.id]: audioUrl }))
                      }
                    />

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        disabled={
                          isSubmittingReplyMap[post.id] ||
                          (!replyTextMap[post.id]?.trim() && !replyAudioMap[post.id])
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:bg-slate-300 rounded-xl shadow-2xs cursor-pointer transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Post Reply
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
                Start a New Discussion
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Scenario Debates">Scenario Debates</option>
                  <option value="Kural Interpretations">Kural Interpretations</option>
                  <option value="Legal Ethics">Legal Ethics</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Topic Title</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="e.g., How does Kural 131 apply to Section 126 Evidence Act?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                    required
                  />
                  <div className="absolute right-2">
                    <VoiceDictationButton currentValue={newTitle} onTranscript={(text) => setNewTitle(text)} />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussion Details</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Elaborate your ethical question or legal synthesis..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full p-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  />
                  <div className="absolute right-2 top-2.5">
                    <VoiceDictationButton currentValue={newContent} onTranscript={(text) => setNewContent(text)} />
                  </div>
                </div>
              </div>

              {/* Voice Recorder Integration */}
              <VoiceRecorder onAudioChange={setNewAudioUrl} />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (!newTitle.trim()) || (!newContent.trim() && !newAudioUrl)}
                  className="px-5 py-2 font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:bg-slate-300 rounded-xl shadow-2xs cursor-pointer transition-all"
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
