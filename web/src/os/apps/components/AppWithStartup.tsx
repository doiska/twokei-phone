import { memo, useEffect } from 'react';
import fetchNui from '@utils/fetchNui';

const Component: React.FC<{ children: any, id: string, emitOnOpen: boolean }> = ({ children, id, emitOnOpen }) => {
    useEffect(() => {
        if (emitOnOpen) fetchNui(`twokei-phone:app:${id}`, undefined, {});
    }, [id, emitOnOpen]);
    return children;
};

const AppWithStartup = memo(Component, () => true);

export default AppWithStartup;