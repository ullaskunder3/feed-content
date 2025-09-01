"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { ADD_POST } from "@/graphql/queries";
import { useMutation } from "@apollo/client/react";
import { getRandomUser } from "@/lib/getRandomUser";

type AddPostFormProps = {
  onCancel?: () => void;
  onSubmitted?: () => void;
};

export const AddPostForm: React.FC<AddPostFormProps> = ({
  onCancel,
  onSubmitted,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

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

    if (onSubmitted) onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-2 p-4">
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
        className="border p-2 w-full min-h-20 max-h-80"
        required
        maxLength={200}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
