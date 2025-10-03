import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  Zap,
  Star,
  Shield,
  Globe,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              AniMachi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Building the ultimate anime community where fans connect, share, and
            discover their next favorite series.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-12">
              AniMachi was born from a simple idea: anime fans deserve a space
              where they can truly connect. We&apos;re not just another social
              platform – we&apos;re a community built by otakus, for otakus. Our goal
              is to create the most engaging and inclusive anime community on
              the internet.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Passionate Community
                  </h3>
                  <p className="text-gray-400">
                    Connect with fellow anime enthusiasts who share your love
                    for the medium.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Quality Content
                  </h3>
                  <p className="text-gray-400">
                    Share memes, edits, reviews, and discussions that enrich the
                    anime experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Global Reach
                  </h3>
                  <p className="text-gray-400">
                    Bridge cultural gaps and bring anime fans from around the
                    world together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Makes Us Different
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We&apos;re more than just a platform – we&apos;re your anime home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Community First",
                description:
                  "Every feature is designed with our community in mind, ensuring authentic connections.",
              },
              {
                icon: Shield,
                title: "Safe & Inclusive",
                description:
                  "A welcoming environment for all anime fans, regardless of background or preferences.",
              },
              {
                icon: Star,
                title: "Quality Focus",
                description:
                  "We prioritize meaningful content over quantity, fostering genuine discussions.",
              },
              {
                icon: TrendingUp,
                title: "Growing Together",
                description:
                  "As anime evolves, so do we – always adapting to serve our community better.",
              },
              {
                icon: MessageCircle,
                title: "Open Dialogue",
                description:
                  "Encourage respectful discussions about all aspects of anime culture.",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description:
                  "Continuously improving with new features that enhance your anime experience.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-300 text-lg">
              Passionate anime fans building something special.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                bio: "Anime enthusiast since childhood, passionate about building communities.",
                avatar: "A",
              },
              {
                name: "Sarah Kim",
                role: "Head of Community",
                bio: "Ensures our platform remains welcoming and engaging for all members.",
                avatar: "S",
              },
              {
                name: "Mike Rodriguez",
                role: "Tech Lead",
                bio: "Brings the vision to life with cutting-edge technology and user experience.",
                avatar: "M",
              },
            ].map((member) => (
              <Card
                key={member.name}
                className="bg-slate-800/60 border-slate-700/50 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">
                      {member.avatar}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-300 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              Ready to be part of something amazing? Join thousands of anime
              fans who have already made AniMachi their home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join AniMachi
                </Button>
              </Link>
              <Link href="/community">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-white/30 text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
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
