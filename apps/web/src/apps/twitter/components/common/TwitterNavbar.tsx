import React from 'react';
import {
	RiHome7Fill,
	IoMdNotificationsOutline,
	AiOutlineUser,
} from 'react-icons/all';

import useNavigation from '@os/hooks/useNavigation';

const pages = [
	{
		title: 'Página inicial',
		icon: <RiHome7Fill />,
		path: '/twitter',
	},
	{
		title: 'Notificações',
		icon: <IoMdNotificationsOutline />,
		path: '/twitter/notifications',
	},
	{
		title: 'Perfil',
		icon: <AiOutlineUser />,
		path: '/twitter/profile',
		params: {
			username: 'me',
		},
	},
];

export const TwitterNavbar = () => {
	const { goTo, goToWithParams, pathname: currentPath } = useNavigation();

	return (
		<nav className="border-twitter-dark-gray bg-twitter-black absolute bottom-0 flex h-[8%] w-[100%] items-center justify-around border-t-2 border-opacity-30 p-3 text-2xl">
			{pages.map((page, index) => (
				<span
					className={`${
						page.path === currentPath
							? 'text-twitter-blue'
							: 'text-black dark:text-white'
					} cursor-pointer`}
					key={index}
					onClick={() => {
						if (page.params) {
							goToWithParams(page.path, page.params);
						} else {
							goTo(page.path);
						}
					}}
				>
					{page.icon}
				</span>
			))}
		</nav>
	);
};
