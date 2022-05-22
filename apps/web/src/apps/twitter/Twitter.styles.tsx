import React from 'react';

type NavProps = {
	title: string;
	avatar?: string;
	username: string;
};

const TwitterTitle = ({ title, avatar }: NavProps) => (
	<div className="flex basis-[1%] flex-row items-center gap-4 p-2">
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

const TwitterBody = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-full w-full flex-col">{children}</div>
);

export { TwitterTitle, TwitterBody };
