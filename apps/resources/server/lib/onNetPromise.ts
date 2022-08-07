import { ServerPromiseResp } from '@typings/common';

import PlayerService from "@players/player.service";
import { PromiseCB, PromiseEventResponse, PromiseRequest } from '@server-types/promises';
import { getSource } from '@utils/fivem';

import { GlobalRateLimit, LimiterOptions } from './GlobalRateLimit';

const rateLimiter = new GlobalRateLimit(250);

export function onNetPromise<T = any, P = any>(eventName: string, cb: PromiseCB<T, P>, options: LimiterOptions = null) {
	rateLimiter.registerNewEvent(eventName);
	console.log(`[PROMISE] Registered event ${eventName}`);

	onNet(eventName, async (respEventName: string, data: T) => {
		console.log(`[PROMISE] Received ${eventName} event with data:`, data);

		const startTime = process.hrtime.bigint();
		const source = getSource();

		if (!respEventName) {
			console.error(`Promise event ${eventName} was called with wrong structure by ${source}.`);
			return;
		}

		const identifier = PlayerService.getPlayer(source).identifier;

		if (!identifier) {
			console.error(`Promise event ${eventName} was called with wrong structure by ${source} (without identifier).`);
		}

		const promiseRequest: PromiseRequest<T> = {
			source,
			identifier,
			data,
		};

		const response: PromiseEventResponse<P> = (data: ServerPromiseResp<P>) => {
			const endTime = process.hrtime.bigint();
			const totalTime = Number(endTime - startTime) / 1e6;

			emitNet(respEventName, source, data);

			console.log(`Response onNetPromise ${eventName} took ${totalTime}ms.`);
			console.log(data);
		};

		if (rateLimiter.isPlayerLimited(eventName, source)) {
			return response({ status: 'error', errorMsg: 'ERROR_RATE_LIMITED' });
		} else {
			rateLimiter.setPlayerRateLimited(eventName, source);
		}

		Promise.resolve(cb(promiseRequest, response)).catch((e) => {
			console.error(e);
			response({ status: 'error', errorMsg: 'ERROR_UNKNOWN' });
		});
	});
}
