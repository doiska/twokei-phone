import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useNuiEvent from '@common/hooks/useNuiEvent';
import InjectDebugData from '@debug/InjectDebugData';
import { ActiveCall, CallEvents, CallHistoryItem } from '@typings/call';

import { ModalState, useCallModal } from '@os/call/hooks/state';
import { useCall } from '@os/call/hooks/useCall';
import useNavigation from '@os/hooks/useNavigation';
import { useSetNavigationDisabled } from '@os/navigation/navigation.state';

InjectDebugData<ActiveCall | ModalState>([
	{
		app: 'CALL',
		event: CallEvents.SET_INFO,
		data: {
			dialer: '123-456-7',
			receiver: '0147-0147',
			isAccepted: false,
			isDialer: false,
			start: new Date().toString(),
		},
	},
	{
		app: 'CALL',
		event: CallEvents.SHOW_MODAL,
		data: ModalState.OPEN,
	},
]);

const useCallService = () => {
	const { call, setCall } = useCall();

	const [modalState, setModalState] = useCallModal();

	const { goTo, match } = useNavigation();

	const setNavigationDisabled = useSetNavigationDisabled();

	useEffect(() => {
		console.log(`[useCallService] Modal ${ModalState[modalState]}`);

		// if (modalState !== ModalState.CLOSED) {
		// 	setNavigationDisabled(true);
		// }

		switch (modalState) {
			case ModalState.OPEN: {
				if (!match('dial/call')) {
					goTo(call?.isDialer ? '/dial/call/calling' : '/dial/call/incoming');
				}
				break;
			}

			case ModalState.CLOSED: {
				if (match('dial/call')) goTo('/');
				break;
			}

			case ModalState.ONGOING: {
				goTo('/dial/call/ongoing');
				break;
			}
		}
	}, [modalState]);

	useNuiEvent<ActiveCall | null>('CALL', CallEvents.SET_INFO, (data) => {
		setCall(data);
		if (!data) return;

		setModalState(ModalState.OPEN);
		console.log(`[useCallService] Call SET_INFO updated ${!data} ${JSON.stringify(data)}`);
		//TODO: set notification
	});

	useNuiEvent('CALL', CallEvents.SHOW_MODAL, (status: boolean) =>
		setModalState(status ? ModalState.OPEN : ModalState.CLOSED)
	);
};

export default useCallService;
