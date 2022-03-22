import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import MessagesHome from './components/MessagesHome';
import MessagesApp from './MessagesApp';

const MessagesRoutes = {
	path: 'whatsapp',
	element: <AppRoute id="WHATSAPP" emitOnOpen={true} component={MessagesApp} />,
	children: [{ path: '', element: <MessagesHome /> }],
} as RouteObject;

export default MessagesRoutes;
