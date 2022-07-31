import React from 'react';
import { RouteObject } from 'react-router-dom';

import CallApp from '@apps/dial/call/Call.app';
import Calling from '@apps/dial/call/pages/Calling';
import Incoming from '@apps/dial/call/pages/Incoming';
import Ongoing from '@apps/dial/call/pages/Ongoing';
import DialPad from '@apps/dial/dialpad/DialPad';

const CallRoutes = {
	path: 'call',
	element: <CallApp/>,
	children: [
		{
			path: 'pad',
			element: <DialPad/>,
		},
		{
			path: 'incoming',
			element: <Incoming/>,
		},
		{
			path: 'ongoing',
			element: <Ongoing/>,
		},
		{
			path: 'calling',
			element: <Calling/>,
		},
	],
} as RouteObject;

export default CallRoutes;
