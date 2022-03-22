import React from 'react';

import { MainBody } from '../MessagesApp.styles';
import Conversations from './Home/Conversations';
import Navbar from './Home/Navbar';

const MessagesHome: React.FC = () => {
	return (
		<>
			<Navbar />
			<MainBody>
				<Conversations />
			</MainBody>
		</>
	);
};

export default MessagesHome;
