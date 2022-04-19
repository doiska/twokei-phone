import React from 'react';

import { HTMLAttributes } from '@typings/core';

const Navbar: React.FC<HTMLAttributes> = ({ children, className, ...props }) => {
	return (
		<div className={`absolute bottom-10 mb-2 flex w-full basis-[10%] justify-center py-2 ${className}`} {...props}>
			{children}
		</div>
	);
};

const NavbarItemGrid: React.FC<HTMLAttributes> = ({ children, className, ...props }) => {
	return (
		<div {...props} className={`flex h-full w-[70%] flex-row items-center justify-around rounded-lg ${className}`}>
			{children}
		</div>
	);
};

const NavbarItem: React.FC<HTMLAttributes> = ({ children, className, ...props }) => {
	return (
		<span
			className={`cursor-pointer rounded-md fill-white p-2 text-3xl text-white transition-all ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};

export { Navbar, NavbarItemGrid, NavbarItem };
