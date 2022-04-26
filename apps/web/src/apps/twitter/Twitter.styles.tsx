import React from 'react';

type NavProps = {
	title: string;
	avatar?: string;
	username: string;
};

const TwitterNavbar = ({ title, avatar }: NavProps) => (
	<div className="flex basis-[1%] flex-row items-center gap-4 p-2">
		<div className="basis-[10%]">
			<img src={avatar} className="rounded-full object-cover" />
		</div>
		<span className="font-medium text-white">{title}</span>
	</div>
);

const TwitterBG = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-twitter-light-gray dark:bg-twitter-black flex h-full w-full flex-col">{children}</div>
);

export { TwitterNavbar, TwitterBG };
