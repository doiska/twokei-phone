import React, { Suspense } from 'react';

import { NotificationProvider } from '@os/notification/providers/NotificationProvider';

import Phone from './Phone';

const PhoneProviders: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading... </div>}>
			<NotificationProvider>
				<Phone />
			</NotificationProvider>
		</Suspense>
	);
};

export default PhoneProviders;
