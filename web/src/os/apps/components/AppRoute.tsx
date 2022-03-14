import React from 'react';

import AppWrapper from '@ui/components/AppWrapper';

import AppWithFetch from './AppWithFetch';

type AppElementParams = {
	id: string;
	emitOnOpen: boolean;
	component: React.FC<any>;
};

const AppElement: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component, ...rest }) => {
	return (
		<AppWithFetch id={id} emitOnOpen={emitOnOpen}>
			<AppWrapper>
				<Component />
			</AppWrapper>
		</AppWithFetch>
	);
};

export default AppElement;
