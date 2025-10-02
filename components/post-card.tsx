import { Post } from "@/types/post";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "MEME":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "EDIT":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "DISCUSSION":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <Card className="bg-slate-800/80 border-slate-700 hover:bg-slate-800/90 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
              <AvatarImage
                src={post.author.avatar}
                alt={post.author.name || "User"}
              />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {post.author.name?.[0] || post.author.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-white">
                {post.author.name || post.author.username}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getTypeColor(post.type)}>
              {post.type}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {post.title && (
          <h3 className="font-semibold text-white mb-3 text-lg leading-tight">
            {post.title}
          </h3>
        )}

        <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {post.image_url && (
          <div className="relative mb-4 rounded-lg overflow-hidden bg-slate-700">
            <Image
              src={post.image_url}
              alt="Post image"
              width={600}
              height={400}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Heart className="h-4 w-4 mr-2" />
              {post.likesCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.commentsCount}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
