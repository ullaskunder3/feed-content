"use client";
import { usePosts } from "@/store/useFeedStore";
import { useState } from "react";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const addPostLocal = usePosts((s) => s.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation($title: String!, $content: String!, $author: String!) {
            addPost(title: $title, content: $content, author: $author) {
              id title content author likes createdAt
            }
          }
        `,
        variables: { title, content, author },
      }),
    });
    const data = await res.json();
    if (data.data?.addPost) {
      addPostLocal(data.data.addPost);
    }
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        className="border p-2 w-full"
        required
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Post
      </button>
    </form>
  );
}
