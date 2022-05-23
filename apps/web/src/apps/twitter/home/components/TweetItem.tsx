import React from 'react';
import {
	IoHeart,
	AiOutlineRetweet,
	IoChatbubble,
	FiShare,
} from 'react-icons/all';

import { FormattedTweet } from '@typings/twitter';

const TweetItem = ({
	message,
	sourceProfileUsername,
	sourceProfileName,
	sourceProfileAvatar,
	secondsAgo,
	...rest
}: FormattedTweet) => {
	return (
		<div className="flex w-full gap-4 p-4">
			<div className="flex w-16 flex-col gap-2">
				<div
					className="h-16 w-16 rounded-full bg-cover bg-center"
					style={{ backgroundImage: `url(${sourceProfileAvatar})` }}
				></div>
				<div className="flex flex-grow flex-col items-center">
					<div className="h-full border-l-2 border-gray-500"></div>
				</div>
			</div>
			<div className="flex-grow">
				<h2 className="text-twitter-dark-gray flex flex-row gap-2">
					<strong className={'text-black dark:text-white'}>
						{sourceProfileName}
					</strong>
					<span>@{sourceProfileUsername}</span>
					<span>•</span>
					<span>{secondsAgo}s</span>
				</h2>
				<p className={'break-all pb-2'}>{message}</p>
				<div className="h-32 rounded-lg bg-gray-400"></div>
				<div className="mt-4 flex items-center justify-around">
					<div>
						<span className="inline-block h-5 w-5 text-blue-500">
							<IoChatbubble />
						</span>
					</div>
					<div>
						<span className="inline-block h-5 w-5 text-green-600">
							<AiOutlineRetweet />
						</span>
					</div>
					<div>
						<span className="inline-block h-5 w-5 text-rose-500">
							<IoHeart />
						</span>
					</div>
					<div>
						<span className="inline-block h-5 w-5 text-gray-500 hover:text-blue-500">
							<FiShare />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TweetItem;
