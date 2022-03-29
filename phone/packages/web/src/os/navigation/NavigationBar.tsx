import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { SiLibrariesdotio } from 'react-icons/si';
import { useNavigate, useLocation, To } from 'react-router-dom';

import { useNotifications } from '@os/notification/hooks/useNotifications';

import { useNavigationDisabledValue } from './navigation.state';

const NavigationBar: React.FC = () => {
	const navigate = useNavigate();
	const isDisabled = useNavigationDisabledValue();
	const { pathname } = useLocation();

	const { barUncollapsed, setBarUncollapsed } = useNotifications();

	const navigateTo = (target: To | number) => {
		if (isDisabled) return;

		if (!barUncollapsed) setBarUncollapsed((curr) => !curr);

		if (pathname === '/' && target === -1) return;

		if (pathname.toLowerCase() !== target) navigate(target as To);
	};

	return (
		<div className="z-[999] flex h-[6%] w-full basis-[6%] items-center justify-between place-self-end px-12 text-lg text-white backdrop-blur-md">
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<SiLibrariesdotio />
			</a>
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<RiCheckboxBlankCircleLine onClick={() => navigateTo('/')} />
			</a>
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<IoChevronBack onClick={() => navigateTo(-1)} />
			</a>
		</div>
	);
};

export default NavigationBar;
