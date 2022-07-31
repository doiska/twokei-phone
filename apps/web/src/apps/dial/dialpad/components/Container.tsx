import React from "react";

import { Navbar } from "@apps/dial/dialpad/components/navbar/Navbar";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<div className={`flex h-full w-full flex-col ${className}`} {...props}>
			{children}
		</div>
	);
};

export const ContainerWithNavbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<>
			<Container className={`${className} basis-[90%]`} {...props}>
				{children}
			</Container>
			<Navbar/>
		</>
	);
};