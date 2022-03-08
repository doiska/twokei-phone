import React from "react";
import { Route } from "react-router-dom";
import AppWithStartup from "./AppWithStartup";

type AppElementParams = {
    id: string,
    emitOnOpen: boolean,
    component: React.FC<any>,
}

const AppElement: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component, ...rest }) => {
    return (<AppWithStartup id={id} emitOnOpen={emitOnOpen}><Component /></AppWithStartup>)
}

export default AppElement;