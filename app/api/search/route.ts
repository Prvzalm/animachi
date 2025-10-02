import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // MEME, EDIT, DISCUSSION
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ error: 'Search query must be at least 2 characters' }, { status: 400 });
    }

    let queryBuilder = supabase
      .from('posts')
      .select(`
        *,
        author:users!author_id(name, username, avatar)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by type if specified
    if (type && ['MEME', 'EDIT', 'DISCUSSION'].includes(type)) {
      queryBuilder = queryBuilder.eq('type', type);
    }

    const { data: postsData, error: postsError } = await queryBuilder;

    if (postsError) {
      console.error('Error searching posts:', postsError);
      return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
    }

    if (!postsData || postsData.length === 0) {
      return NextResponse.json([]);
    }

    // Get likes and comments count for search results
    const postIds = postsData.map((p: RawPost) => p.id);

    const [likesResult, commentsResult] = await Promise.all([
      supabase.from('likes').select('post_id').in('post_id', postIds),
      supabase.from('comments').select('post_id').in('post_id', postIds)
    ]);

    if (likesResult.error) {
      console.error('Error fetching likes:', likesResult.error);
    }

    if (commentsResult.error) {
      console.error('Error fetching comments:', commentsResult.error);
    }

    // Count likes and comments per post
    const likesCountMap = (likesResult.data as LikeData[] || []).reduce((acc, like) => {
      acc[like.post_id] = (acc[like.post_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const commentsCountMap = (commentsResult.data as CommentData[] || []).reduce((acc, comment) => {
      acc[comment.post_id] = (acc[comment.post_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const posts: Post[] = postsData.map((post: RawPost) => ({
      ...post,
      type: post.type as 'MEME' | 'EDIT' | 'DISCUSSION',
      likesCount: likesCountMap[post.id] || 0,
      commentsCount: commentsCountMap[post.id] || 0,
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Unexpected error in search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}