import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import ContactsDetails from './components/ContactsDetails';
import ContactDetailsEdit from './components/ContactsDetailsEdit';
import ContactsHome from './components/ContactsHome';
import ContactsApp from './ContactsApp';

const ContactsRoutes = {
	path: 'contacts',
	element: <AppRoute id="CONTACTS" emitOnOpen={true} component={ContactsApp} />,
	children: [
		{ path: '', element: <ContactsHome /> },
		{ path: ':id', element: <ContactsDetails /> },
		{ path: ':id/edit', element: <ContactDetailsEdit /> },
	],
} as RouteObject;

export default ContactsRoutes;
