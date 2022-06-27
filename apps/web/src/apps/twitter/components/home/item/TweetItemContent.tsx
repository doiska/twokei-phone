import React from 'react';

export const TweetItemContent: React.FC<{
	message: string;
	embed?: string;
}> = ({ message, embed }) => (
	<>
		<p className={'break-all'}>{message}</p>
		{embed && (
			<div
				className="h-32 rounded-lg"
				style={{ backgroundImage: `url(${embed})` }}
			/>
		)}
	</>
);
