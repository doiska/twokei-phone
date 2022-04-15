import { useCallback } from 'react';

import { ActiveCall, CallEvents, EndCallDTO, InitizalizeCallDTO } from '@typings/call';
import { ServerPromiseResp } from '@typings/common';
import fetchNui from '@utils/fetchNui';

import { useCurrentCall } from '@os/call/hooks/state';
import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

interface UseCall {
	call: ActiveCall | null;
	setCall: (call: ActiveCall | null) => void;
	initializeCall: (number: string) => void;
	acceptCall: () => void;
	rejectCall: () => void;
	hangupCall: () => void;
}

export const useCall = (): UseCall => {
	const [call, setCall] = useCurrentCall();
	const phoneNumber = usePhoneNumber();

	const initializeCall = useCallback(
		(number: string) => {
			fetchNui<ServerPromiseResp<ActiveCall>, InitizalizeCallDTO>(CallEvents.INITIALIZE_CALL, {
				receiverNumber: number,
			}).then((resp) => {
				if (resp.status !== 'ok') {
					console.error(`Failed to initialize call: ${resp.status}`);
					return;
				}
			});
		},
		[phoneNumber]
	);

	const acceptCall = useCallback(() => {
		fetchNui(CallEvents.ACCEPT_CALL, {
			dialerNumber: call?.dialer,
		});
	}, [call]);

	const rejectCall = useCallback(() => {
		fetchNui(CallEvents.REJECT_CALL, {
			dialerNumber: call?.dialer,
		});
	}, [call]);

	const hangupCall = useCallback(() => {
		if (!call) return;

		fetchNui<unknown, EndCallDTO>(CallEvents.HANGUP_CALL, {
			dialerNumber: call?.dialer,
			isUnavailable: call?.isUnavailable || true,
			isDialer: call?.dialer === phoneNumber,
		});
	}, [call, phoneNumber]);

	return { call, setCall, initializeCall, acceptCall, rejectCall, hangupCall };
};
