'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostCard from './PostCard';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchPosts = async (pageNum) => {
    try {
      const res = await fetch(`https://campusconnect-ki0p.onrender.com/api/post/posts/`);
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
    <div className="h-[500px] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post, index) =>
          index === posts.length - 1 ? (
            <div key={post.id} ref={lastPostRef}>
              <PostCard post={post} />
            </div>
          ) : (
            <PostCard key={post.id} post={post} />
          )
        )}
      </div>
      {!hasMore && (
        <p className="text-center text-sm text-gray-400 mt-4">No more posts to load.</p>
      )}
    </div>
  );
};

export default PostsFeed;
