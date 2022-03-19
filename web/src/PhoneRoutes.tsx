import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoadingSpinner from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';

const PhoneRoutes: React.FC = () => {
	const { apps } = useApps();
	const location = useLocation();

	return (
		<React.Suspense fallback={<LoadingSpinner />}>
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="page" timeout={500}>
					<Routes>
						{apps.map(({ id, parent: { element, path }, childrens }) => {
							return (
								<Route key={id} path={path} element={element}>
									{childrens &&
										childrens?.map(({ element: childrenElement, path: childrenPath }) => {
											return <Route key={`${id}-${path}`} path={childrenPath} element={childrenElement} />;
										})}
								</Route>
							);
						})}
						{/* TODO: DEFAULT REDIRECT <Route path="*" element={<>asdsda</>}></Route> */}
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</React.Suspense>
	);
};

export default PhoneRoutes;
