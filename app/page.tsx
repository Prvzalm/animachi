import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Users,
  TrendingUp,
  Star,
  Zap,
  Sparkles,
  Play,
  Heart,
  Eye,
  Calendar,
  Search,
  ChevronRight,
  Flame,
  Image,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(120,219,226,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-transparent to-pink-900/40"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge
                variant="secondary"
                className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the Ultimate Anime Community
              </Badge>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  AniMachi
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl text-gray-300">
                  Anime Community Hub
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Share memes, edits, and discussions. Connect with fellow otakus,
                track your anime journey, and discover your next favorite
                series.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/community">
                  <Button
                    size="lg"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </Link>
                <Link href="/search">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 rounded-full transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Explore Content
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Anime Card */}
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30"></div>
                <Card className="relative bg-slate-800/90 backdrop-blur-sm border-slate-700/50 overflow-hidden">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          <Star className="w-3 h-3 mr-1" />
                          9.2
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <Play className="w-3 h-3 mr-1" />
                          Ongoing
                        </Badge>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Featured Anime
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Join the discussion about the latest episodes
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="py-20 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
                <Flame className="w-8 h-8 text-orange-500 mr-3" />
                Trending Now
              </h2>
              <p className="text-gray-400 text-lg">
                Hot discussions and viral content
              </p>
            </div>
            <Link href="/community">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {i === 1 ? "MEME" : i === 2 ? "EDIT" : "DISCUSSION"}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {Math.floor(Math.random() * 1000) + 100}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-300 transition-colors">
                    {i === 1
                      ? "Best Anime Openings of 2024"
                      : i === 2
                      ? "My Latest AMV Edit"
                      : "Character Discussion Thread"}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {i === 1
                      ? "Sharing my favorite anime openings that gave me chills..."
                      : i === 2
                      ? "Spent weeks on this AMV, hope you like it!"
                      : "Let's discuss the character development in this series..."}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {Math.floor(Math.random() * 50) + 10} replies
                    </div>
                    <div className="flex items-center text-red-400 text-sm">
                      <Heart className="w-4 h-4 mr-1" />
                      {Math.floor(Math.random() * 200) + 50}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find content that matches your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Image,
                label: "Memes",
                color: "from-purple-500 to-pink-500",
                count: "2.1K",
              },
              {
                icon: Play,
                label: "Edits",
                color: "from-blue-500 to-cyan-500",
                count: "856",
              },
              {
                icon: MessageSquare,
                label: "Discussions",
                color: "from-green-500 to-emerald-500",
                count: "3.4K",
              },
              {
                icon: Star,
                label: "Reviews",
                color: "from-yellow-500 to-orange-500",
                count: "1.2K",
              },
            ].map((category) => (
              <Card
                key={category.label}
                className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {category.label}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {category.count} posts
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-purple-300 font-medium">Active Users</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-blue-300 font-medium">Posts Shared</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100K+
              </div>
              <div className="text-green-300 font-medium">Discussions</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-yellow-300 font-medium">Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Anime Journey?
            </h2>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              Join thousands of anime fans sharing their passion and discovering
              new favorites every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/community">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-white/30 text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Explore Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
