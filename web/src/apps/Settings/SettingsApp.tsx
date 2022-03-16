import React from 'react';
import { AiOutlineSound, AiOutlineZoomIn } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';

import { useContextMenu } from '@ui/hooks/useContextMenu';
import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';

import { SettingsItemRange, SettingsItemSelect, SettingsItemToggle } from './components/SettingItem';
import SettingsCategory from './components/SettingsCategory';
import { useSettings } from './hooks/useSettings';

const SettingsApp: React.FC = () => {
	const [settings, setSettings] = useSettings();
	const [openMenu, closeMenu, ContextMenu, isMenuOpen] = useContextMenu();

	const handleSettingsChange = (key: string | number, value: unknown) => {
		if (typeof value === 'string') {
			const splited = value.split('-');
			if (splited.length > 1) {
				value = {
					label: splited[0],
					value: splited[1],
				};
			}
			console.log(value);
		}

		setSettings({ ...settings, [key]: value });
	};

	/**
        language: SettingOption;
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
				<SettingsCategory title="Dispositivo" key={'Device'}>
					<SettingsItemSelect
						onOpen={openMenu}
						label={'Language'}
						value={settings.language}
						icon={<IoIosNotificationsOutline />}
						onCommit={(e, val) => handleSettingsChange('language', val)}
						options={[
							{
								label: 'Português',
								value: 'pt_BR',
							},
							{
								label: 'English',
								value: 'en_US',
							},
						]}
					/>
					<SettingsItemSelect
						onOpen={openMenu}
						label={'Case'}
						value={settings.case.value}
						icon={<BsPhone />}
						onCommit={(e, val) => handleSettingsChange('case', val)}
						options={[
							{
								label: 'Padrão',
								value: 'default.png',
							},
						]}
					/>
					<SettingsItemRange
						label={'Zoom'}
						value={settings.zoom}
						icon={<AiOutlineZoomIn />}
						onCommit={(e, val) => handleSettingsChange('zoom', val)}
						min={0.5}
						max={1}
						step={0.1}
					/>
				</SettingsCategory>
				<SettingsCategory title="Mensagens" key={'Messages'}>
					<SettingsItemToggle
						label={'Receber notificações'}
						value={settings.notificationEnabled}
						icon={<IoIosNotificationsOutline />}
						onCommit={(e, val) => handleSettingsChange('notificationEnabled', val)}
					/>
					<SettingsItemRange
						label={'Volume da notificação'}
						value={settings.ringtoneVolume}
						icon={<AiOutlineSound />}
						onCommit={(e, val) => handleSettingsChange('notificationSoundVolume', val)}
					/>
					<SettingsItemSelect
						onOpen={openMenu}
						label={'Som da notificação'}
						value={settings.notificationSound.value}
						icon={<IoIosNotificationsOutline />}
						onCommit={(e, val) => handleSettingsChange('notificationSound', val)}
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
				<SettingsCategory title="Chamadas" key={'Calls'}>
					<SettingsItemRange
						label={'Volume do toque'}
						value={settings.ringtoneVolume}
						icon={<AiOutlineSound />}
						onCommit={(e, val) => handleSettingsChange('ringtoneVolume', val)}
					/>
					<SettingsItemSelect
						onOpen={openMenu}
						label={'Som do toque'}
						value={settings.notificationSound.value}
						icon={<IoIosNotificationsOutline />}
						onCommit={(e, val) => handleSettingsChange('ringtone', val)}
						options={[
							{
								label: 'Padrão',
								value: 'default',
							},
							{
								label: 'Lo-fi',
								value: 'lofi',
							},
						]}
					/>
				</SettingsCategory>
				<ContextMenu />
			</GenericBody>
		</GenericApp>
	);
};

export default SettingsApp;
