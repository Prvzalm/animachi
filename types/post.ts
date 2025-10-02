export interface Post {
  id: string;
  title?: string;
  content: string;
  image_url?: string;
  type: 'MEME' | 'EDIT' | 'DISCUSSION';
  author_id: string;
  created_at: string;
  updated_at: string;
  author: {
    name?: string;
    username?: string;
    avatar?: string;
  };
  likesCount: number;
  commentsCount: number;
}