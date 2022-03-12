import AppElement from "@os/apps/components/AppRoute";
import AppWrapper from "@ui/components/AppWrapper";
import { FaWhatsapp } from "react-icons/fa";
import { FcSettings } from 'react-icons/fc';
import { IconType } from "react-icons/lib";

import SettingsApp from '@apps/Settings/SettingsApp';
import React from "react";

export interface IApp {
    id: string;
    locale: string;
    disable?: boolean;
    path: string;
    icon?: JSX.Element,
    color?: string,
    AppElement: React.FC;
}

export const AllApps: IApp[] = [
    {
        id: 'WHATSAPP',
        locale: 'APPS_WHATSAPP',
        disable: false,
        path: 'whatsapp',
        icon: <FaWhatsapp className="text-green-600" />,
        AppElement: () => <AppElement id="WHATSAPP" emitOnOpen={false} component={tes}></AppElement>,
    },
    {
        id: 'SETTINGS',
        locale: 'APPS_SETTINGS',
        disable: false,
        path: 'settings',
        icon: <FcSettings />,
        AppElement: () => <AppElement id="SETTINGS" emitOnOpen={false} component={SettingsApp} />
    }
]

export const Apps: IApp[] = AllApps.filter(({ disable }) => !disable);

const tes = () => <span>test</span>
