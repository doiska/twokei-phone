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
        path: '/whatsapp',
        AppElement: () => <AppElement id="WHATSAPP" emitOnOpen={false} component={test}></AppElement>,
    }
]

const test: React.FC = () => {
    return <div></div>
}