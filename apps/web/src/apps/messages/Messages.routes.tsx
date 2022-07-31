import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import ConversationView from './components/chats/ConversationView';
import CreateConversation from './components/create/CreateConversation';
import MessagesConversationList from './components/home/MessagesConversationList';
import MessageProfile from './components/profile/MessageProfile';
import MessagesApp from './Messages.app';

const MessagesRoutes = {
	path: 'messages',
	element: <AppRoute id="WHATSAPP" emitOnOpen={true} component={MessagesApp} />,
	children: [
		{
			path: '',
			element: <MessagesConversationList />,
		},
		{
			path: 'conversations',
			children: [
				{
					path: 'view/:id',
					element: <ConversationView />,
				},
				{
					path: 'add',
					element: <CreateConversation />,
				},
			],
		},
		{
			path: 'profile',
			children: [
				{
					path: 'edit',
					element: <MessageProfile />,
				},
			],
		},
	],
} as RouteObject;

export default MessagesRoutes;
