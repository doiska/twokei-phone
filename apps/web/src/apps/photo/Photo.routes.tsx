import React from 'react';
import { RouteObject } from 'react-router-dom';

import AppRoute from '@os/apps/components/AppRoute';

import Gallery from '@apps/photo/gallery/Gallery';
import Photo from '@apps/photo/Photo';

const PhotoRoutes = {
	path: 'photo',
	element: <AppRoute id="PHOTO" component={Gallery} emitOnOpen={true} />,
	children: [
		{
			path: 'gallery',
			element: <Gallery />,
		},
	],
} as RouteObject;

export default PhotoRoutes;
