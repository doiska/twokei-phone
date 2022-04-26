import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { TwitterBG, TwitterNavbar } from '@apps/twitter/Twitter.styles';

const Twitter = () => {
	const setGlobalWallpaper = useSetGlobalWallpaper();
	useEffect(() => setGlobalWallpaper('bg-twitter-light-gray dark:bg-twitter-black'), []);

	return (
		<TwitterBG>
			<TwitterNavbar
				title="Página inicial"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
			/>
			<div className="flex-1">
				<Outlet />
			</div>
		</TwitterBG>
	);
};

export default Twitter;
