import React from 'react';
import { Outlet } from 'react-router-dom';

import { Wrapper } from './MessagesApp.styles';

const MessagesApp: React.FC = () => {
	return (
		<Wrapper>
			<Outlet />
		</Wrapper>
	);
};

export default MessagesApp;
