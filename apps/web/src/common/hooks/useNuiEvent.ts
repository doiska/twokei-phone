import { MutableRefObject, useEffect, useRef } from 'react';

import LogDebugEvent from '@debug/LogDebugEvent';

interface NuiMessageData<T = unknown> {
	event: string;
	data: T;
	app: string;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param app
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

//* EM CASO DE PROBLEMAS, CHECAR OS NOMES DAS VARIAVEIS */

const useNuiEvent = <T = unknown>(app: string, action: string, handler: (data: T) => void) => {
	const savedHandler: MutableRefObject<NuiHandlerSignature<T> | undefined> = useRef();

	// When handler value changes set mutable ref to handler val
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
			const { event: eventAction, app: tgtApp, data } = event.data;

			if (savedHandler.current) {
				if (eventAction === action && tgtApp === app) {
					LogDebugEvent({ action: eventAction, data });
					savedHandler.current(data);
				}
			}
		};

		window.addEventListener('message', eventListener);
		// Remove Event Listener on component cleanup
		return () => window.removeEventListener('message', eventListener);
	}, [action, app]);
};

export default useNuiEvent;
