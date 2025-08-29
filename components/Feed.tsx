"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import {
  GET_POSTS,
  LIKE_POST,
  POST_ADDED,
  POST_LIKED,
} from "@/graphql/queries";
import { getRandomUser } from "@/lib/getRandomUser";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  likedBy?: string[];
  createdAt: string;
  imageUrl?: string | null;
};

const PAGE_LIMIT = 5;

export default function Feed() {
  const [user] = useState(() => getRandomUser());
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // newPostsBufferRef for new posts arriving via subscription when user is not at top
  const newPostsBufferRef = useRef<Post[]>([]);
  const [bufferCount, setBufferCount] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    loading: initialLoading,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: { after: null, limit: PAGE_LIMIT },
    fetchPolicy: "cache-and-network",
  });

  const [likePost] = useMutation(LIKE_POST);

  // Merge initial query results (first page)
  useEffect(() => {
    if (data?.posts) {
      setPosts((prev) => [
        ...prev,
        ...data.posts.filter((p: Post) => !prev.some((x) => x.id === p.id)),
      ]);
      // if initial result size < page limit, there's no more
      if (data.posts.length < PAGE_LIMIT) setHasMore(false);
    }
  }, [data?.posts]);

  // load more posts (cursor = last post's id)
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const lastId = posts[posts.length - 1]?.id ?? null;
      const res = await fetchMore({
        variables: { after: lastId, limit: PAGE_LIMIT },
      });

      const newPosts: Post[] = res.data?.posts ?? [];
      if (!newPosts.length) {
        setHasMore(false);
      } else {
        setPosts((prev) => [
          ...prev,
          ...newPosts.filter((p) => !prev.some((x) => x.id === p.id)),
        ]);
        if (newPosts.length < PAGE_LIMIT) setHasMore(false);
      }
    } catch (err) {
      console.error("fetchMore error", err);
    } finally {
      setLoadingMore(false);
    }
  }, [fetchMore, hasMore, loadingMore, posts]);

  // IntersectionObserver to load more when sentinel visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMorePosts();
        }
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [loadMorePosts, hasMore, loadingMore]);

  // handle optimistic like
  const handleLike = (id: string) => {
    const currentLikes = posts.find((p) => p.id === id)?.likes ?? 0;
    likePost({
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

  // subscription: postLiked -> update existing post
  useSubscription(POST_LIKED, {
    onData: ({ data }) => {
      const updated = data.data?.postLiked as Post | undefined;
      if (!updated) return;
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    },
  });

  // subscription: postAdded -> if user near top prepend; otherwise buffer & show banner
  useSubscription(POST_ADDED, {
    onData: ({ data }) => {
      const newPost = data.data?.postAdded as Post | undefined;
      if (!newPost) return;

      const container = containerRef.current;
      const nearTop = container ? container.scrollTop < 120 : true;

      if (nearTop) {
        setPosts((prev) => [
          newPost,
          ...prev.filter((p) => p.id !== newPost.id),
        ]);
      } else {
        // keep newest first
        newPostsBufferRef.current.unshift(newPost);
        setBufferCount(newPostsBufferRef.current.length);
      }
    },
  });

  // showBufferedPosts clicks banner, reveal buffered posts (and scroll to top)
  const showBufferedPosts = () => {
    const buffered = newPostsBufferRef.current;
    if (buffered.length === 0) return;
    setPosts((prev) => [
      ...buffered,
      ...prev.filter((p) => !buffered.some((b) => b.id === p.id)),
    ]);
    newPostsBufferRef.current = [];
    setBufferCount(0);
    if (containerRef.current)
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderAvatar = (author: string, imageUrl?: string | null) => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={author}
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }
    const initials = author
      .split(" ")
      .map((n) => n[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
        {initials}
      </div>
    );
  };

  return (
    <div
      className="p-4 h-[80vh] border rounded"
      ref={containerRef}
      style={{ overflow: "auto" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Live Feed</h2>
      </div>

      {/* New-post banner (Twitter-like) */}
      {bufferCount > 0 && (
        <div className="sticky top-0 z-10 my-2">
          <button
            onClick={showBufferedPosts}
            className="mx-auto block bg-blue-600 text-white px-3 py-1 rounded-full shadow"
            aria-live="polite"
          >
            Show {bufferCount} new post{bufferCount > 1 ? "s" : ""}
          </button>
        </div>
      )}

      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="border p-3 rounded flex gap-3">
            {renderAvatar(p.author, p.imageUrl ?? null)}
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-1">by {p.author}</div>
              <p className="mb-2">{p.content}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(p.id)}
                  className="text-blue-500 underline"
                >
                  ❤️ {p.likes}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* sentinel for intersection observer */}
      <div ref={sentinelRef} className="h-6" />

      {/* Loader / end indicator */}
      <div className="mt-3 text-center">
        {loadingMore && <p className="text-gray-500">Loading more posts…</p>}
        {!hasMore && <p className="text-gray-400">No more posts</p>}
        {initialLoading && posts.length === 0 && (
          <p className="text-gray-500">Loading posts…</p>
        )}
      </div>
    </div>
  );
}
