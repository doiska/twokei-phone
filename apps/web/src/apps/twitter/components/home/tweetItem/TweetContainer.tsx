import React from 'react';

export const TweetContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="flex w-full gap-4 border-t-2 border-gray-500 border-opacity-20 p-4">{children}</div>
);
