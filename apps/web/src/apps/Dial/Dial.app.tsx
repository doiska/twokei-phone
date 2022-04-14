import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const DialApp: React.FC = () => {
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setGlobalWallpaper('backdrop-blur-md bg-zinc-900 bg-opacity-90');
	}, []);

	return (
		<>
			<Outlet />
		</>
	);
};

export default DialApp;
