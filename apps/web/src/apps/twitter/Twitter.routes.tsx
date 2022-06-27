import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import TwitterHome from '@apps/twitter/pages/TwitterHome';
import TwitterProfileEdit from '@apps/twitter/pages/TwitterProfileEdit';
import TwitterWrapper from '@apps/twitter/pages/TwitterWrapper';

const TwitterRoutes = {
	path: 'twitter',
	element: (
		<AppRoute id="TWITTER" component={TwitterWrapper} emitOnOpen={true} />
	),
	children: [
		{
			path: '',
			element: <TwitterHome />,
		},
		{
			path: 'profile',
			element: <TwitterProfileEdit />,
		},
	],
} as RouteObject;

export default TwitterRoutes;
