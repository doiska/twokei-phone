import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import TwitterHome from '@apps/twitter/home/TwitterHome';
import Twitter from '@apps/twitter/Twitter';

const TwitterRoutes = {
	path: 'twitter',
	element: <AppRoute id="TWITTER" component={Twitter} emitOnOpen={true} />,
	children: [
		{
			path: '',
			element: <TwitterHome />,
		},
	],
} as RouteObject;

export default TwitterRoutes;
