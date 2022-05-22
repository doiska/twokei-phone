import React from 'react';

type Props = {
	path: string;
	currentPath: string;
	goTo: (path: string) => void;
	icon: React.ReactNode;
};

const TwitterNavItem = ({ icon, path, currentPath, goTo }: Props) => (
	<span
		className={
			currentPath === path
				? 'text-twitter-blue'
				: 'text-black dark:text-white'
		}
		onClick={() => goTo(path)}
	>
		{icon}
	</span>
);

export default TwitterNavItem;
