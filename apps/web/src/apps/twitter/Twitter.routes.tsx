import React from 'react';
import { RouteObject, Outlet } from "react-router-dom";

import AppRoute from "@os/apps/components/AppRoute";

import { Home } from "@apps/twitter/pages/Home";

const TwitterRoutes: RouteObject = {
	path: "twitter",
	element: (<AppRoute id={'TWITTER'} emitOnOpen={true} component={() => <Outlet/>}/>),
	children: [
		{
			path: '',
			element: <Home/>
		}
	]
};

export { TwitterRoutes };