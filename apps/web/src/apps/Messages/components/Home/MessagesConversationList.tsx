import React from 'react';

import { MainBody, MainHeader } from '../../Messages.styles';
import ConversationListIconContext from './components/CreateConversationIcon';
import ConversationList from './components/MessagesHome';
import ConversationListNavbar from './components/MessagesHomeNavbar';

const MessagesConversationList: React.FC = () => {
	return (
		<>
			<MainHeader className="flex-col">
				<ConversationListNavbar />
			</MainHeader>
			<MainBody className="bg-white">
				<ConversationList />
			</MainBody>
			<ConversationListIconContext />
		</>
	);
};

export default MessagesConversationList;
