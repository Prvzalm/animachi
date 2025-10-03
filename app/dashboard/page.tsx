"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Heart,
  Play,
  TrendingUp,
  Calendar,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="py-8 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {session.user?.name || "User"}!
              </h1>
              <p className="text-gray-400">
                Here&apos;s what&apos;s happening with your anime journey
              </p>
            </div>
            <Link href="/profile">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Play className="w-8 h-8 text-purple-400 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-gray-400 text-sm">Episodes Watched</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-400 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-gray-400 text-sm">Favorite Anime</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-white">8</p>
                    <p className="text-gray-400 text-sm">Series Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-400 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-white">156</p>
                    <p className="text-gray-400 text-sm">Days Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Continue Watching */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Continue Watching
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Attack on Titan",
                      episode: "Episode 12",
                      progress: 75,
                    },
                    {
                      title: "Demon Slayer",
                      episode: "Episode 8",
                      progress: 60,
                    },
                    {
                      title: "My Hero Academia",
                      episode: "Episode 15",
                      progress: 90,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.episode}</p>
                        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Resume
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/anime">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Play className="w-4 h-4 mr-2" />
                      Browse Anime
                    </Button>
                  </Link>
                  <Link href="/library">
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      My Library
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Community
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="w-full border-green-500/50 text-green-300 hover:bg-green-500/10"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
