import { AppRoute } from "../os/components/AppRoute";

export interface IApp {
    id: string;
    locale: string;
    backgroundColor: string;
    color: string;
    path: string;
    disable?: boolean;
    Route: React.FC;
}

export const Apps: IApp[] = [

]