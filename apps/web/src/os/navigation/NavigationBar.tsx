import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { SiLibrariesdotio } from 'react-icons/si';
import { useLocation } from 'react-router-dom';

import useDoubleClick from '@os/hooks/useDoubleClick';
import useNavigation from '@os/hooks/useNavigation';
import { useNotifications } from '@os/notification/hooks/useNotifications';

import { useNavigationDisabledValue } from './navigation.state';

const NavigationBar: React.FC = () => {
	const { goTo, goBack } = useNavigation();
	const isDisabled = useNavigationDisabledValue();
	const { pathname } = useLocation();

	const { barUncollapsed, setBarUncollapsed } = useNotifications();
	const click = useDoubleClick({
		onSingleClick: () => goBack(),
		onDoubleClick: () => navigateTo('/'),
		delay: 150,
	});

	const navigateTo = (target: string | number) => {
		if (isDisabled) return;

		if (!barUncollapsed) setBarUncollapsed((curr) => !curr);

		if (pathname.toLowerCase() !== target) goTo(target);
	};

	return (
		<div className="absolute bottom-0 z-[999] my-1 flex h-[3%] w-full basis-[2%] items-center justify-center">
			<div className="h-[30%] w-[45%] cursor-pointer rounded-full bg-zinc-400" onClick={click} />
		</div>
	);
};

export default NavigationBar;
