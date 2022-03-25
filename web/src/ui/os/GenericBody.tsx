import React from 'react';

const GenericBody: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={`w-full basis-[90%] ${className ?? ''}`} {...props}>
			{children}
		</div>
	);
};

export default GenericBody;
