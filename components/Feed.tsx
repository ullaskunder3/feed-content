"use client";
import {
  GET_POSTS,
  LIKE_POST,
  POST_ADDED,
  POST_LIKED,
} from "@/graphql/queries";
import { getRandomUser } from "@/lib/getRandomUser";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { useState } from "react";

export default function Feed() {
  const { data, loading, error } = useQuery(GET_POSTS);
  const [user] = useState(getRandomUser());
  const [likePost] = useMutation(LIKE_POST, {
    update(cache, { data }) {
      if (!data?.likePost) return;

      cache.modify({
        id: cache.identify({ __typename: "Post", id: data.likePost.id }),
        fields: {
          likes() {
            return data.likePost.likes;
          },
        },
      });
    },
  });

  useSubscription(POST_ADDED, {
    onData: ({ client, data }) => {
      if (!data.data?.postAdded) return;
      const newPost = data.data.postAdded;

      client.cache.modify({
        fields: {
          posts(existingPosts = []) {
            // prevent duplicate if already added
            if (
              existingPosts.some(
                (p: any) => p.__ref === client.cache.identify(newPost)
              )
            ) {
              return existingPosts;
            }
            return [...existingPosts, newPost];
          },
        },
      });
    },
  });

  useSubscription(POST_LIKED, {
    onData: ({ client, data }) => {
      const updatedPost = data.data?.postLiked;
      if (!updatedPost) return;

      client.cache.modify({
        fields: {
          posts(existingPosts: any[] = []) {
            return existingPosts.map((p: any) =>
              client.cache.identify(p) === client.cache.identify(updatedPost)
                ? {
                    ...p,
                    likes: updatedPost.likes,
                    likedBy: updatedPost.likedBy,
                  }
                : p
            );
          },
        },
      });
    },
  });

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading feed 😢</p>;

  const handleLike = async (id: string) => {
    const currentLikes = data?.posts.find((p: any) => p.id === id)?.likes || 0;
    await likePost({
      variables: { id, user },
      optimisticResponse: {
        likePost: {
          id,
          __typename: "Post",
          likes: currentLikes + 1,
          likedBy: [user],
        },
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Live Feed</h2>
      <ul className="space-y-3 mt-3">
        {data?.posts.map((p: any) => (
          <li key={p.id} className="border p-3 rounded">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">by {p.author}</div>
            <p>{p.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleLike(p.id, p.likes)}
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
