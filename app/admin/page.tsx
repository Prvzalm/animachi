"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostCard } from "@/components/post-card";
import { Post } from "@/types/post";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminCreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "DISCUSSION" as "MEME" | "EDIT" | "DISCUSSION",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Check if admin is logged in (simple client-side check)
    const adminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    setIsAuthenticated(adminLoggedIn);
    if (adminLoggedIn) {
      fetchPosts();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    // Simple admin check
    if (
      loginData.email === "admin@gmail.com" &&
      loginData.password === "admin@gmail.com"
    ) {
      localStorage.setItem("admin_logged_in", "true");
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      alert("Invalid admin credentials");
    }

    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsAuthenticated(false);
    setPosts([]);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeChange = (value: "MEME" | "EDIT" | "DISCUSSION") => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          content: "",
          type: "DISCUSSION",
          imageUrl: "",
        });
        fetchPosts(); // Refresh posts list
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("An error occurred while creating the post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          // Login Form
          <div className="max-w-md mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Admin Login</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter admin credentials to access the admin panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Admin Email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Admin Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Admin Panel
          <>
            <div className="flex justify-between items-center mb-6">
              <Link href="/community">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Community
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Logout
              </Button>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Create New Post</CardTitle>
                  <CardDescription className="text-gray-400">
                    Share your thoughts, memes, or edits with the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Post Type
                      </label>
                      <Select
                        value={formData.type}
                        onValueChange={handleTypeChange}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="DISCUSSION">Discussion</SelectItem>
                          <SelectItem value="MEME">Meme</SelectItem>
                          <SelectItem value="EDIT">Edit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Title
                      </label>
                      <Input
                        type="text"
                        name="title"
                        placeholder="Enter post title..."
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Content
                      </label>
                      <Textarea
                        name="content"
                        placeholder="Write your post content..."
                        value={formData.content}
                        onChange={handleChange}
                        rows={6}
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Image Upload (optional)
                      </label>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="bg-slate-700 border-slate-600 text-white file:bg-slate-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                          disabled={uploadingImage}
                        />
                        {uploadingImage && (
                          <p className="text-sm text-gray-400">
                            Uploading image...
                          </p>
                        )}
                        {formData.imageUrl && (
                          <div className="flex items-center space-x-2">
                            <ImageIcon className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">
                              Image uploaded successfully
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Or Image URL (optional)
                      </label>
                      <Input
                        type="url"
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Post..." : "Create Post"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Posts List */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Created Posts
              </h2>
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No posts created yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
