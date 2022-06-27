import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import Camera from '@apps/photo/pages/Camera';
import Gallery from '@apps/photo/pages/Gallery';

const PhotoRoutes = {
	path: 'photo',
	element: (
		<AppRoute id="PHOTO" component={() => <Outlet />} emitOnOpen={true} />
	),
	children: [
		{
			path: '',
			element: <Gallery />,
			children: [
				{
					path: ':ref/:photo',
					element: <Gallery />,
				},
			],
		},
		{
			path: 'camera',
			element: <Camera />,
		},
	],
} as RouteObject;

export default PhotoRoutes;
