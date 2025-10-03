"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Heart,
  Plus,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

interface Episode {
  id: string;
  ep_no: number;
  title: string;
  video_url: string;
  duration: number;
}

interface AnimeDetails {
  id: string;
  title: string;
  poster: string;
  description: string;
  genres: string[];
  status: string;
  rating: number;
  release_date: string;
  episodes: Episode[];
}

export default function AnimeDetailPage() {
  const params = useParams();
  const animeId = params.id as string;

  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      const mockAnime: AnimeDetails = {
        id: animeId,
        title: "Attack on Titan",
        poster: "/placeholder-anime.jpg",
        description:
          "In a world where humanity lives inside cities surrounded by walls due to giant humanoid Titans that prey on them, Eren Yeager vows to cleanse the earth of the Titans after a Titan brings about the destruction of his hometown and the death of his mother.",
        genres: [
          "Action",
          "Drama",
          "Fantasy",
          "Military",
          "Mystery",
          "Shounen",
        ],
        status: "completed",
        rating: 9.0,
        release_date: "2013",
        episodes: Array.from({ length: 25 }, (_, i) => ({
          id: `ep-${i + 1}`,
          ep_no: i + 1,
          title: `Episode ${i + 1}: ${
            [
              "To You, in 2000 Years",
              "That Day",
              "A Dim Light Amid Despair",
              "The Night of the Closing Ceremony",
            ][i % 4]
          }`,
          video_url: `/placeholder-video.mp4`, // HLS stream would go here
          duration: 1440, // 24 minutes in seconds
        })),
      };
      setAnime(mockAnime);
      setSelectedEpisode(mockAnime.episodes[0]);
      setLoading(false);
    }, 1000);
  }, [animeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 mt-4">Loading anime...</p>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Anime not found</p>
          <Link href="/anime">
            <Button className="mt-4">Back to Anime</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/anime">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Anime
          </Button>
        </Link>
      </div>

      {/* Anime Header */}
      <section className="py-8 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {anime.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-white font-semibold">
                        {anime.rating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-300">
                        {anime.release_date}
                      </span>
                    </div>
                    <Badge
                      className={`${
                        anime.status === "ongoing"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }`}
                    >
                      {anime.status === "ongoing" ? "Ongoing" : "Completed"}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Library
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
                {anime.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player & Episodes */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                    {selectedEpisode ? (
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                        <h3 className="text-xl font-semibold mb-2">
                          Episode {selectedEpisode.ep_no}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {selectedEpisode.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Video player would be implemented here with HLS
                          streaming
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          Duration: {Math.floor(selectedEpisode.duration / 60)}:
                          {(selectedEpisode.duration % 60)
                            .toString()
                            .padStart(2, "0")}
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        Select an episode to start watching
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Episodes List */}
            <div>
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4">Episodes</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {anime.episodes.map((episode) => (
                      <div
                        key={episode.id}
                        onClick={() => setSelectedEpisode(episode)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedEpisode?.id === episode.id
                            ? "bg-purple-500/20 border border-purple-500/30"
                            : "hover:bg-slate-700/50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-purple-400 font-semibold text-sm">
                                EP {episode.ep_no}
                              </span>
                              <div className="flex items-center text-gray-400 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {Math.floor(episode.duration / 60)}:
                                {(episode.duration % 60)
                                  .toString()
                                  .padStart(2, "0")}
                              </div>
                            </div>
                            <p className="text-white text-sm font-medium line-clamp-2">
                              {episode.title}
                            </p>
                          </div>
                          {selectedEpisode?.id === episode.id && (
                            <Play className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
