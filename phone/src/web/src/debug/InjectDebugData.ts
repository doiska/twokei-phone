interface DebugEvent<T = any> {
	app: string;
	method: string;
	data: T;
}

const InjectDebugData = <P>(events: DebugEvent<P>[], timer = 1000) => {
	if (process.env.NODE_ENV !== 'production') {
		for (const event of events) {
			setTimeout(() => {
				console.log('DebugEvent', event);
				window.dispatchEvent(
					new MessageEvent('message', {
						data: {
							app: event.app,
							method: event.method,
							data: event.data,
						},
					})
				);
			}, timer);
		}
	}
};

export default InjectDebugData;
