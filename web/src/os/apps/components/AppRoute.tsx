import React from 'react';
import AppWithFetch from './AppWithFetch';

type AppElementParams = {
	id: string;
	emitOnOpen: boolean;
	component: React.FC<any>;
};

const AppWrapperLazy = React.lazy(() => import('@ui/components/AppWrapper'));

const AppElement: React.FC<AppElementParams> = ({ id, emitOnOpen, component: Component, ...rest }) => {
	return (
		<AppWithFetch id={id} emitOnOpen={emitOnOpen}>
			<AppWrapperLazy>
				<Component />
			</AppWrapperLazy>
		</AppWithFetch>
	);
};

export default AppElement;
