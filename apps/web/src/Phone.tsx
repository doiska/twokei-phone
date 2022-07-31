import React from 'react';

import { useSystemThemeService } from '@ui/hooks/useSystemTheme';

import useCallService from '@os/call/hooks/useCallService';
import useLocationService from '@os/hooks/useLocationService';
import NavigationBar from '@os/navigation/NavigationBar';
import NotificationBar from '@os/notification/components/NotificationBar';
import { useSimcardService } from '@os/simcard/hooks/useSimcardService';

import PhoneBody from './PhoneBody';
import PhoneRoutes from './PhoneRoutes';
import PhoneWrapper from './PhoneWrapper';

const Phone = () => {
	useLocationService();
	useSystemThemeService();
	useSimcardService();
	useCallService();

	return (
		<PhoneWrapper>
			<PhoneBody>
				<NotificationBar/>
				<PhoneRoutes/>
				<NavigationBar/>
			</PhoneBody>
		</PhoneWrapper>
	);
};

export default Phone;
