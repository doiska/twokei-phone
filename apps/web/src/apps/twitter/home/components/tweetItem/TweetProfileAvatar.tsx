import React from 'react';

export const TweetProfile: React.FC<{ sourceProfileAvatar: string }> = (
	props
) => {
	return (
		<div className="flex w-16 flex-col gap-2">
			<div
				className="h-16 w-16 rounded-full bg-cover bg-center"
				style={{ backgroundImage: `url(${sourceProfileAvatar})` }}
			/>
		</div>
	);
};