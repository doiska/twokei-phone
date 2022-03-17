import React from 'react';

import NavigationBar from '@os/navigation/NavigationBar';
import NotificationBar from '@os/notification/components/NotificationBar';

import PhoneBody from './PhoneBody';
import PhoneRoutes from './PhoneRoutes';
import PhoneWrapper from './PhoneWrapper';

const Phone = () => {
	return (
		<PhoneWrapper>
			<PhoneBody>
				<NotificationBar />
				<PhoneRoutes />
				<NavigationBar />
			</PhoneBody>
		</PhoneWrapper>
	);
};

export default Phone;
