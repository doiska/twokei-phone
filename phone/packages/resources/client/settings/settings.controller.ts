import { RegisterNUICallback } from 'utils/NUI';
import { IPhoneSettings, KvpItems, SettingsEvents } from '@typings/settings';
import KvpService from './kvp.service';

RegisterNUICallback<IPhoneSettings>(SettingsEvents.NUI_SETTINGS_UPDATE, (cfg, cb) => {
	KvpService.setKvp(KvpItems.TK_NOTIFICATION, cfg.notificationSound.value);
	KvpService.setKvp(KvpItems.TK_RINGTONE, cfg.ringtoneSound.value);

	cb({});
});
