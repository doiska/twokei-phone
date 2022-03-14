import { memo, useEffect } from 'react';

import fetchNui from '@utils/fetchNui';

const Component: React.FC<{ children: JSX.Element; id: string; emitOnOpen: boolean }> = ({ children, id, emitOnOpen }) => {
	useEffect(() => {
		if (emitOnOpen) fetchNui(`tkphone:app:${id}`, undefined, {});
	}, [id, emitOnOpen]);
	return children;
};

const AppWithFetch = memo(Component, () => true);

export default AppWithFetch;
