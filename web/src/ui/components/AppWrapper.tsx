import React, { CSSProperties } from 'react';

import { useNotifications } from '@os/notification/hooks/useNotifications';

export interface AppWrapperTypes {
	id?: string;
	style?: CSSProperties;
	className?: string;
	handleClickAway?: (...args: unknown[]) => void;
}

const AppWrapper: React.FC<AppWrapperTypes> = ({ children, style, className, ...props }) => {
	const { barUncollapsed, setBarUncollapsed } = useNotifications();

	return (
		<div
			{...props}
			className={`relative m-0 flex h-full w-full flex-col p-0 ${className ?? ''}`}
			style={style}
			onClick={() => !barUncollapsed && setBarUncollapsed(true)}
		>
			{children}
		</div>
	);
};

export default AppWrapper;
