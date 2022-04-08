import { atom, useRecoilState } from 'recoil';

import Default from '@config/default.json';

type KV = {
	label: string;
	value: string;
};

type KVArray = KV[];

export type PhoneConfig = {
	provider: string;
	defaultLanguage: string;

	cases: KVArray;
	wallpapers: KVArray;
	languages: KVArray;
	ringtones: KVArray;
	notification: KVArray;

	debug: {
		printLogs: boolean;
	};
};

const configState = atom({
	key: 'config',
	default: Default,
});

export const usePhoneConfig = (state: any = configState) => {
	const [config, _setConfig] = useRecoilState<PhoneConfig>(state);

	// const setConfig = (key: any, value: any): any => {
	// 	_setConfig((oldConfig: any) => ({
	// 		...oldConfig,
	// 		[key]: value,
	// 	}));
	// };

	return { config: config, setConfig: _setConfig };
};
