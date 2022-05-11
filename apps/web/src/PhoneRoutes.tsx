import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

import { TriangleLoader } from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';
import { useAppWallpaperValue } from '@os/hooks/useAppWallpaper';

const Routes = () => {
	const { apps } = useApps();
	return useRoutes(apps.map((app) => app.routes));
};

const AnimatedRoute: React.FC = ({ children }) => {
	const wallpaper = useAppWallpaperValue();

	const location = useLocation();
	const transitions = useTransition(location, {
		from: { opacity: 0.5 },
		enter: { opacity: 1 },
		leave: { opacity: 0.5 },
	});

	return transitions((props) => (
		<animated.div
			className={`flex h-full w-full flex-col ${wallpaper}`}
			style={{ ...props }}
		>
			<div className={`flex h-[97%] w-full flex-col`}>{children}</div>
		</animated.div>
	));
};

const PhoneRoutes: React.FC = () => {
	const location = useLocation();

	return (
		<React.Suspense key={location.key} fallback={<TriangleLoader />}>
			<AnimatedRoute>
				<Routes />
			</AnimatedRoute>
		</React.Suspense>
	);
};

export default PhoneRoutes;
