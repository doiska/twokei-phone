import React, { useContext } from 'react';

import { MainBody, MainHeader } from '../../MessagesApp.styles';
import ConversationList from './components/ConversationList';
import ConversationListIconContext from './components/ConversationListIconContext';
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
			<ConversationListIconContext />
		</>
	);
};

export default MessagesConversationList;
