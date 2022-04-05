import React from 'react';

import AppWithFetch from './AppWithFetch';

type AppElementParams = {
	id: string;
	emitOnOpen: boolean;
	component: React.FC;
};

const AppRoute: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component }) => {
	return (
		<AppWithFetch id={id} emitOnOpen={emitOnOpen}>
			<Component />
		</AppWithFetch>
	);
};

export default AppRoute;
