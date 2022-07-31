import React from 'react';
import { RouteObject } from 'react-router-dom';

import { ContactEditOrCreate } from '@apps/dial/contacts/pages/ContactEditOrCreate';
import { ContactsDetails } from '@apps/dial/contacts/pages/ContactsDetails';
import { ContactsHome } from '@apps/dial/contacts/pages/ContactsHome';

import ContactsApp from './Contacts.app';

const ContactsRoutes = {
	path: 'contacts',
	element: <ContactsApp/>,
	children: [
		{ path: '', element: <ContactsHome/> },
		{ path: 'edit/', element: <ContactEditOrCreate/> },
		{ path: 'edit/:id', element: <ContactEditOrCreate/> },
		{ path: 'view/:id', element: <ContactsDetails/> },
	],
} as RouteObject;

export default ContactsRoutes;
