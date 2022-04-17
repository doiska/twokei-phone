import React from 'react';
import { RouteObject } from 'react-router-dom';

import Calling from '@apps/dial/call/calling/Calling';
import Incoming from '@apps/dial/call/incoming/Incoming';
import Ongoing from '@apps/dial/call/ongoing/Ongoing';
import Dialpad from '@apps/dial/dialpad/Dialpad';

import CallApp from './Call.app';

const CallRoutes = {
	path: 'call',
	element: <CallApp />,
	children: [
		{
			path: 'pad',
			element: <Dialpad />,
		},
		{
			path: 'incoming',
			element: <Incoming />,
		},
		{
			path: 'ongoing',
			element: <Ongoing />,
		},
		{
			path: 'calling',
			element: <Calling />,
		},
	],
} as RouteObject;

export default CallRoutes;