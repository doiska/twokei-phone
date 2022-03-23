import React from 'react';

import { MainBody } from '../MessagesApp.styles';
import ConversationList from './Home/ConversationList';
import Navbar from './Home/Navbar';

const MessagesHome: React.FC = () => {
	return (
		<>
			<Navbar />
			<MainBody className="bg-white">
				<ConversationList />
			</MainBody>
		</>
	);
};

export default MessagesHome;
