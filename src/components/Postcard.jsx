'use client';

import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white text-black rounded-xl shadow-md p-5 h-full">
      <h2 className="text-lg font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostCard;
