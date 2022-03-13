import config from '@config/default.json';

interface DebugEvent {
	action?: string;
	level?: number;
	data: any;
}

function LogEvent({ action = 'Undefined action', level = 1, data }: DebugEvent) {
	if (config.debug.printLogs) {
		console.group(`${action} | Level: ${level}`);
		console.dir(data);
		console.groupEnd();
	}
}

export default LogEvent;
