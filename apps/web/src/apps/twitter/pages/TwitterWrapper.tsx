import React from 'react';
import { Outlet } from 'react-router-dom';

import { useGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { TwitterNavbar } from '@apps/twitter/components/common/TwitterNavbar';
import { useTwitterProfileValue } from '@apps/twitter/hooks/state';
import { TwitterBody, TwitterTitle } from '@apps/twitter/Twitter.styles';

const TwitterWrapper = () => {
	const currentProfile = useTwitterProfileValue();

	useGlobalWallpaper(
		'dark:bg-twitter-black bg-white dark:text-white text-black'
	);

	return (
		<TwitterBody>
			<TwitterTitle
				title={currentProfile?.username ?? 'Twitter'}
				username={currentProfile?.username ?? ''}
				avatar={currentProfile?.avatar ?? ''}
			/>
			<Outlet />
			<TwitterNavbar />
		</TwitterBody>
	);
};

export default TwitterWrapper;
