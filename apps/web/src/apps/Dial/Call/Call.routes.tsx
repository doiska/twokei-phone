import React from 'react';
import { RouteObject } from 'react-router-dom';

import Calling from '@apps/Dial/Call/Calling/Calling';
import Dialpad from '@apps/Dial/DialPad/Dialpad';
import Incoming from '@apps/Dial/Call/Incoming/Incoming';
import Ongoing from '@apps/Dial/Call/Ongoing/Ongoing';

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
