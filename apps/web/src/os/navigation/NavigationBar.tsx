import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { SiLibrariesdotio } from 'react-icons/si';
import { useLocation } from 'react-router-dom';

import useNavigation from '@os/hooks/useNavigation';
import { useNotifications } from '@os/notification/hooks/useNotifications';

import { useNavigationDisabledValue } from './navigation.state';

const NavigationBar: React.FC = () => {
	const { goTo, goBack } = useNavigation();
	const isDisabled = useNavigationDisabledValue();
	const { pathname } = useLocation();

	const { barUncollapsed, setBarUncollapsed } = useNotifications();

	const navigateTo = (target: string | number) => {
		if (isDisabled) return;

		if (!barUncollapsed) setBarUncollapsed((curr) => !curr);

		if (pathname.toLowerCase() !== target) goTo(target);
	};

	return (
		<div className="z-[999] flex h-[6%] w-full basis-[6%] items-center justify-between place-self-end px-12 text-lg text-white">
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<SiLibrariesdotio />
			</a>
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<RiCheckboxBlankCircleLine onClick={() => navigateTo('/')} />
			</a>
			<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
				<IoChevronBack onClick={() => goBack()} />
			</a>
		</div>
	);
};

export default NavigationBar;
