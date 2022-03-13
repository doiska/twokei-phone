import React, { Suspense } from 'react';
import { NotificationProvider } from '@os/notification/providers/NotificationProvider';
import Phone from './Phone';

const PhoneProviders: React.FC = ({ children }) => {
	return (
		<NotificationProvider>
			<Suspense fallback={<div>Loading... </div>}>
				<Phone />
			</Suspense>
		</NotificationProvider>
	);
};

export default PhoneProviders;
