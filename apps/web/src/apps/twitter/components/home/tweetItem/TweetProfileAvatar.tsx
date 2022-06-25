import React from 'react';

export const TweetProfileAvatar: React.FC<{ sourceProfileAvatar: string }> = ({
	sourceProfileAvatar,
}) => {
	return (
		<div className="flex w-16 flex-col gap-2">
			<div
				className="h-16 w-16 rounded-full bg-cover bg-center"
				style={{ backgroundImage: `url(${sourceProfileAvatar})` }}
			/>
		</div>
	);
};

export const TweetProfileName: React.FC<{
	sourceProfileName: string;
	sourceProfileUsername: string;
	secondsAgo: string | number;
}> = ({ sourceProfileName, sourceProfileUsername, secondsAgo }) => {
	return (
		<h2 className="text-twitter-dark-gray flex flex-row gap-2">
			<strong className={'text-black dark:text-white'}>
				{sourceProfileName}
			</strong>
			<span>@{sourceProfileUsername}</span>
			<span>•</span>
			<span>{secondsAgo}s</span>
		</h2>
	);
};
