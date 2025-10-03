"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Image,
  MessageSquare,
  Eye,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";

interface Content {
  id: string;
  title: string;
  type: "MEME" | "EDIT" | "DISCUSSION";
  author: string;
  status: "published" | "pending" | "hidden";
  views: number;
  created_at: string;
}

export default function AdminContentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "MEME" | "EDIT" | "DISCUSSION">(
    "all"
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      session &&
      (session.user as { role?: string })?.role !== "admin"
    ) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session && (session.user as { role?: string })?.role === "admin") {
      // Mock data
      setContent([
        {
          id: "1",
          title: "Best Anime Openings of 2024",
          type: "DISCUSSION",
          author: "AnimeFan123",
          status: "published",
          views: 1250,
          created_at: "2024-01-15",
        },
        {
          id: "2",
          title: "My Latest AMV Edit",
          type: "EDIT",
          author: "EditorPro",
          status: "published",
          views: 890,
          created_at: "2024-01-14",
        },
        {
          id: "3",
          title: "Funny Anime Moments",
          type: "MEME",
          author: "MemeLord",
          status: "pending",
          views: 0,
          created_at: "2024-01-13",
        },
        {
          id: "4",
          title: "Character Discussion Thread",
          type: "DISCUSSION",
          author: "Debater99",
          status: "hidden",
          views: 567,
          created_at: "2024-01-12",
        },
      ]);
    }
  }, [session]);

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "MEME":
        return <Image className="w-4 h-4" />;
      case "EDIT":
        return <FileText className="w-4 h-4" />;
      case "DISCUSSION":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

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

  if (!session || (session.user as { role?: string })?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Content Management
              </h1>
              <p className="text-gray-400">
                Manage posts, edits, memes, and discussions
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as "all" | "MEME" | "EDIT" | "DISCUSSION"
                )
              }
              className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white min-w-32"
            >
              <option value="all" className="bg-slate-800">
                All Types
              </option>
              <option value="MEME" className="bg-slate-800">
                Memes
              </option>
              <option value="EDIT" className="bg-slate-800">
                Edits
              </option>
              <option value="DISCUSSION" className="bg-slate-800">
                Discussions
              </option>
            </select>
          </div>

          {/* Content Table */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">
                Content ({filteredContent.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-gray-400 font-medium py-3">
                        Content
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Type
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Author
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Status
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Views
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Created
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-700/50"
                      >
                        <td className="py-4">
                          <div className="text-white font-medium max-w-xs truncate">
                            {item.title}
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {getTypeIcon(item.type)}
                            <span className="ml-1">{item.type}</span>
                          </Badge>
                        </td>
                        <td className="py-4 text-gray-400">{item.author}</td>
                        <td className="py-4">
                          <Badge
                            className={
                              item.status === "published"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : item.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-gray-400">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {item.views.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 text-gray-400">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
