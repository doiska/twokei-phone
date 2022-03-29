import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import MessagesConversationChat from './components/Chats/MessageConversationChat';
import CreateConversation from './components/Create/CreateConversation';
import MessagesConversationList from './components/Home/MessagesConversationList';
import MessageProfile from './components/Profile/MessageProfile';
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
			path: 'conversations/add/:type',
			element: <CreateConversation />,
		},
		{
			path: 'conversations/view/:id',
			element: <MessagesConversationChat />,
		},
		{
			path: 'profile/edit',
			element: <MessageProfile />,
		},
	],
} as RouteObject;

export default MessagesRoutes;
