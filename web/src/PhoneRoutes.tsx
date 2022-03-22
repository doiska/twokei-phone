import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoadingSpinner from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';

const PhoneRoutes: React.FC = () => {
	const location = useLocation();
	const { apps } = useApps();
	const routes = useRoutes(apps.map((app) => app.routes));

	return (
		<React.Suspense fallback={<LoadingSpinner />}>
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="page" timeout={500}>
					{routes}
				</CSSTransition>
			</TransitionGroup>
		</React.Suspense>
	);
};

export default PhoneRoutes;
