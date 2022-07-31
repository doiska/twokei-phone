import React from "react";

export const NavbarItem: React.FC<{ active?: boolean }> = ({ children, active, ...props }) => {
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