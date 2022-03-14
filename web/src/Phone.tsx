import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoadingSpinner from '@ui/components/LoadingSpinner';

import { useApps } from '@os/hooks/useApp';
import NavigationBar from '@os/navigation/NavigationBar';
import NotificationBar from '@os/notification/components/NotificationBar';

import PhoneWrapper from './PhoneWrapper';

const Phone = () => {
	const { apps } = useApps();
	const location = useLocation();

	return (
		<PhoneWrapper>
			<NotificationBar />
			<div className="h-full max-h-[90%] w-full flex-1">
				<React.Suspense fallback={<LoadingSpinner />}>
					<TransitionGroup component={null}>
						<CSSTransition key={location.key} classNames="page" timeout={300}>
							<Routes>
								{apps.map(({ id, parent: { element, path }, childrens }) => {
									return (
										<Route key={id} path={path} element={element}>
											{childrens?.map(({ element: childrenElement, path: childrenPath }) => {
												return (
													<Route key={`${id}-${path}`} path={childrenPath} element={childrenElement} />
												);
											})}
										</Route>
									);
								})}
							</Routes>
						</CSSTransition>
					</TransitionGroup>
				</React.Suspense>
			</div>
			<NavigationBar />
		</PhoneWrapper>
	);
};

export default Phone;
