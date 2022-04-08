import { config } from 'server';

export const getSource = (): number => global.source;

export const clean = (input: string): string => (input ? input.replace(/[^0-9a-z]/gi, '') : input);

type onNetTypedCB<T> = (data: T) => void;
export const onNetTyped = <T = any>(eventName: string, cb: onNetTypedCB<T>) => onNet(eventName, cb);

export const emitNetTyped = <T = any>(eventName: string, data: T, source?: number) => {
	if (source) return emitNet(eventName, source, data);

	return emitNet(eventName, data);
};

export const getPlayerGameLicense = (source: number): null | string => {
	const identifiers = getPlayerIdentifiers(source.toString());

	const validIdentifier = config.database.identifier;
	const remapIdentifier = config.database.remapIdentifier;

	let identifier;
	for (const _identifier of identifiers) {
		if (_identifier.startsWith(validIdentifier)) {
			return `${remapIdentifier}:${_identifier.split(':')[1]}`;
		}
		identifier = _identifier.split(':')[1];
	}

	console.log(`Used identifier`, identifier);
	return identifier;
};

export const Delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
