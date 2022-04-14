import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useNuiEvent from '@common/hooks/useNuiEvent';
import InjectDebugData from '@debug/InjectDebugData';
import { ActiveCall, CallEvents, CallHistoryItem } from '@typings/call';

import { useCallModal } from '@os/call/hooks/state';
import { useCall } from '@os/call/hooks/useCall';
import useNavigation from '@os/hooks/useNavigation';

// InjectDebugData<CallHistoryItem | boolean>([
// 	{
// 		app: 'CALL',
// 		event: CallEvents.SET_INFO,
// 		data: {
// 			dialer: '0147-0147',
// 			receiver: '1234-5678',
// 			isAccepted: true,
// 			start: new Date().toString(),
// 		},
// 	},
// 	{
// 		app: 'CALL',
// 		event: CallEvents.INCOMING_CALL,
// 		data: true,
// 	},
// ]);

const useCallService = () => {
	const { call, setCall } = useCall();
	const [modal, setModal] = useCallModal();

	const [modalOpened, setModalOpened] = useState<boolean>(false);

	const { goTo } = useNavigation();
	const { pathname } = useLocation();

	useEffect(() => {
		setModalOpened(!!modal);
	}, [modal]);

	useEffect(() => {
		if (!modal && (pathname === '/call/ongoing' || pathname === '/call/incoming')) {
			console.log(`[CALL] goTo('/')`);
			goTo('/');
		}
		if (modal && !modalOpened && pathname !== '/call') {
			console.log(`[CALL] goTo('/call')`);
			goTo('/call/incoming');
		}
	}, [pathname, modal, modalOpened]);

	useNuiEvent<ActiveCall | null>('CALL', CallEvents.SET_INFO, (data) => {
		setCall(data);
		if (!data) return;
		//TODO: set notification
	});

	useNuiEvent('CALL', CallEvents.INCOMING_CALL, setModal);
};

export default useCallService;
