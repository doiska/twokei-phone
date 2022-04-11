import React from 'react';
import { Outlet } from 'react-router-dom';

import { Wrapper } from './Messages.styles';

const MessagesApp: React.FC = () => {
	return <Outlet />;
};

export default MessagesApp;
