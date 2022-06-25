import React from 'react';

export const TweetMessage: React.FC<{ message: string; embed?: string }> = ({
	message,
	embed,
}) => {
	return (
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
};
