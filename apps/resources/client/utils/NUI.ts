type NUIEvent<T> = (data: T) => void;
type EventCallback<T> = (data: T, cb: (res: EventCallbackResponse) => void) => void;

type EventCallbackResponse<T = {}> = {
	status?: 'success' | 'failed';
	errorMsg?: string;
	data?: T;
};

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

export const sendNUIEvent = (app: string, event: string, data: any = {}) =>
	SendNUIMessage({
		app,
		event,
		data,
	});

export const emitNetPromise = <T = any, D = any>(event: string, ...data: D[]): Promise<T> => {
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

export const RegisterNUIEvent = <T = any>(event: string, callback: NUIEvent<T>) => {
	RegisterNuiCallbackType(event);
	on(`__cfx_nui:${event}`, (data: T) => callback(data));
};

export const RegisterNUICallback = <WebData = any>(app = 'NUI', event: string, callback: EventCallback<WebData>) => {
	console.log(`[NUI-CALLBACK] RegisterNUICallback ${event}`);

	RegisterNuiCallbackType(event);

	on(`__cfx_nui:${event}`, (...data: any) => {
		callback(data, (response: EventCallbackResponse) => {
			console.log(
				`[NUI-CALLBACK] (${response.status || 'NO STATUS'}) ${event} response: ${JSON.stringify(response)}`
			);

			if (response.status) {
				sendNUIEvent(app, `${event}:${response.status}`, response.data ?? {});
			}
		});
	});
};

export const isPlayerLoaded = async () => {
	return new Promise<any>((resolve) => {
		const id = setInterval(() => {
			if (global.isPlayerLoaded) resolve(id);
		}, 50);
	}).then((id) => clearInterval(id));
};

export const RegisterNUIProxy = (event: string) => {
	console.log(`[PROXY] Registering ${event} as NUIProxy.`);

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

type onNetTypedCallback<T> = (data: T) => void;
export const onNetTyped = <T = any>(event: string, cb: onNetTypedCallback<T>) => onNet(event, cb);

export const emitNetTyped = <T = any>(event: string, data: T, source?: number) => {
	if (source) {
		return emitNet(event, data, source);
	}

	emitNet(event, data);
};

export const verifyArgumentType = (exportName: string, args: unknown, types: MSGPackTypes[]) => {
	if (!types.includes(typeof args)) {
		throw new TypeError(`${exportName}: Expected type ${types.join(' or ')} but got ${typeof args}`);
	}
};
