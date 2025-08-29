"use client";
import { create } from "zustand";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: string;
};

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  likePost: (id: string) => void;
};

export const usePosts = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => {
      const exists = state.posts.some((p) => p.id === post.id);
      if (exists) return state;
      return { posts: [...state.posts, post] };
    }),
  likePost: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      ),
    })),
}));
