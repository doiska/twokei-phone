/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
//  import LogDebugEvent from '../os/debug/LogDebugEvents';
import LogEvent from '@os/debug/LogEvent';
import { isEnvBrowser } from './misc';

async function fetchNui<T = any, D = any>(eventName: string, data?: D, mockResp?: T): Promise<T> {
	const options = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
	};

	if (isEnvBrowser() && mockResp) {
		LogEvent({
			data: {
				request: data,
				response: mockResp,
			},
			action: `fetchNui (${eventName})`,
		});
		return mockResp;
	}

	const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'twokei';

	const resp = await fetch(`https://${resourceName}/${eventName}`, options);

	const responseObj = await resp.json();

	LogEvent({
		data: {
			request: data,
			response: responseObj,
		},
		action: `fetchNui (${eventName})`,
	});

	return responseObj;
}

export default fetchNui;
