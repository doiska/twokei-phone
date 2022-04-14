import React from 'react';
import { RouteObject } from 'react-router-dom';

import ContactEditOrCreate from './components/ContactEditOrCreate';
import ContactsDetails from './components/ContactsDetails';
import ContactsHome from './components/ContactsHome';
import ContactsApp from './Contacts.app';

const ContactsRoutes = {
	path: 'contacts',
	element: <ContactsApp />,
	children: [
		{ path: '', element: <ContactsHome /> },
		{ path: 'edit/', element: <ContactEditOrCreate /> },
		{ path: 'edit/:id', element: <ContactEditOrCreate /> },
		{ path: 'view/:id', element: <ContactsDetails /> },
	],
} as RouteObject;

export default ContactsRoutes;
