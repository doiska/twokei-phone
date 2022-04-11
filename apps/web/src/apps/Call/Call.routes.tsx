import React from 'react';
import { RouteObject } from 'react-router-dom';

import Ongoing from '@apps/Call/Ongoing/Ongoing';

import AppRoute from '../../os/apps/components/AppRoute';
import CallApp from './Call.app';

const CallRoutes = {
	path: 'call',
	element: <AppRoute id="CALL" emitOnOpen={true} component={CallApp} />,
	children: [
		{
			path: 'ongoing',
			element: <Ongoing />,
		},
	],
} as RouteObject;

export default CallRoutes;
