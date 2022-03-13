import React from 'react';
import NotificationBar from '@os/notification/components/NotificationBar';
import NavigationBar from '@os/navigation/NavigationBar';
import PhoneWrapper from './PhoneWrapper';
import { Route, Routes } from 'react-router-dom';
import HomeApp from '@apps/Home/HomeApp';
import LoadingSpinner from '@ui/components/LoadingSpinner';
import { useApps } from '@os/hooks/useApp';

const Phone = () => {
	const { apps } = useApps();

	return (
		<PhoneWrapper>
			<NotificationBar />
			<div className="flex h-[95%] w-full flex-col">
				<>
					<React.Suspense fallback={<LoadingSpinner />}>
						<Routes>
							<Route index element={<HomeApp />} />
							{apps.map(({ id, disable, path, AppElement }) => (
								<Route key={id} path={path} element={<AppElement />} />
							))}
						</Routes>
					</React.Suspense>
				</>
			</div>
			<NavigationBar />
		</PhoneWrapper>
	);
};

export default Phone;
