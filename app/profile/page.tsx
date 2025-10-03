"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Calendar, Save } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  created_at: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      // Fetch user profile data
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.user.name || "",
          username: data.user.username || "",
          email: data.user.email || "",
          bio: data.user.bio || "",
          avatar: data.user.avatar || "",
        });
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        // Refresh profile data
        fetchProfile();
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
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

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {userData?.avatar ? (
                      <Image
                        src={userData.avatar}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {session.user?.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    @{formData.username}
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {session.user?.email}
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined{" "}
                      {userData?.created_at
                        ? new Date(userData.created_at).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long" }
                          )
                        : "Unknown"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      Profile Information
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Username
                      </label>
                      <Input
                        value={formData.username}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Bio
                    </label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Profile Picture URL
                    </label>
                    <Input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          avatar: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="https://example.com/avatar.jpg"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
