import React from 'react';

import { FCWithChildren } from '@typings/ext';

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...rest
}) => (
	<div {...rest} className={`flex h-full w-full flex-col ${className}`}>
		{children}
	</div>
);

const MainHeader: React.FC<{ title: string; children?: React.ReactNode }> = ({
	title,
}) => {
	return (
		<div className="flex basis-[7%] flex-row items-center justify-center px-2 text-lg font-medium">
			{title}
		</div>
	);
};

const MainBody: FCWithChildren<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => (
	<div className={`flex flex-col ${rest.className} w-full flex-1`} {...rest}>
		{children}
	</div>
);

export { Container, MainHeader, MainBody };
