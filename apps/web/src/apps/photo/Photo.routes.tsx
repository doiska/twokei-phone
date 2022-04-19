import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import Gallery from '@apps/photo/gallery/Gallery';

const PhotoRoutes = {
	path: 'photo',
	element: <AppRoute id="PHOTO" component={() => <Outlet />} emitOnOpen={true} />,
	children: [
		{
			path: 'gallery',
			element: <Gallery />,
			children: [
				{
					path: ':ref',
					element: null,
				},
			],
		},
		{
			path: 'camera',
			element: null,
		},
	],
} as RouteObject;

export default PhotoRoutes;
