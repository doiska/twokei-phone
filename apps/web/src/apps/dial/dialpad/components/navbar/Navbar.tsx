import React from "react";
import { IoMdPaper } from "react-icons/io";
import { IoCallOutline, IoPeopleOutline } from "react-icons/io5";

import useNavigation from "@os/hooks/useNavigation";

import { NavbarItem } from "@apps/dial/dialpad/components/navbar/NavbarItem";


export const Navbar: React.FC = () => {
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
					<IoCallOutline/>
				</NavbarItem>
				<NavbarItem {...isActive('contacts')}>
					<IoPeopleOutline/>
				</NavbarItem>
				<NavbarItem {...isActive('recent')}>
					<IoMdPaper/>
				</NavbarItem>
			</div>
		</div>
	);
};
