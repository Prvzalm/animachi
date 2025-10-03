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
  User,
  Shield,
  Ban,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "user" | "admin";
  status: "active" | "banned";
  created_at: string;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      setUsers([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          username: "johndoe",
          role: "user",
          status: "active",
          created_at: "2023-12-01",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          username: "janesmith",
          role: "admin",
          status: "active",
          created_at: "2023-11-15",
        },
        {
          id: "3",
          name: "Bob Johnson",
          email: "bob@example.com",
          username: "bobjohnson",
          role: "user",
          status: "banned",
          created_at: "2023-10-20",
        },
      ]);
    }
  }, [session]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                User Management
              </h1>
              <p className="text-gray-400">
                Manage users, roles, and permissions
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <User className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Users Table */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-gray-400 font-medium py-3">
                        User
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Role
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Status
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Joined
                      </th>
                      <th className="text-left text-gray-400 font-medium py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-700/50"
                      >
                        <td className="py-4">
                          <div>
                            <div className="text-white font-medium">
                              {user.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              @{user.username}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge
                            className={
                              user.role === "admin"
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            }
                          >
                            {user.role === "admin" ? (
                              <Shield className="w-3 h-3 mr-1" />
                            ) : (
                              <User className="w-3 h-3 mr-1" />
                            )}
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                            }
                          >
                            {user.status === "active" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Ban className="w-3 h-3 mr-1" />
                            )}
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-gray-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
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
