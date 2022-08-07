import React, { Suspense } from 'react';

import { NuiProvider } from 'fivem-nui-lib';
import Phone from 'Phone';

import { NotificationProvider } from '@os/notification/providers/NotificationProvider';

const PhoneProviders: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading... </div>}>
			<NuiProvider resource="phone">
				<NotificationProvider>
					<Phone/>
				</NotificationProvider>
			</NuiProvider>
		</Suspense>
	);
};

export default PhoneProviders;
