import AppWrapper from "@ui/components/AppWrapper";
import React from "react";
import AppWithStartup from "./AppWithStartup";

type AppElementParams = {
    id: string,
    emitOnOpen: boolean,
    component: React.FC<any>,
}

const AppWrapperLazy = React.lazy(() => import('@ui/components/AppWrapper'));

const AppElement: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component, ...rest }) => {
    return (
        <AppWithStartup id={id} emitOnOpen={emitOnOpen}>
            <AppWrapperLazy>
                <Component />
            </AppWrapperLazy>
        </AppWithStartup>
    )
}

export default AppElement;