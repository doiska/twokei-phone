import React from 'react';

import AppWrapper from '@ui/components/AppWrapper';

import AppWithFetch from './AppWithFetch';

type AppElementParams = {
	id: string;
	emitOnOpen: boolean;
	component: React.FC;
};

const AppRoute: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component }) => {
	return (
		<AppWithFetch id={id} emitOnOpen={emitOnOpen}>
			<AppWrapper>
				<Component />
			</AppWrapper>
		</AppWithFetch>
	);
};

export default AppRoute;
