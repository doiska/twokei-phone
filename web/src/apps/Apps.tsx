import React, { useCallback } from 'react';
import AppElement from '@os/apps/components/AppRoute';

import { FcSettings } from 'react-icons/fc';
import { RiContactsBook2Fill } from 'react-icons/ri';

import ContactsApp from '@apps/Contacts/ContactsApp';
import SettingsApp from '@apps/Settings/SettingsApp';
export interface IApp {
	id: string;
	locale: string;
	disable?: boolean;
	path: string;
	icon?: JSX.Element;
	color?: string;
	AppElement: React.FC;
}

export const AllApps: IApp[] = [
	{
		id: 'CONTACTS',
		locale: 'APPS_CONTACTS',
		disable: false,
		path: '/contacts/*',
		icon: <RiContactsBook2Fill className="text-gray-600" />,
		AppElement: () => <AppElement id="CONTACTS" emitOnOpen={false} component={ContactsApp}></AppElement>,
	},
	{
		id: 'SETTINGS',
		locale: 'APPS_SETTINGS',
		disable: false,
		path: '/settings',
		icon: <FcSettings />,
		AppElement: () => <AppElement id="SETTINGS" emitOnOpen={false} component={SettingsApp} />,
	},
];

export const Apps = AllApps.filter(({ disable }) => !disable);
