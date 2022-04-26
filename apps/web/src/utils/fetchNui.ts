/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
//  import LogDebugEvent from '../os/debug/LogDebugEvents';
import LogDebugEvent from '@debug/LogDebugEvent';

import { isEnvBrowser } from './nuiMisc';

const USE_MOCK_RESP = true;

async function fetchNui<T = any, D = any>(eventName: string, data?: D, mockResp?: T): Promise<T> {
	const options = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data) ?? '',
	};

	if (isEnvBrowser() && mockResp) {
		LogDebugEvent({
			data: {
				request: data,
				response: mockResp,
			},
			action: `fetchNui (${eventName})`,
		});

		if (USE_MOCK_RESP) return mockResp;
	}

	const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'twokei';

	const resp = await fetch(`https://${resourceName}/${eventName}`, options).catch((e) =>
		console.error(`Failed to fetch ${eventName}`, e)
	);

	const responseData = await resp
		?.json()
		.catch((err) => console.error(`${eventName} -- JSON Parsing issue ${err.message}`, err));

	LogDebugEvent({
		data: {
			request: data,
			response: responseData,
		},
		action: `fetchNui (${eventName})`,
	});

	return responseData;
}

export default fetchNui;
