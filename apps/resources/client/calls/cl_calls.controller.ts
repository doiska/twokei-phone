import {
	ActiveCall,
	CallEvents,
	DialerDTO,
	EndCallDTO,
	InitizalizeCallDTO,
	RawActiveCall,
	StartCallEventData,
} from '@typings/call';
import { ServerPromiseResp } from '@typings/common';
import { CallService } from './cl_calls.service';
import { emitNetPromise, emitNetTyped, onNetTyped, RegisterNUICallback, RegisterNUIEvent } from '@utils/NUI';

const callService = new CallService();

RegisterNUIEvent<InitizalizeCallDTO>(CallEvents.INITIALIZE_CALL, async (data) => {
	try {
		const res = await emitNetPromise<ServerPromiseResp<ActiveCall>>(CallEvents.INITIALIZE_CALL, data);

		if (res.status !== 'ok') {
			console.error(`Not ok`, res.errorMsg);
			return;
		}

		console.log(`[CALL] Initialized call with data: ${JSON.stringify(data)}`);
	} catch (e) {
		console.error(`CLIENT -> SERVER_ERROR`, e);
	}
});

RegisterNUIEvent<DialerDTO>(CallEvents.ACCEPT_CALL, async (data: DialerDTO) => {
	console.log(`[CALL] Accepting call with data: ${JSON.stringify(data)}`);

	emitNetTyped<DialerDTO>(CallEvents.ACCEPT_CALL, data);
});

RegisterNUIEvent<DialerDTO>(CallEvents.REJECT_CALL, async (data: DialerDTO) => {
	console.log(`[CALL] Rejecting call with data: ${JSON.stringify(data)}`);
	emitNetTyped<DialerDTO>(CallEvents.REJECT_CALL, data);
});

RegisterNUIEvent<EndCallDTO>(CallEvents.HANGUP_CALL, async (data) => {
	try {
		const res: ServerPromiseResp<void> = await emitNetPromise(CallEvents.HANGUP_CALL, data);

		if (res.status !== 'ok') return console.error(`CLIENT -> SERVER_ERROR`, res.errorMsg);
	} catch (e) {
		console.error(`CLIENT -> SERVER_ERROR`, e);
	}
});

onNetTyped<StartCallEventData>(
	CallEvents.START_CALL,
	({ dialer, isDialer, receiver, isUnavailable }: StartCallEventData) => {
		callService.handleCallStart(dialer, receiver, isDialer, isUnavailable);
	}
);

onNetTyped<ActiveCall>(CallEvents.WAS_ACCEPTED, (data) => callService.handleCallAccepted(data));

onNet(CallEvents.WAS_REJECTED, (current: RawActiveCall) => {
	callService.handleCallRejected(current.receiver);
	CallService.sendDialerAction(CallEvents.WAS_REJECTED, current);
});

onNet(CallEvents.WAS_ENDED, (dialer: number, current?: ActiveCall) => {
	if (callService.isInCall() && !callService.isCurrentCall(dialer)) {
		console.log(`[CALL] Ending call with data: ${JSON.stringify(current)}`);
		return;
	}

	callService.handleCallEnd();

	if (current) {
		CallService.sendDialerAction(CallEvents.WAS_ENDED, current);
	}
});
