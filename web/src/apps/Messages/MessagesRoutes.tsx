import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import MessagesConversation from './components/MessagesConversation';
import MessagesHome from './components/MessagesHome';
import MessagesApp from './MessagesApp';

const MessagesRoutes = {
	path: 'messages',
	element: <AppRoute id="WHATSAPP" emitOnOpen={true} component={MessagesApp} />,
	children: [
		{
			path: '',
			element: <MessagesHome />,
		},
		{
			path: 'conversations/:id',
			element: <MessagesConversation />,
		},
	],
} as RouteObject;

export default MessagesRoutes;
