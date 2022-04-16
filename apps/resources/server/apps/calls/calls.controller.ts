import callsService from '@apps/calls/calls.service';
import { onNetPromise } from '@lib/onNetPromise';
import { ActiveCall, CallEvents, CallHistoryItem, DialerDTO, EndCallDTO, InitizalizeCallDTO } from '@typings/call';
import { getSource, onNetTyped } from '@utils/fivem';

onNetPromise<InitizalizeCallDTO, ActiveCall>(CallEvents.INITIALIZE_CALL, (req, res) =>
	callsService.handleInitializeCall(req, res).catch(() => res({ status: 'error', errorMsg: 'SERVER_ERROR' }))
);

onNetTyped<DialerDTO>(CallEvents.START_CALL, ({ dialerNumber }) => {
	console.log(`DIALER DTO START_CALL ${dialerNumber}`);
	callsService.handleAcceptCall(getSource(), dialerNumber).catch((e) => console.error('SERVER_ERROR', e));
});

onNetTyped<DialerDTO>(CallEvents.ACCEPT_CALL, ({ dialerNumber }) => {
	console.log(`DIALER DTO ACCEPT_CALL ${dialerNumber}`);
	callsService.handleAcceptCall(getSource(), dialerNumber);
});

onNetTyped<DialerDTO>(CallEvents.REJECT_CALL, ({ dialerNumber }) => {
	console.log(`DIALER DTO REJECT_CALL ${dialerNumber}`);
	callsService.handleRejectCall(getSource(), dialerNumber).catch((e) => console.error('SERVER_ERROR', e));
});

onNetPromise<EndCallDTO, void>(CallEvents.HANGUP_CALL, (req, res) => {
	callsService.handleCallHangup(req, res).catch((e) => {
		console.error('SERVER_ERROR', e);
		res({ status: 'error', errorMsg: 'SERVER_ERROR' });
	});
});

// onNetPromise<void, CallHistoryItem[]>(CallEvents.FETCH_CALLS, (req, res) => {
//     callsService.
// }
