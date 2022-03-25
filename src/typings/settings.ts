export interface SettingOption<T = any> {
	label: string;
	value: T | string | number;
}

export interface IPhoneSettings {
	language: string;
	wallpaper: SettingOption;
	case: SettingOption;
	zoom: number;

	ringtoneEnabled: boolean;
	ringtoneSound: SettingOption;
	ringtoneSoundVolume: number;

	callVolume: number;

	notificationEnabled: boolean;
	notificationSound: SettingOption;
	notificationSoundVolume: number;
}

export enum SettingsEvents {
	NUI_SETTINGS_UPDATE = 'tkphone:nui:settingsUpdated',
}
