import React from 'react';
import { BsTwitter } from 'react-icons/bs';
import { FcSettings } from 'react-icons/fc';
import { RiCamera2Fill, RiContactsBook2Fill, RiHomeGearFill, RiWhatsappLine } from 'react-icons/ri';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import DialRoutes from '@apps/dial/Dial.routes';
import HomeApp from '@apps/home/Home.app';
import PhotoRoutes from '@apps/photo/Photo.routes';
import SettingsApp from "@apps/settings/Settings.app";

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
		icon: <RiHomeGearFill/>,
		routes: {
			path: '/',
			index: true,
			element: <AppRoute id="HOME" emitOnOpen={false} component={HomeApp}/>,
		},
	},
	{
		id: 'DIAL',
		locale: 'APPS_DIAL',
		disable: false,
		icon: <RiContactsBook2Fill className="text-gray-600"/>,
		routes: DialRoutes,
	},
	{
		id: 'SETTINGS',
		locale: 'APPS_SETTINGS',
		disable: false,
		icon: <FcSettings/>,
		routes: {
			path: '/settings',
			element: <AppRoute id="SETTINGS" emitOnOpen={true} component={SettingsApp}/>,
		},
	},
	{
		id: 'PHOTO',
		locale: 'APPS_PHOTO',
		disable: false,
		icon: <RiCamera2Fill className="text-gray-600"/>,
		routes: PhotoRoutes,
	}
];

export const Apps = AllApps.filter(({ disable }) => !disable);
