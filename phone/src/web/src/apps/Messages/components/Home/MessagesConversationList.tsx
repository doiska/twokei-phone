import React from 'react';

import { MainBody, MainHeader } from '../../MessagesApp.styles';
import ConversationList from './components/ConversationList';
import ConversationListNavbar from './components/ConversationListNavbar';

const MessagesConversationList: React.FC = () => {
	return (
		<>
			<MainHeader className="flex-col">
				<ConversationListNavbar />
			</MainHeader>
			<MainBody className="bg-white">
				<ConversationList />
			</MainBody>
		</>
	);
};

export default MessagesConversationList;
