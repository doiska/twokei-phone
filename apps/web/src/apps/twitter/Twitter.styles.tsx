import React from 'react';
import { AiOutlinePlus } from 'react-icons/all';

type NavProps = {
	title: string;
	avatar?: string;
	username: string;
};

export const TwitterTitle = ({ title, avatar }: NavProps) => (
	<div className="flex basis-[1%] flex-row items-center gap-4 border-b-[1px] border-gray-500 border-opacity-50 p-2">
		<div className="basis-[10%]">
			<img
				src={avatar}
				className="rounded-full object-cover"
				alt={'User Avatar'}
			/>
		</div>
		<span className="font-medium">{title}</span>
	</div>
);

export const TwitterBody = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-full w-full flex-col">{children}</div>
);

export const TwitterNewTweetIcon = ({ onClick }: { onClick: () => void }) => (
	<div
		className="bg-twitter-blue absolute bottom-24 right-5 rounded-full p-4"
		onClick={onClick}
	>
		<AiOutlinePlus />
	</div>
);
