"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Clock,
  Flame,
  Play,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default function ExplorePage() {
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
      if (sortBy === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        // For popular, we'd need likes count - for now just use newest
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              AniMachi
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing content from our community. Join us to unlock more
            features!
          </p>
        </div>
      </section>

      {/* Featured Anime Preview */}
      <section className="py-12 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <Star className="w-7 h-7 text-yellow-400 mr-3" />
              Featured Anime
            </h2>
            <Link href="/anime">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                <Play className="w-4 h-4 mr-2" />
                View All Anime
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Attack on Titan",
                poster: "/placeholder-anime.jpg",
                rating: 9.0,
                status: "Completed",
                genre: "Action, Drama",
              },
              {
                title: "Demon Slayer",
                poster: "/placeholder-anime.jpg",
                rating: 8.7,
                status: "Completed",
                genre: "Action, Supernatural",
              },
              {
                title: "My Hero Academia",
                poster: "/placeholder-anime.jpg",
                rating: 8.4,
                status: "Ongoing",
                genre: "Action, Superhero",
              },
            ].map((anime) => (
              <Card
                key={anime.title}
                className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-white text-xs font-semibold">
                        {anime.rating}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {anime.title}
                    </h3>
                    <p className="text-gray-300 text-xs">{anime.genre}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Content */}
      <section className="py-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <TrendingUp className="w-7 h-7 text-green-400 mr-3" />
              Community Content
            </h2>
            <Link href="/community">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <Select
              value={filter}
              onValueChange={(value: "all" | "MEME" | "EDIT" | "DISCUSSION") => setFilter(value)}
            >
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MEME">Memes</SelectItem>
                <SelectItem value="EDIT">Edits</SelectItem>
                <SelectItem value="DISCUSSION">Discussions</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value: "newest" | "popular") => setSortBy(value)}
            >
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <Flame className="w-4 h-4 mr-2" />
                    Popular
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading content...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No posts found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredPosts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {filteredPosts.length > 6 && (
            <div className="text-center mt-8">
              <Link href="/community">
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  View More Content
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
