"use client";
import { useEffect } from "react";
import { createClient } from "graphql-ws";
import { usePosts } from "@/store/useFeedStore";

const wsClient = createClient({
  url: "ws://localhost:4000/api/graphql",
});

export default function Feed() {
  const { posts, setPosts, addPost, likePost } = usePosts();

  // Load initial posts
  useEffect(() => {
    fetch("http://localhost:4000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ posts { id title content author likes createdAt } }",
      }),
    })
      .then((res) => res.json())
      .then((res) => setPosts(res.data.posts));
  }, [setPosts]);

  // Subscribe for new posts
  useEffect(() => {
    const dispose = wsClient.subscribe(
      {
        query:
          "subscription { postAdded { id title content author likes createdAt } }",
      },
      {
        next: (data) => {
          if (data.data?.postAdded) {
            addPost(data.data.postAdded);
          }
        },
        error: console.error,
        complete: () => console.log("done"),
      }
    );
    return () => dispose();
  }, [addPost]);

  // Like mutation
  const handleLike = async (id: string) => {
    await fetch("http://localhost:4000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation($id: ID!) { likePost(id: $id) { id likes } }`,
        variables: { id },
      }),
    });
    likePost(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Live Feed</h2>
      <ul className="space-y-3 mt-3">
        {posts.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">by {p.author}</div>
            <p>{p.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleLike(p.id)}
                className="text-blue-500 underline"
              >
                ❤️ {p.likes}
              </button>
              <span className="text-xs text-gray-500">
                {new Date(p.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
