import React from 'react';
import { AiOutlineNotification, AiOutlineSound } from 'react-icons/ai';

import { useContextMenu } from '@ui/hooks/useContextMenu';
import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';

import { SettingsItemSelect, SettingsItemToggle } from './components/SettingItem';
import SettingsCategory from './components/SettingsCategory';
import { useSettings } from './hooks/useSettings';

const SettingsApp: React.FC = () => {
	const [settings, setSettings] = useSettings();
	const [openMenu, closeMenu, ContextMenu, isMenuOpen] = useContextMenu();

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

	/**
    language: string;
    wallpaper: SettingOption;
    case: SettingOption;
    zoom: number;

    ringtoneEnabled: boolean;
    ringtoneSound: SettingOption;
    ringtoneVolume: number;

    callVolume: number;

    notificationEnabled: boolean;
    notificationSound: SettingOption;
    notificationSoundVolume: number;
     */

	return (
		<GenericApp>
			<GenericHeader title="Configurações" />
			<GenericBody>
				<SettingsCategory>
					<SettingsItemToggle
						label={'Notificações'}
						icon={<AiOutlineNotification />}
						value={settings.notificationEnabled}
						onCommit={(e, v) => handleSettingsChange('notificationEnabled', v)}
					/>
					<SettingsItemSelect
						label={'Som de notificação'}
						value={settings.notificationSound.label}
						icon={<AiOutlineSound />}
						onCommit={(e, v, k) => handleSettingsChange('notificationSound', v, k)}
						onOpen={openMenu}
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
				</SettingsCategory>
				{<ContextMenu />}
			</GenericBody>
		</GenericApp>
	);
};

export default SettingsApp;
