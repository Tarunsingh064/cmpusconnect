'use client';

import React, { useEffect, useState } from 'react';
import PostCard from './Postcard';
import Cookies from 'js-cookie';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://campusconnect-ki0p.onrender.com/api/post/posts/');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('text', text);
    if (media) formData.append('media', media);

    try {
      const res = await fetch('https://campusconnect-ki0p.onrender.com/api/post/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        body: formData,
      });
      if (res.ok) {
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
        setText('');
        setMedia(null);
      } else {
        console.error('Create post failed');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleEdit = async (id, newText) => {
    try {
      const res = await fetch(`https://campusconnect-ki0p.onrender.com/api/post/posts/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        body: JSON.stringify({ text: newText }),
      });
      if (res.ok) {
        const updatedPost = await res.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === id ? updatedPost : post))
        );
      } else {
        console.error('Edit failed');
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-2"
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(e.target.files[0])}
          className="mb-2"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>

      <div className="overflow-y-auto max-h-[600px] divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
