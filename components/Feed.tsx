"use client";
import { useEffect, useState } from "react";
import { createClient } from "graphql-ws";

const wsClient = createClient({
  url: "ws://localhost:4000/api/graphql",
});

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);

  // 1. Load existing posts
  useEffect(() => {
    fetch("http://localhost:4000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ posts { id title content author createdAt } }",
      }),
    })
      .then((res) => res.json())
      .then((res) => setPosts(res.data.posts));
  }, []);

  // 2. Listen for new posts
  useEffect(() => {
    const dispose = wsClient.subscribe(
      {
        query:
          "subscription { postAdded { id title content author createdAt } }",
      },
      {
        next: (data) => {
          if (data.data?.postAdded) {
            setPosts((prev) => [...prev, data.data.postAdded]);
          }
        },
        error: console.error,
        complete: () => console.log("done"),
      }
    );

    return () => {
      dispose(); // cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Live Feed</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> by {p.author} (
            {new Date(p.createdAt).toLocaleTimeString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
