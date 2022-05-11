import React from 'react';
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineUpload } from 'react-icons/ai';
import { IoMdMore } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';

type Props = {
	name: string;
	username: string;
	avatar: string;
	date: string;
	content: string;
	children?: React.ReactNode;
};

type TweetButtonProps = {
	likes?: number;
	retweets?: number;
	comments?: number;
	isLiked?: boolean;
	isRetweeted?: boolean;
	isCommented?: boolean;
	onLike?: () => void;
	onRetweet?: () => void;
	onComment?: () => void;
	onMore?: () => void;
};

export const TweetButtons = ({
	likes,
	retweets,
	comments,
	isLiked,
	isRetweeted,
	isCommented,
	onComment,
	onRetweet,
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
					<AiOutlineHeart /> <span>500</span>
				</div>
				<div className="flex flex-row items-center gap-1">
					<AiOutlineUpload />
				</div>
			</div>
		</>
	);
};

const TweetItem: React.FC<Props> = ({ name, username, avatar, date, content, children }) => {
	return (
		<div className="border-twitter-dark-gray relative flex w-full flex-col gap-2 border-t-[0.5px] border-opacity-50 p-4 pb-2">
			<div className="flex h-auto w-full flex-row gap-2">
				<div className="h-auto w-full basis-[17%]">
					<img src={avatar} className="rounded-full object-cover" alt={'User avatar'} />
				</div>
				<div className="flex flex-1 flex-col">
					<div className="flex flex-row items-center gap-1">
						<p className="dark:text-twitter-white font-medium">{name}</p>
						<p className="dark:text-twitter-light-gray text-sm">{username}</p>
						<p className="dark:text-twitter-light-gray">•</p>
						<p className="dark:text-twitter-light-gray">{date}</p>
					</div>
					<div className="dark:text-twitter-white flex-1">
						{content} {children}
					</div>
					<TweetButtons />
				</div>
				<span className="absolute right-2 top-2">
					<IoMdMore size={20} />
				</span>{' '}
			</div>
		</div>
	);
};

export default TweetItem;
