import AppElement from "@os/apps/components/AppRoute";
import { FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons/lib";
export interface IApp {
    id: string;
    locale: string;
    disable?: boolean;
    path: string;
    icon?: JSX.Element,
    color?: string,
    AppElement: React.FC;
}

export const Apps: IApp[] = [
    {
        id: 'WHATSAPP',
        locale: 'APPS_WHATSAPP',
        disable: false,
        path: 'whatsapp',
        icon: <FaWhatsapp className="text-green-600" />,
        AppElement: () => <AppElement id="WHATSAPP" emitOnOpen={false} component={tes}></AppElement>,
    }
]

const tes = () => <div className="text-white">tes</div>
const teste = () => <div>teste</div>