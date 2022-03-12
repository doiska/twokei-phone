import React from 'react'

import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';
import SettingsCategory from './components/SettingsCategory';
import { SettingsItemRange, SettingsItemSelect, SettingsItemToggle } from './components/SettingItem';

import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineSound } from 'react-icons/ai';
import { useSettings } from './hooks/useSettings';
import fetchNui from '@utils/fetchNui';

const SettingsApp: React.FC = () => {

    const [settings, setSettings] = useSettings();

    const handleSettingsChange = (key: string | number, value: unknown) => {
        setSettings({ ...settings, [key]: value });
    }

    /**
        language: SettingOption;
        wallpaper: SettingOption;
        case: SettingOption;
        zoom: number;

        ringtone: SettingOption;
        ringtoneVolume: number;

        callVolume: number;

        notificationEnabled: boolean;
        notificationSound: SettingOption;
        notificationSoundVolume: number;
     */

    return (
        <GenericApp className="bg-zinc-900">
            <GenericHeader title="Configurações" />
            <GenericBody>
                <SettingsCategory title='Dispositivo' key={"Device"}>
                    <SettingsItemSelect
                        label={'Language'}
                        value={settings.language}
                        icon={<IoIosNotificationsOutline />}
                        onCommit={(e, val) => handleSettingsChange('language', val)}
                        options={[
                            {
                                label: 'Português',
                                value: 'pt_BR'
                            },
                            {
                                label: 'English',
                                value: 'en_US'
                            }
                        ]}
                    />
                </SettingsCategory>
                <SettingsCategory title='Notificações' key={"Notifications"}>
                    <SettingsItemToggle
                        label={"Toggle"}
                        value={settings.notificationEnabled}
                        icon={<IoIosNotificationsOutline />}
                        onCommit={(e, val) => handleSettingsChange('notificationEnabled', val)}
                    />
                    <SettingsItemRange
                        label={"Range"}
                        value={settings.ringtoneVolume}
                        icon={<AiOutlineSound />}
                        onCommit={(e, val) => handleSettingsChange('ringtoneVolume', val)}
                    />
                </SettingsCategory>
            </GenericBody>
        </GenericApp>
    )
}

export default SettingsApp;