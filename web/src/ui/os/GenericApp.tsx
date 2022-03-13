import React from 'react';

type Props = {
	className?: string;
};

const GenericApp: React.FC<Props> = ({ children, className }) => {
	return <div className={`flex h-full w-full flex-col bg-zinc-900 ${className ?? ''}`}>{children}</div>;
};

export default GenericApp;
