import React from 'react';
import { RiContactsBook2Fill, RiHomeGearFill } from 'react-icons/ri';

import { ContactsApp, ContactsDetails, ContactsPage } from '@apps/Contacts';
import HomeApp from '@apps/Home/HomeApp';
import AppElement from '@os/apps/components/AppRoute';

type IRoute = {
	path: string;
	element: React.FC | JSX.Element;
	index?: boolean;
};
export interface IApp {
	id: string;
	locale: string;
	hidden?: boolean;
	disable?: boolean;
	icon?: JSX.Element;
	color?: string;
	parent: IRoute;
	childrens?: IRoute[];
}

export const AllApps: IApp[] = [
	{
		id: 'HOME',
		locale: 'APPS_HOME',
		disable: false,
		hidden: true,
		icon: <RiHomeGearFill />,
		parent: {
			path: '',
			element: <AppElement id="HOME" emitOnOpen={false} component={HomeApp} />,
		},
	},
	{
		id: 'CONTACTS',
		locale: 'APPS_CONTACTS',
		disable: false,
		icon: <RiContactsBook2Fill className="text-gray-600" />,
		parent: {
			path: 'contacts',
			element: <AppElement id="CONTACTS" emitOnOpen={false} component={ContactsApp} />,
		},
		childrens: [
			{
				path: '',
				element: <ContactsPage />,
			},
			{
				path: ':id',
				element: <ContactsDetails />,
			},
		],
	},
	// {
	// 	id: 'SETTINGS',
	// 	locale: 'APPS_SETTINGS',
	// 	disable: false,
	// 	icon: <FcSettings />,
	// 	parent: { path: 'settings', element: <AppElement id="SETTINGS" emitOnOpen={false} component={SettingsApp} /> },
	// },
];

export const Apps = AllApps.filter(({ disable }) => !disable);
