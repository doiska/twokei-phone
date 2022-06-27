import React from 'react';

import ConversationListIconContext from '@apps/messages/components/home/components/CreateConversationIcon';
import ConversationList from '@apps/messages/components/home/components/MessagesHome';
import ConversationListNavbar from '@apps/messages/components/home/components/MessagesHomeNavbar';

import { MainBody, MainHeader } from '../../Messages.styles';

const MessagesConversationList: React.FC = () => {
	return (
		<>
			<MainHeader className="flex-col">
				<ConversationListNavbar />
			</MainHeader>
			<MainBody>
				<ConversationList />
			</MainBody>
			<ConversationListIconContext />
		</>
	);
};

export default MessagesConversationList;
