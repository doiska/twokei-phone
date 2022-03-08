import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppWithStartup from "./AppWithStartup";

type AppRouteParams = {
    id: string,
    emitOnOpen: boolean,
    component: React.FC<any>
}

const AppRoute: React.FC<AppRouteParams> = ({ id, emitOnOpen, component: Component, ...rest }) => {
    return (
        <Route {...rest} children={() => (
            <AppWithStartup id={id} emitOnOpen={emitOnOpen}>
                <Component />
            </AppWithStartup>
        )} />
    )
}

export default AppRoute;