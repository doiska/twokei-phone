import React, { useEffect, useState } from 'react';
import { BsZoomIn } from 'react-icons/bs';
import { GiSoundOn } from 'react-icons/gi';
import {
	IoLanguage,
	IoImageOutline,
	IoPhonePortraitOutline,
	IoNotifications,
	IoVolumeHigh,
	IoMusicalNotesSharp,
} from 'react-icons/io5';

import { usePhoneConfig } from '@config/hooks/usePhoneConfig';
import { useContextMenu } from '@ui/hooks/useContextMenu';
import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';

import { SettingsItemRange, SettingsItemSelect, SettingsItemToggle } from './components/SettingItem';
import SettingsCategory from './components/SettingsCategory';
import { useSettings } from './hooks/useSettings';

const SettingsApp: React.FC = () => {
	const [settings, setSettings] = useSettings();
	const { openMenu, ContextMenu } = useContextMenu();
	const { config } = usePhoneConfig();

	const handleSettingsChange = (key: string | number, value: unknown, label?: unknown) => {
		if (label) {
			setSettings({
				...settings,
				[key]: {
					label: label,
					value: value,
				},
			});
		} else {
			setSettings({ ...settings, [key]: value });
		}
	};

	return (
		<GenericApp>
			<GenericHeader title="Configurações" />
			<GenericBody>
				<SettingsCategory title="Dispositivo">
					<SettingsItemSelect
						title={'Idioma'}
						icon={<IoLanguage />}
						label={settings.language}
						value={settings.language}
						onCommit={(e, v) => handleSettingsChange('language', v)}
						onOpen={openMenu}
						options={config.languages}
					/>

					<SettingsItemSelect
						title={'Wallpaper'}
						label={settings.wallpaper.label}
						value={settings.wallpaper.value}
						icon={<IoImageOutline />}
						onCommit={(e, v, k) => handleSettingsChange('wallpaper', v, k)}
						onOpen={openMenu}
						options={config.wallpapers}
					/>
					<SettingsItemSelect
						title={'Case'}
						label={settings.case.label}
						value={settings.case.value}
						icon={<IoPhonePortraitOutline />}
						onCommit={(e, v, k) => handleSettingsChange('case', v, k)}
						onOpen={openMenu}
						options={config.cases}
					/>
					<SettingsItemRange
						label="Zoom"
						icon={<BsZoomIn />}
						value={settings.zoom}
						min={0.5}
						max={1}
						step={0.1}
						onCommit={(e, v) => handleSettingsChange('zoom', v)}
					/>
				</SettingsCategory>

				<SettingsCategory title="Toque">
					<SettingsItemToggle
						label={'Toque'}
						icon={<GiSoundOn />}
						value={settings.ringtoneEnabled}
						onCommit={(e, v) => handleSettingsChange('ringtoneEnabled', v)}
					/>
					<SettingsItemSelect
						title="Som do toque"
						label={settings.ringtoneSound.label}
						value={settings.ringtoneSound.value}
						icon={<IoMusicalNotesSharp />}
						onOpen={openMenu}
						onCommit={(e, v, k) => handleSettingsChange('ringtoneSound', v, k)}
						options={[
							{
								label: 'Lo-fi',
								value: 'lofi',
							},
						]}
					/>
					<SettingsItemRange
						label="Volume da notificação"
						icon={<IoVolumeHigh />}
						value={settings.ringtoneSoundVolume}
						min={1}
						max={100}
						step={1}
						onCommit={(e, v) => handleSettingsChange('ringtoneSoundVolume', parseInt(v as string))}
					/>
				</SettingsCategory>

				<SettingsCategory title="Notificações">
					<SettingsItemToggle
						label={'Notificações'}
						icon={<IoNotifications />}
						value={settings.notificationEnabled}
						onCommit={(e, v) => handleSettingsChange('notificationEnabled', v)}
					/>
					<SettingsItemSelect
						title="Som de notificação"
						label={settings.notificationSound.label}
						value={settings.notificationSound.value}
						icon={<IoMusicalNotesSharp />}
						onOpen={openMenu}
						onCommit={(e, v, k) => handleSettingsChange('notificationSound', v, k)}
						options={[
							{
								label: 'Padrão',
								value: 'default',
							},
							{
								label: 'Killua',
								value: 'killuahumble',
							},
						]}
					/>
					<SettingsItemRange
						label="Volume da notificação"
						icon={<IoVolumeHigh />}
						value={settings.notificationSoundVolume}
						min={1}
						max={100}
						step={1}
						onCommit={(e, v) => handleSettingsChange('notificationSoundVolume', parseInt(v as string))}
					/>
				</SettingsCategory>
				<ContextMenu />
			</GenericBody>
		</GenericApp>
	);
};

export default SettingsApp;
