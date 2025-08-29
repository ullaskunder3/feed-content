import { create } from "zustand";

export interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePostLikes: (id: string, likes: number) => void;
}

export const useFeedStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePostLikes: (id, likes) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? { ...p, likes } : p)),
    })),
}));
