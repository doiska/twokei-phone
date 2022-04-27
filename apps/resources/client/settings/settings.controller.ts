import { RegisterNUIEvent } from '../utils/NUI';
import { IPhoneSettings, KvpItems, SettingsEvents } from '@typings/settings';
import KvpService from './kvp.service';

RegisterNUIEvent<IPhoneSettings>(SettingsEvents.NUI_SETTINGS_UPDATE, (cfg) => {
	KvpService.setKvp(KvpItems.TK_NOTIFICATION, cfg.notificationSound.value);
	KvpService.setKvp(KvpItems.TK_RINGTONE, cfg.ringtoneSound.value);
});
