import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import MessagesConversationChat from './components/Chats/MessageConversationChat';
import MessagesConversationList from './components/Home/MessagesConversationList';
import MessagesApp from './MessagesApp';

const MessagesRoutes = {
	path: 'messages',
	element: <AppRoute id="WHATSAPP" emitOnOpen={true} component={MessagesApp} />,
	children: [
		{
			path: '',
			element: <MessagesConversationList />,
		},
		{
			path: 'conversations/:id',
			element: <MessagesConversationChat />,
		},
	],
} as RouteObject;

export default MessagesRoutes;
