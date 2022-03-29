export const getSource = (): number => global.source;

export const clean = (input: string): string => (input ? input.replace(/[^0-9a-z]/gi, '') : input);

type onNetTypedCB<T> = (data: T) => void;
export const onNetTyped = <T = any>(eventName: string, cb: onNetTypedCB<T>) => onNet(eventName, cb);

export const emitNetTyped = <T = any>(eventName: string, data: T, source?: number) => {
	if (source) return emitNet(eventName, source, data);

	return emitNet(eventName, data);
};
