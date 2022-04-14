import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import CallRoutes from '@apps/Dial/Call/Call.routes';
import ContactsRoutes from '@apps/Dial/Contacts/Contacts.routes';
import DialApp from '@apps/Dial/Dial.app';
import Dialpad from '@apps/Dial/DialPad/Dialpad';

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
