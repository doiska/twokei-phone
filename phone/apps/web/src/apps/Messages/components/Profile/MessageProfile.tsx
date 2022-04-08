import React from 'react';

import { MainBody, MainHeader } from '@apps/Messages/MessagesApp.styles';

import UserProfileBody from './components/UserProfileBody';
import UserProfileNavbar from './components/UserProfileNavbar';

const MessageProfile: React.FC = () => {
	return (
		<>
			<MainHeader className="w-full basis-[8%] flex-row items-center justify-start">
				<UserProfileNavbar />
			</MainHeader>
			<MainBody>
				<UserProfileBody />
			</MainBody>
		</>
	);
};

export default MessageProfile;
