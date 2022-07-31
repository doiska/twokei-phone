import React from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import CallRoutes from '@apps/dial/call/Call.routes';
import ContactsRoutes from '@apps/dial/contacts/Contacts.routes';
import DialPadRoutes from "@apps/dial/dialpad/DialPad.routes";

const DialRoutes = {
	path: 'dial',
	element: <AppRoute id="DIAL" emitOnOpen={true} component={() => <Outlet/>}/>,
	children: [DialPadRoutes, CallRoutes, ContactsRoutes],
} as RouteObject;

export default DialRoutes;
