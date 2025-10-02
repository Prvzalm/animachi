import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">AniMachi</h1>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-purple-600">AniMachi</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The ultimate anime community hub where fans share memes, edits,
            discussions, and connect with fellow otakus from around the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8">
                Join Community
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="px-8">
                Explore Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Share Memes & Edits
              </h3>
              <p className="text-gray-600">
                Upload and share your favorite anime memes and edits with the
                community.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Community Discussions
              </h3>
              <p className="text-gray-600">
                Join discussions, create polls, and engage with fellow anime
                enthusiasts.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📺</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Track Your Watchlist
              </h3>
              <p className="text-gray-600">
                Keep track of anime you&apos;re watching, planning to watch, or
                have completed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">
            Ready to join the community?
          </h3>
          <p className="text-gray-600 mb-6">
            Create your account today and start sharing your anime passion!
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 AniMachi. Built with ❤️ for anime fans.</p>
        </div>
      </footer>
    </div>
  );
}
