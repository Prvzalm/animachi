"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon, Filter, X } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "MEME" | "EDIT" | "DISCUSSION">(
    "all"
  );
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (!searchTerm.trim() || searchTerm.length < 2) {
      setError("Please enter at least 2 characters to search");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      params.append("q", searchTerm);
      if (filter !== "all") {
        params.append("type", filter);
      }

      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) {
        throw new Error("Failed to search");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Search AniMachi
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find posts, memes, edits, and discussions from the anime community
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search posts, memes, edits..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-10 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <Select
                value={filter}
                onValueChange={(
                  value: "all" | "MEME" | "EDIT" | "DISCUSSION"
                ) => setFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="MEME">Memes</SelectItem>
                  <SelectItem value="EDIT">Edits</SelectItem>
                  <SelectItem value="DISCUSSION">Discussions</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => handleSearch()}
                disabled={loading || query.length < 2}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Search Error
              </h3>
              <p className="text-gray-400">{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Searching...</p>
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Search Results ({results.length})
                </h2>
                <p className="text-gray-400">
                  Showing results for &quot;{query}&quot;{" "}
                  {filter !== "all" && `in ${filter.toLowerCase()}s`}
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {results.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
