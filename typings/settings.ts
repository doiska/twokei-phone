export interface SettingOption<T = any> {
    label: string;
    value: T | string | number;
}

export interface IPhoneSettings {
    language: string;
    wallpaper: SettingOption;
    case: SettingOption;
    zoom: number;

    ringtone: SettingOption;
    ringtoneVolume: number;

    callVolume: number;

    notificationEnabled: boolean;
    notificationSound: SettingOption;
    notificationSoundVolume: number;
}

export enum SettingsEvents {
    NUI_SETTINGS_UPDATE = 'twokei:nui:settingsUpdated'
}