import SettingsConstant from '@common/constants/settings';
import Default from '@config/default.json';
import { SettingsEvents, IPhoneSettings } from '@typings/settings';
import fetchNui from '@utils/fetchNui';
import { atom, AtomEffect, DefaultValue } from 'recoil';

const getDefaultPhoneSettings = () => Default.defaultPhoneSettings;

const localStorageUpdateEffect: AtomEffect<IPhoneSettings> = ({ setSelf, onSet }) => {
	const key = SettingsConstant.DEFAULT_STORAGE_KEY;
	const saved = localStorage.getItem(key);

	const getConfig = async (): Promise<IPhoneSettings> => {
		const defaultConfig = getDefaultPhoneSettings();

		try {
			//TODO: validated saved
			//TODO: validate object size
			const settings = saved && saved.length !== 0 ? JSON.parse(saved) : defaultConfig;

			//TODO: validate string

			return settings;
		} catch (err) {
			return defaultConfig;
		}
	};

	setSelf(getConfig());

	onSet((newValue) => {
		fetchNui(SettingsEvents.NUI_SETTINGS_UPDATE, newValue, {}).catch(() => console.log('Failed settings update.'));

		if (newValue instanceof DefaultValue) {
			localStorage.removeItem(key);
		} else {
			console.group('Local Storage Settings Update');
			console.table(newValue);
			console.groupEnd();
			localStorage.setItem(key, JSON.stringify(newValue));
		}
	});
};

export const settingsState = atom<IPhoneSettings>({
	key: 'settings',
	default: {} as IPhoneSettings,
	effects_UNSTABLE: [localStorageUpdateEffect],
});
