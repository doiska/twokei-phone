import React, { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NotificationProvider } from '@os/notification/providers/NotificationProvider';

import Phone from './Phone';

const PhoneProviders: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	console.log(location);
	console.log(pathname);

	navigate('/');

	return (
		<Suspense fallback={<div>Loading... </div>}>
			<NotificationProvider>
				<Phone />
			</NotificationProvider>
		</Suspense>
	);
};

export default PhoneProviders;
