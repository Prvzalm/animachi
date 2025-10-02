import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/post';

interface RawPost {
  id: string;
  title?: string;
  content: string;
  image_url?: string;
  type: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  author: {
    name?: string;
    username?: string;
    avatar?: string;
  };
}

interface LikeData {
  post_id: string;
}

interface CommentData {
  post_id: string;
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    // Fetch posts with author info
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select(`
        *,
        author:users!author_id(name, username, avatar)
      `)
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    // Get likes count for all posts
    const postIds = postsData!.map((p: RawPost) => p.id);
    const { data: likesData, error: likesError } = await supabase
      .from('likes')
      .select('post_id')
      .in('post_id', postIds);

    if (likesError) {
      console.error('Error fetching likes:', likesError);
      return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
    }

    // Get comments count for all posts
    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('post_id')
      .in('post_id', postIds);

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    // Count likes and comments per post
    const likesCountMap = (likesData as LikeData[] || []).reduce((acc, like) => {
      acc[like.post_id] = (acc[like.post_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const commentsCountMap = (commentsData as CommentData[] || []).reduce((acc, comment) => {
      acc[comment.post_id] = (acc[comment.post_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const posts: Post[] = postsData!.map((post: RawPost) => ({
      ...post,
      type: post.type as 'MEME' | 'EDIT' | 'DISCUSSION',
      likesCount: likesCountMap[post.id] || 0,
      commentsCount: commentsCountMap[post.id] || 0,
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
