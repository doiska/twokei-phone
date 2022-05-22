import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import TwitterNavbar from '@apps/twitter/common/navbar/TwitterNavbar';
import { TwitterBody, TwitterTitle } from '@apps/twitter/Twitter.styles';

const Twitter = () => {
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setGlobalWallpaper(
			'dark:bg-twitter-black bg-white dark:text-white text-black'
		);
	}, []);

	return (
		<TwitterBody>
			<TwitterTitle
				title="Página inicial"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
			/>
			<div className="flex-1">
				<Outlet />
			</div>
			<TwitterNavbar />
		</TwitterBody>
	);
};

export default Twitter;
