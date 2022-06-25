import React from 'react';
import {
	AiOutlineUser,
	IoMdNotificationsOutline,
	RiHome7Fill,
} from 'react-icons/all';
import { Outlet } from 'react-router-dom';

import { useGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import useNavigation from '@os/hooks/useNavigation';

import TwitterNavItem from '@apps/twitter/common/navbar/TwitterNavItem';
import { useTwitterProfileValue } from '@apps/twitter/hooks/state';
import { TwitterBody, TwitterTitle } from '@apps/twitter/Twitter.styles';

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

const Twitter = () => {
	const { goTo, goToWithParams, pathname: currentPath } = useNavigation();
	const currentProfile = useTwitterProfileValue();

	useGlobalWallpaper(
		'dark:bg-twitter-black bg-white dark:text-white text-black'
	);

	const currentPage = pages.find((page) => page.path === currentPath);

	return (
		<TwitterBody>
			<TwitterTitle
				title={currentPage?.title ?? ''}
				username={currentProfile?.username ?? ''}
				avatar={currentProfile?.avatar ?? ''}
			/>
			<div className="flex-1">
				<Outlet />
			</div>
			<nav className="border-twitter-dark-gray relative flex items-center justify-around border-t-2 border-opacity-30 p-3 text-2xl">
				{pages.map((page, index) => (
					<TwitterNavItem
						key={index}
						icon={page.icon}
						isActive={page.path === currentPath}
						onClick={() => {
							if (page.params) {
								goToWithParams(page.path, page.params);
							} else {
								goTo(page.path);
							}
						}}
					/>
				))}
			</nav>
		</TwitterBody>
	);
};

export default Twitter;
