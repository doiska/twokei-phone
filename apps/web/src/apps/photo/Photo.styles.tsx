import React from 'react';

import { BaseNavbar } from '@ui/components/BaseNavbar';

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
	return (
		<div {...rest} className={`flex h-full w-full flex-col ${className}`}>
			{children}
		</div>
	);
};

const MainHeader: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
	return <div className="flex basis-[7%] flex-row items-center justify-center px-2 text-lg font-medium">{title}</div>;
};

const MainBody: React.FC<{ children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => (
	<div className={`flex flex-col ${rest.className} w-full flex-1`} {...rest}>
		{children}
	</div>
);

const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<BaseNavbar
		holder={{
			className: 'bg-[#272e3a] bg-opacity-90 py-2.5 text-2xl w-[60%] shadow-6xl text-white rounded-md',
		}}
	>
		{children}
	</BaseNavbar>
);

export { Container, MainHeader, MainBody, Navbar };
