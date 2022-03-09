import AppElement from "@os/apps/components/AppRoute";
export interface IApp {
    id: string;
    locale: string;
    disable?: boolean;
    path: string;
    AppElement: React.FC;
}

export const Apps: IApp[] = [
    {
        id: 'WHATSAPP',
        locale: 'APPS_WHATSAPP',
        disable: false,
        path: 'whatsapp',
        AppElement: () => <AppElement id="WHATSAPP" emitOnOpen={false} component={tes}></AppElement>,
    }
]

const tes = () => <div className="text-white">tes</div>
const teste = () => <div>teste</div>