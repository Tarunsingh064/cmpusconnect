'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostCard from './Postcard';
import { useAuth } from '@/Authcontext/Authcontext'; // Adjust the path based on your project

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const { user } = useAuth();

  const fetchPosts = async (pageNum) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/post/posts/?page=${pageNum}`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const lastPostRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="overflow-y-auto max-h-[600px] divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map((post, index) =>
        index === posts.length - 1 ? (
          <div key={post.id} ref={lastPostRef}>
            <PostCard post={post} />
          </div>
        ) : (
          <PostCard key={post.id} post={post} />
        )
      )}
      {!hasMore && (
        <p className="text-center text-sm text-gray-400 py-4">No more posts to load.</p>
      )}
    </div>
  );
};

export default PostsFeed;
