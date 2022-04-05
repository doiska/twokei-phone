type EventCallback<T> = (data: T, cb: Function) => void;

type MSGPackTypes =
	| 'string'
	| 'number'
	| 'bigint'
	| 'boolean'
	| 'symbol'
	| 'function'
	| 'object'
	| 'null'
	| 'undefined';

type WrappedNetEventCallback = <T extends any[]>(...args: T) => void;

export const sendNUIEvent = (app: string, event: string, data: any) => {
	return SendNUIMessage({
		app,
		event,
		data,
	});
};

export const emitNetPromise = <T = any>(event: string, ...data: any) => {
	return new Promise((resolve, reject) => {
		let timedOut = false;
		const NET_PROMISE_TIMEOUT = 15000;

		setTimeout(() => {
			timedOut = true;
			reject(`${event} timed out after ${NET_PROMISE_TIMEOUT}ms`);
		}, NET_PROMISE_TIMEOUT);

		const uniqueId = Math.random().toString(36).substring(2);
		const eventName: string = `${event}:${uniqueId}`;

		emitNet(event, eventName, ...data);

		const listener = (data: T) => {
			removeEventListener(event, listener);
			if (!timedOut) {
				resolve(data);
			}
		};
		onNet(eventName, listener);
	});
};

export const RegisterNUICallback = <T = any>(event: string, callback: EventCallback<T>) => {
	RegisterNuiCallbackType(event);
	on(`__cfx_nui:${event}`, callback);
};

export const isPlayerLoaded = async () => {
	return new Promise<any>((resolve) => {
		const id = setInterval(() => {
			if (global.isPlayerLoaded) resolve(id);
		}, 50);
	}).then((id) => clearInterval(id));
};

export const RegisterNUIProxy = (event: string) => {
	RegisterNuiCallbackType(event);

	on(`__cfx_nui:${event}`, async (data: unknown, cb: Function) => {
		if (!global.isPlayerLoaded) {
			console.log(`Player not loaded, awaiting`);
			await isPlayerLoaded();
		}

		try {
			console.log(`Proxied ${event} with data: ${JSON.stringify(data)}`);
			const res = await emitNetPromise(event, data);
			cb(res);
		} catch (e) {
			cb({ status: 'error' });
		}
	});
};

export const onPhoneEvent = (event: string, cb: WrappedNetEventCallback) => onNet(event, cb);

export const verifyArgumentType = (exportName: string, args: unknown, types: MSGPackTypes[]) => {
	if (!types.includes(typeof args)) {
		throw new TypeError(`${exportName}: Expected type ${types.join(' or ')} but got ${typeof args}`);
	}
};
