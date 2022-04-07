interface DebugEvent<T = unknown> {
	app: string;
	event: string;
	data: T;
}

const InjectDebugData = <P>(events: DebugEvent<P>[], timer = 1000) => {
	if (process.env.NODE_ENV === 'development') {
		for (const event of events) {
			setTimeout(() => {
				console.log(`[DEBUG] Injected event: ${event.event}`);
				window.dispatchEvent(
					new MessageEvent('message', {
						data: {
							app: event.app,
							event: event.event,
							data: event.data,
						},
					})
				);
			}, timer);
		}
	}
};

export default InjectDebugData;
