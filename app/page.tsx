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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(120,219,226,0.1),transparent_50%)]"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome to the Ultimate Anime Community
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                AniMachi
              </span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl text-gray-300">
                Anime Community Hub
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Share memes, edits, and discussions. Connect with fellow otakus,
              track your anime journey, and discover your next favorite series.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/community">
                <Button
                  size="lg"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Explore Community
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white rounded-full font-semibold transition-all duration-300"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose AniMachi?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need for your anime journey in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/80 border-slate-700 hover:bg-slate-800/90 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Share & Discover
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Upload memes, edits, and fan art. Discover amazing content
                  from creators worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700 hover:bg-slate-800/90 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Community Discussions
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Join discussions, create polls, and engage with fellow anime
                  enthusiasts from around the globe.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700 hover:bg-slate-800/90 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Track Your Journey
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Keep track of anime you&apos;re watching, planning to watch,
                  or have completed with detailed statistics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                10K+
              </div>
              <div className="text-purple-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-purple-300">Posts Shared</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                100K+
              </div>
              <div className="text-purple-300">Discussions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-purple-300">Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Anime Journey?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of anime fans sharing their passion and discovering
              new favorites.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
