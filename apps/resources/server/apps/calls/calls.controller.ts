import callsService from '@apps/calls/calls.service';
import { onNetPromise } from '@lib/onNetPromise';
import { ActiveCall, CallEvents, CallHistoryItem, DialerDTO, EndCallDTO, InitizalizeCallDTO } from '@typings/call';
import { getSource, onNetTyped } from '@utils/fivem';

onNetPromise<InitizalizeCallDTO, ActiveCall>(CallEvents.INITIALIZE_CALL, (req, res) =>
	callsService.handleInitializeCall(req, res).catch(() => res({ status: 'error', errorMsg: 'SERVER_ERROR' }))
);

onNetTyped<DialerDTO>(CallEvents.START_CALL, ({ dialerNumber }) => {
	const source = getSource();
	callsService.handleAcceptCall(source, dialerNumber).catch((e) => console.error('SERVER_ERROR', e));
});

onNetTyped<DialerDTO>(CallEvents.REJECT_CALL, ({ dialerNumber }) => {
	const source = getSource();
	callsService.handleRejectCall(source, dialerNumber).catch((e) => console.error('SERVER_ERROR', e));
});

onNetPromise<EndCallDTO, void>(CallEvents.HANGUP_CALL, (req, res) => {
	callsService.handleEndCall(req, res).catch((e) => {
		console.error('SERVER_ERROR', e);
		res({ status: 'error', errorMsg: 'SERVER_ERROR' });
	});
});

// onNetPromise<void, CallHistoryItem[]>(CallEvents.FETCH_CALLS, (req, res) => {
//     callsService.
// }
