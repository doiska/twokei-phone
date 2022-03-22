import React from 'react';
import { FcSettings } from 'react-icons/fc';
import { RiContactsBook2Fill, RiHomeGearFill, RiWhatsappLine } from 'react-icons/ri';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import ContactsRoutes from '@apps/Contacts/ContactsRoutes';
import HomeApp from '@apps/Home/HomeApp';
import MessagesRoutes from '@apps/Messages/MessagesRoutes';
import SettingsApp from '@apps/Settings/SettingsApp';

export interface IApp {
	id: string;
	locale: string;
	hidden?: boolean;
	disable?: boolean;
	icon?: JSX.Element;
	color?: string;
	routes: RouteObject;
}

export const AllApps: IApp[] = [
	{
		id: 'HOME',
		locale: 'APPS_HOME',
		disable: false,
		hidden: true,
		icon: <RiHomeGearFill />,
		routes: {
			path: '/',
			element: <AppRoute id="HOME" emitOnOpen={false} component={HomeApp} />,
		},
	},
	{
		id: 'CONTACTS',
		locale: 'APPS_CONTACTS',
		disable: false,
		icon: <RiContactsBook2Fill className="text-gray-600" />,
		routes: ContactsRoutes,
	},
	{
		id: 'SETTINGS',
		locale: 'APPS_SETTINGS',
		disable: false,
		icon: <FcSettings />,
		routes: {
			path: '/settings',
			element: <AppRoute id="SETTINGS" emitOnOpen={true} component={SettingsApp} />,
		},
	},
	{
		id: 'WHATSAPP',
		locale: 'APPS_WHATSAPP',
		disable: false,
		icon: <RiWhatsappLine className="text-whatsapp-light-green" />,
		routes: MessagesRoutes,
	},
];

export const Apps = AllApps.filter(({ disable }) => !disable);
