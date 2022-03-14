import React, { CSSProperties } from 'react';

export interface AppWrapperTypes {
	id?: string;
	style?: CSSProperties;
	className?: string;
	handleClickAway?: (...args: any[]) => void;
}

const AppWrapper: React.FC<AppWrapperTypes> = ({ children, style, handleClickAway, className, ...props }) => {
	return (
		<div {...props} className={`relative m-0 flex h-full w-full flex-col p-0  ${className ?? ''}`} style={style ?? {}}>
			{children}
		</div>
	);
};

export default AppWrapper;
