"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Clock, Flame } from "lucide-react";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "MEME" | "EDIT" | "DISCUSSION">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || post.type === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.likesCount - a.likesCount;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading community posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Community Hub
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Share your thoughts, memes, and edits with fellow anime
              enthusiasts
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {posts.length}
              </div>
              <div className="text-purple-300 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {posts.reduce((sum, post) => sum + post.likesCount, 0)}
              </div>
              <div className="text-purple-300 text-sm">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {posts.reduce((sum, post) => sum + post.commentsCount, 0)}
              </div>
              <div className="text-purple-300 text-sm">Comments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search - Seamless transition */}
      <section className="py-8 bg-gradient-to-b from-purple-900/30 to-slate-900/80 relative">
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1 w-full">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 rounded-xl focus:bg-slate-700/70 focus:border-purple-500/50 transition-all duration-300"
                    />
                  </div>

                  {/* Filter */}
                  <Select
                    value={filter}
                    onValueChange={(
                      value: "all" | "MEME" | "EDIT" | "DISCUSSION"
                    ) => setFilter(value)}
                  >
                    <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600/50 text-white rounded-xl hover:bg-slate-700/70 transition-all duration-300">
                      <Filter className="w-4 h-4 mr-2 text-purple-300" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 rounded-xl">
                      <SelectItem
                        value="all"
                        className="text-white hover:bg-slate-700"
                      >
                        All Posts
                      </SelectItem>
                      <SelectItem
                        value="MEME"
                        className="text-white hover:bg-slate-700"
                      >
                        Memes
                      </SelectItem>
                      <SelectItem
                        value="EDIT"
                        className="text-white hover:bg-slate-700"
                      >
                        Edits
                      </SelectItem>
                      <SelectItem
                        value="DISCUSSION"
                        className="text-white hover:bg-slate-700"
                      >
                        Discussions
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select
                    value={sortBy}
                    onValueChange={(value: "newest" | "popular") =>
                      setSortBy(value)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600/50 text-white rounded-xl hover:bg-slate-700/70 transition-all duration-300">
                      {sortBy === "popular" ? (
                        <Flame className="w-4 h-4 mr-2 text-orange-400" />
                      ) : (
                        <Clock className="w-4 h-4 mr-2 text-purple-300" />
                      )}
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 rounded-xl">
                      <SelectItem
                        value="newest"
                        className="text-white hover:bg-slate-700"
                      >
                        Newest
                      </SelectItem>
                      <SelectItem
                        value="popular"
                        className="text-white hover:bg-slate-700"
                      >
                        Popular
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Feed */}
      <section className="py-12 bg-gradient-to-b from-slate-900/80 to-slate-900">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                <Search className="w-10 h-10 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No posts found
              </h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                {searchQuery || filter !== "all"
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "Be the first to share something amazing with the community!"}
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {filter === "all"
                    ? "Latest Posts"
                    : `${filter.charAt(0) + filter.slice(1).toLowerCase()}s`}
                </h2>
                <p className="text-gray-400">
                  {filteredPosts.length} post
                  {filteredPosts.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
