"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Play, BookOpen, Trash2 } from "lucide-react";

interface LibraryItem {
  id: string;
  title: string;
  type: "anime" | "manga" | "edit";
  status: "watching" | "completed" | "plan_to_watch";
  poster: string;
  progress?: number;
  totalEpisodes?: number;
}

export default function LibraryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [library, setLibrary] = useState<LibraryItem[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Mock data
    if (session) {
      setLibrary([
        {
          id: "1",
          title: "Attack on Titan",
          type: "anime",
          status: "watching",
          poster: "/placeholder.jpg",
          progress: 12,
          totalEpisodes: 25,
        },
        {
          id: "2",
          title: "Demon Slayer",
          type: "anime",
          status: "completed",
          poster: "/placeholder.jpg",
          progress: 26,
          totalEpisodes: 26,
        },
        {
          id: "3",
          title: "My Hero Academia",
          type: "anime",
          status: "plan_to_watch",
          poster: "/placeholder.jpg",
        },
      ]);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const watching = library.filter((item) => item.status === "watching");
  const completed = library.filter((item) => item.status === "completed");
  const planToWatch = library.filter((item) => item.status === "plan_to_watch");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
            <p className="text-gray-400">
              Your personal collection of anime and content
            </p>
          </div>

          <Tabs defaultValue="watching" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/60">
              <TabsTrigger
                value="watching"
                className="data-[state=active]:bg-purple-600"
              >
                Watching ({watching.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-purple-600"
              >
                Completed ({completed.length})
              </TabsTrigger>
              <TabsTrigger
                value="plan_to_watch"
                className="data-[state=active]:bg-purple-600"
              >
                Plan to Watch ({planToWatch.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="watching" className="mt-8">
              <LibraryGrid items={watching} />
            </TabsContent>

            <TabsContent value="completed" className="mt-8">
              <LibraryGrid items={completed} />
            </TabsContent>

            <TabsContent value="plan_to_watch" className="mt-8">
              <LibraryGrid items={planToWatch} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function LibraryGrid({ items }: { items: LibraryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold text-lg mb-2">No items yet</h3>
        <p className="text-gray-400 mb-4">
          Start building your library by adding anime to your watchlist
        </p>
        <Link href="/anime">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Play className="w-4 h-4 mr-2" />
            Browse Anime
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group"
        >
          <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-xs ${
                  item.status === "watching"
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : item.status === "completed"
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                }`}
              >
                {item.status === "watching"
                  ? "Watching"
                  : item.status === "completed"
                  ? "Completed"
                  : "Plan to Watch"}
              </Badge>
            </div>

            {/* Progress Bar for Watching */}
            {item.status === "watching" &&
              item.progress &&
              item.totalEpisodes && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="w-full bg-black/60 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${(item.progress / item.totalEpisodes) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-white text-xs mt-1">
                    {item.progress}/{item.totalEpisodes} episodes
                  </p>
                </div>
              )}

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <Link href={`/anime/${item.id}`}>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="text-xs bg-purple-500/20 text-purple-300"
              >
                {item.type}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-red-400 p-0 h-auto"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
