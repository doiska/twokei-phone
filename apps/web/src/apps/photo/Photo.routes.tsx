import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import Camera from '@apps/photo/camera/Camera';
import Gallery from '@apps/photo/gallery/Gallery';

const PhotoRoutes = {
	path: 'photo',
	element: <AppRoute id="PHOTO" component={() => <Outlet />} emitOnOpen={true} />,
	children: [
		{
			path: '',
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
			element: <Camera />,
		},
	],
} as RouteObject;

export default PhotoRoutes;
