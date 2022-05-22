import React from 'react';
import { AiOutlineRetweet, AiOutlineUpload, AiFillHeart } from 'react-icons/ai';
import { IoMdMore } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';

import { FormattedTweet } from '@typings/twitter';

type Props = {
	name: string;
	username: string;
	avatar: string;
	date: string;
	content: string;
	children?: React.ReactNode;
};

type TweetButtonProps = {
	isMine: boolean;
	isLiked: boolean;
	isRetweeted: boolean;

	onLike?: () => void;
	onRetweet?: () => void;
	onComment?: () => void;
	onMore?: () => void;
};

export const TweetButtons = ({
	isLiked,
	isRetweeted,
	onLike,
	onMore,
}: TweetButtonProps) => {
	return (
		<>
			<div className="text-md mt-3 flex flex-row items-center justify-between text-sm">
				<div className="flex flex-row items-center gap-1">
					<IoChatbubbleOutline /> <span>100</span>
				</div>
				<div className="flex flex-row items-center gap-1">
					<AiOutlineRetweet /> <span>30</span>
				</div>
				<div className="flex flex-row items-center gap-1">
					<AiFillHeart
						className={isLiked ? 'fill-rose-600 text-rose-600' : ''}
					/>
					<span>500</span>
				</div>
				<div className="flex flex-row items-center gap-1">
					<AiOutlineUpload />
				</div>
			</div>
		</>
	);
};

const TweetItem = ({
	message,
	sourceProfileUsername,
	sourceProfileName,
	sourceProfileAvatar,
	secondsAgo,
	...rest
}: FormattedTweet) => {
	const calcTime = (secondsAgo: number) => {
		//convert seconds to minutes or hours or days
		const minutes = Math.floor(secondsAgo / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) return `${days}d`;
		if (hours > 0) return `${hours}h`;
		if (minutes > 0) return `${minutes}m`;

		return `${secondsAgo}s`;
	};

	return (
		<div className="border-twitter-dark-gray relative flex w-full flex-col gap-2 border-t-[0.5px] border-opacity-50 p-4 pb-2">
			<div className="flex h-auto w-full flex-row gap-2">
				<div className="h-auto w-full basis-[18%]">
					<img
						src={sourceProfileAvatar}
						className="rounded-full object-cover"
						alt={'User avatar'}
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<div className="flex max-w-full flex-row items-center gap-1.5 ">
						<span className="dark:text-twitter-white text-md font-medium">
							{sourceProfileName}
						</span>
						<span className="dark:text-twitter-light-gray text-sm">
							@{sourceProfileUsername}
						</span>
						<span>•</span>
						<span className="dark:text-twitter-light-gray text-sm">
							{calcTime(secondsAgo)}
						</span>
					</div>
					<div className="dark:text-twitter-white relative max-w-full flex-1 overflow-hidden break-words">
						<span>{message}</span>
					</div>
					<TweetButtons {...rest} />
				</div>
				<span className="absolute right-2 top-2">
					<IoMdMore size={20} />
				</span>
			</div>
		</div>
	);
};

export default TweetItem;
