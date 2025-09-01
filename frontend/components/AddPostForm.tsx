"use client";
import { useState, useEffect } from "react";
import { ADD_POST } from "@/graphql/queries";
import { useMutation } from "@apollo/client/react";
import { getRandomUser } from "@/lib/getRandomUser";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  //   assignning random username to user
  useEffect(() => {
    setAuthor(getRandomUser());
  }, []);

  const [addPost] = useMutation(ADD_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) setAuthor(getRandomUser());
    await addPost({
      variables: { title, content, author },
    });
    setTitle("");
    setContent("");
    setAuthor(getRandomUser());
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
