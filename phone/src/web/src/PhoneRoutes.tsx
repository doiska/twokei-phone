import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import LoadingSpinner from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';

const Routes = () => {
	const { apps } = useApps();
	console.log(apps);
	const routes = useRoutes(apps.map((app) => app.routes));

	return routes;
};

const PhoneRoutes: React.FC = () => {
	const location = useLocation();

	return (
		<React.Suspense key={location.key} fallback={<LoadingSpinner />}>
			<Routes />
		</React.Suspense>
	);
};

export default PhoneRoutes;
