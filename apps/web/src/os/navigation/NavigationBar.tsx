import React from 'react';
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
		onSingleClick: () => canNavigate() && goBack(),
		onDoubleClick: () => canNavigate() && goTo('/'),
		delay: 150,
	});

	const canNavigate = (target?: string) => {
		if (isDisabled) return false;
		if (!barUncollapsed) {
			setBarUncollapsed((curr) => !curr);
			return false;
		}

		if (pathname.toLowerCase() === target) return false;

		return true;
	};

	return (
		<div className="absolute bottom-0 z-[999] mb-0.5 flex h-[2%] w-full basis-[2%] items-center justify-center">
			<div
				className="h-[25%] w-[45%] cursor-pointer rounded-full bg-zinc-400"
				onClick={click}
			/>
		</div>
	);
};

export default NavigationBar;
