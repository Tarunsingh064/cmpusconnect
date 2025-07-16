'use client';

import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
      {/* Simulated user header (like Twitter) */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Username</h2>
          <p className="text-sm text-gray-500">@userhandle</p>
        </div>
      </div>

      {/* Post content */}
      <div className="mt-2 text-gray-800 dark:text-gray-100 text-sm">
        {post.content}
      </div>
    </div>
  );
};

export default PostCard;
