import React from 'react';
import {
	IoMailOutline,
	IoMdNotificationsOutline,
	RiHome7Fill,
} from 'react-icons/all';
import useNavigation from '@os/hooks/useNavigation';

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

const TwitterNavbar = () => {
	const { goTo, pathname } = useNavigation();

	const NavItem = ({
		icon,
		path,
	}: {
		icon: React.ReactNode;
		path: string;
	}) => (
		<span
			className={
				pathname === path
					? 'text-twitter-blue'
					: 'text-black dark:text-white'
			}
			onClick={() => goTo(path)}
		>
			{icon}
		</span>
	);

	return (
		<nav className="border-twitter-dark-gray relative flex items-center justify-around border-t-2 border-opacity-30 p-3 text-2xl">
			<NavItem icon={<RiHome7Fill />} path="/twitter" />
			<NavItem
				icon={<IoMdNotificationsOutline />}
				path="/twitter/notifications"
			/>
			<NavItem icon={<IoMailOutline />} path="/twitter/messages" />
		</nav>
	);
};

const TwitterBody = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-full w-full flex-col">{children}</div>
);

export { TwitterTitle, TwitterNavbar, TwitterBody };
