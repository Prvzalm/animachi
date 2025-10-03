"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Play,
  Star,
  Heart,
} from "lucide-react";

interface Anime {
  id: string;
  title: string;
  poster: string;
  description: string;
  genres: string[];
  status: string;
  rating: number;
  release_date: string;
}

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for now
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnime([
        {
          id: "1",
          title: "Attack on Titan",
          poster: "/placeholder-anime.jpg",
          description:
            "In a world where humanity lives inside cities surrounded by walls due to giant humanoid Titans...",
          genres: ["Action", "Drama", "Fantasy"],
          status: "completed",
          rating: 9.0,
          release_date: "2013",
        },
        {
          id: "2",
          title: "Demon Slayer",
          poster: "/placeholder-anime.jpg",
          description:
            "A young boy becomes a demon slayer to avenge his family and cure his sister...",
          genres: ["Action", "Supernatural", "Shounen"],
          status: "completed",
          rating: 8.7,
          release_date: "2019",
        },
        {
          id: "3",
          title: "My Hero Academia",
          poster: "/placeholder-anime.jpg",
          description:
            "In a world where most of the population has superpowers, a young boy dreams of becoming a hero...",
          genres: ["Action", "Superhero", "Shounen"],
          status: "ongoing",
          rating: 8.4,
          release_date: "2016",
        },
        {
          id: "4",
          title: "One Piece",
          poster: "/placeholder-anime.jpg",
          description:
            "Follow Monkey D. Luffy's adventures as he searches for the ultimate treasure...",
          genres: ["Action", "Adventure", "Comedy"],
          status: "ongoing",
          rating: 9.2,
          release_date: "1999",
        },
        {
          id: "5",
          title: "Death Note",
          poster: "/placeholder-anime.jpg",
          description:
            "A high school student discovers a supernatural notebook that allows him to kill anyone...",
          genres: ["Psychological", "Thriller", "Supernatural"],
          status: "completed",
          rating: 9.0,
          release_date: "2006",
        },
        {
          id: "6",
          title: "Fullmetal Alchemist",
          poster: "/placeholder-anime.jpg",
          description:
            "Two brothers use alchemy to restore their bodies after a failed experiment...",
          genres: ["Action", "Adventure", "Drama"],
          status: "completed",
          rating: 9.1,
          release_date: "2003",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const genres = [
    "all",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Shounen",
    "Supernatural",
  ];
  const statuses = ["all", "ongoing", "completed", "upcoming"];

  const filteredAnime = anime.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || item.genres.includes(selectedGenre);
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Anime{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Streaming
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch your favorite anime series with high-quality streaming and no
            ads.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 h-12"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white h-12 min-w-32"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-slate-800">
                    {genre === "all" ? "All Genres" : genre}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white h-12 min-w-32"
              >
                {statuses.map((status) => (
                  <option key={status} value={status} className="bg-slate-800">
                    {status === "all"
                      ? "All Status"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Anime Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading anime...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnime.map((item) => (
                <Card
                  key={item.id}
                  className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-white text-xs font-semibold">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={`text-xs ${
                          item.status === "ongoing"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        }`}
                      >
                        {item.status === "ongoing" ? "Ongoing" : "Completed"}
                      </Badge>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/anime/${item.id}`}>
                        <Button
                          size="lg"
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16"
                        >
                          <Play className="w-6 h-6 ml-1" />
                        </Button>
                      </Link>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xs mb-2">
                        {item.release_date}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.genres.slice(0, 2).map((genre) => (
                          <Badge
                            key={genre}
                            variant="secondary"
                            className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link href={`/anime/${item.id}`}>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredAnime.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No anime found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
