import React from 'react';

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<div className={`flex h-full w-full flex-col items-center gap-6 ${className}`} {...props}>
			{children}
		</div>
	);
};

const ButtonGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
	<div className={`flex flex-row items-center justify-center gap-4 rounded-full ${className}`} {...props}>
		{children}
	</div>
);
const Button: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
	<div
		className={`flex cursor-pointer items-center justify-around fill-white text-3xl text-white ${className} text-center`}
		{...rest}
	>
		{children}
	</div>
);

const ButtonWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
	<div className={`flex flex-row items-center justify-center gap-2 ${className}`} {...props}>
		{children}
	</div>
);

export { Container, ButtonGrid, Button, ButtonWrapper };
