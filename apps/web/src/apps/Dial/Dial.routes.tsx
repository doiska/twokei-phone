import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import CallRoutes from '@apps/dial/call/Call.routes';
import ContactsRoutes from '@apps/dial/contacts/Contacts.routes';
import DialApp from '@apps/dial/Dial.app';
import Dialpad from '@apps/dial/dialpad/Dialpad';

const DialRoutes = {
	path: 'dial',
	element: <AppRoute id="DIAL" emitOnOpen={true} component={DialApp} />,
	children: [
		{
			path: '',
			element: <Dialpad />,
		},
		CallRoutes,
		ContactsRoutes,
	],
} as RouteObject;

export default DialRoutes;
