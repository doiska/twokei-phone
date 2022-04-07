import React from 'react';
import { Location, Route, useLocation, useRoutes } from 'react-router-dom';
import { Transition, useTransition, animated } from 'react-spring';

import { TriangleLoader } from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';

const Routes = () => {
	const { apps } = useApps();
	console.log(apps);
	const routes = useRoutes(apps.map((app) => app.routes));

	return routes;
};

const AnimatedRoute: React.FC = ({ children }) => {
	const location = useLocation();
	const transitions = useTransition(location, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	return transitions((props) => (
		<animated.div className="flex h-full max-h-[91%] w-full flex-col" style={{ ...props }}>
			{children}
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
