import React from 'react';
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineUpload } from 'react-icons/ai';
import { IoMdMore } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';

type Props = {
	children?: React.ReactNode;
	name: string;
	username: string;
	avatar: string;
	date: string;
	content: string;
};

const TweetItem: React.FC<Props> = ({ name, username, avatar, date, content, children }) => {
	return (
		<div className="border-twitter-dark-gray relative flex w-full flex-col gap-2 border-t-[0.5px] border-opacity-50 p-4 pb-2">
			<div className="flex h-auto w-full flex-row gap-2">
				<div className="h-auto w-full basis-[17%]">
					<img src={avatar} className="rounded-full object-cover" />
				</div>

				<div className="flex flex-1 flex-col">
					<div className="flex flex-row items-center gap-1">
						<span className="text-twitter-white font-medium">{name}</span>
						<span className="text-twitter-light-gray text-sm">{username}</span>
						<span className="text-twitter-light-gray">•</span>
						<span className="text-twitter-light-gray">{date}</span>
					</div>
					<div className="text-twitter-white flex-1">
						{content}
						{children}
					</div>
					<div className="text-md mt-3 flex flex-row items-center justify-between text-sm">
						<span className="flex flex-row items-center gap-1">
							<IoChatbubbleOutline />
							<span>100</span>
						</span>
						<span className="flex flex-row items-center gap-1">
							<AiOutlineRetweet />
							<span>30</span>
						</span>
						<span className="flex flex-row items-center gap-1">
							<AiOutlineHeart />
							<span>500</span>
						</span>
						<span className="flex flex-row items-center gap-1">
							<AiOutlineUpload />
						</span>
					</div>
				</div>
				<span className="absolute right-2 top-2">
					<IoMdMore size={20} />
				</span>
			</div>
		</div>
	);
};

export default TweetItem;
