import React from 'react';
import { IoMdPaper } from 'react-icons/io';
import { IoCallOutline, IoPeopleOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import useNavigation from '@os/hooks/useNavigation';

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<div className={`flex h-full w-full flex-col ${className}`} {...props}>
			{children}
		</div>
	);
};

const ContainerWithNavbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<>
			<Container className={`${className} basis-[90%]`} {...props}>
				{children}
			</Container>
			<Navbar />
		</>
	);
};

const NavbarItem: React.FC<{ active?: boolean }> = ({ children, active, ...props }) => {
	return (
		<span
			className={`cursor-pointer rounded-md fill-white p-2 text-3xl text-white shadow-md transition-all hover:bg-white hover:bg-opacity-20 ${
				active && 'bg-white bg-opacity-30'
			}`}
			{...props}
		>
			{children}
		</span>
	);
};

const Navbar: React.FC = () => {
	const { goTo, match } = useNavigation();

	const isActive = (route: string) => {
		return {
			active: match(route),
			onClick: () => !match(route) && goTo(route),
		};
	};

	return (
		<div className="mb-2 flex w-full basis-[10%] justify-center py-2">
			<div className="flex h-full w-[70%] flex-row items-center justify-around rounded-lg">
				<NavbarItem {...isActive('dial')}>
					<IoCallOutline />
				</NavbarItem>
				<NavbarItem {...isActive('contacts')}>
					<IoPeopleOutline />
				</NavbarItem>
				<NavbarItem {...isActive('recent')}>
					<IoMdPaper />
				</NavbarItem>
			</div>
		</div>
	);
};

export { Container, ContainerWithNavbar, Navbar, NavbarItem };
