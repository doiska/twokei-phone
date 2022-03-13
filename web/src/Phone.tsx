import React from 'react';
import NotificationBar from '@os/notification/components/NotificationBar';
import NavigationBar from '@os/navigation/NavigationBar';
import PhoneWrapper from './PhoneWrapper';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomeApp from '@apps/Home/HomeApp';
import LoadingSpinner from '@ui/components/LoadingSpinner';
import { useApps } from '@os/hooks/useApp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Phone = () => {
	const { apps } = useApps();
	const location = useLocation();

	return (
		<PhoneWrapper>
			<NotificationBar />
			<div className="flex w-full basis-[90%] flex-col">
				<React.Suspense fallback={<LoadingSpinner />}>
					<TransitionGroup component={null}>
						<CSSTransition key={location.key} classNames="fade" timeout={300}>
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
