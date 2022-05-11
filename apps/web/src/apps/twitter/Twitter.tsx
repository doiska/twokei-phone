import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import {
	TwitterBody,
	TwitterNavbar,
	TwitterTitle,
} from '@apps/twitter/Twitter.styles';
import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

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
