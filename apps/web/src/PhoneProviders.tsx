import React, { Suspense } from 'react';

import { NuiProvider } from 'fivem-nui-react-lib';

import { NotificationProvider } from '@os/notification/providers/NotificationProvider';

import Phone from './Phone';

const PhoneProviders: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading... </div>}>
			<NuiProvider resource="phone">
				<NotificationProvider>
					<Phone />
				</NotificationProvider>
			</NuiProvider>
		</Suspense>
	);
};

export default PhoneProviders;
