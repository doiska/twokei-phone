import React from 'react';

import { Navbar as BaseNavbar, NavbarItemGrid } from '@ui/components/BaseNavbar';

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
	<BaseNavbar>
		<NavbarItemGrid className="shadow-6xl bg-shark w-[60%] rounded-md bg-opacity-90 py-2.5 text-2xl text-white">
			{children}
		</NavbarItemGrid>
	</BaseNavbar>
);

export { Container, MainHeader, MainBody, Navbar };
