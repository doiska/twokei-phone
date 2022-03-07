import React, { memo, useEffect } from 'React';
import { useNuiRequest } from 'fivem-nui-react-lib';

const Component: React.FC<{ children: any, id: string, emitOnOpen: boolean }> = ({ children, id, emitOnOpen }) => {
    const Nui = useNuiRequest();

    useEffect(() => {
        if (emitOnOpen) {
            Nui.send(`tk:app:${id}`);
        }
    }, [Nui, id, emitOnOpen]);
    return children;
}

const AppWithStartup = memo(Component, () => true);

export default AppWithStartup;