import { ActiveCall, CallEvents, InitizalizeCallDTO } from '@typings/call';
import { ServerPromiseResp } from '@typings/common';
import { emitNetPromise, RegisterNUICallback } from './utils/NUI';

export const initializeCallHandler = async (data: InitizalizeCallDTO, cb?: any) => {
	try {
		const res = await emitNetPromise<ServerPromiseResp<ActiveCall>>(CallEvents.INITIALIZE_CALL, data);

		if (res.status !== 'ok') {
			console.error(`Not ok`, res.errorMsg);
			return;
		}
	} catch (e) {
		console.error(`CLIENT -> SERVER_ERROR`, e);
	}
};

RegisterNUICallback<InitizalizeCallDTO>(CallEvents.INITIALIZE_CALL, initializeCallHandler);
