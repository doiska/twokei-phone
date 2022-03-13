import React from 'react';

import { useNavigationDisabledValue } from './Navigation.state';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { SiLibrariesdotio } from 'react-icons/si';

const NavigationBar: React.FC = () => {
	const navigate = useNavigate();
	const isDisabled = useNavigationDisabledValue();
	const { pathname } = useLocation();

	console.log(pathname);

	const callGoBack = () => {
		if (!isDisabled) navigate(-1);
	};

	const callGoToMenu = () => {
		if (!isDisabled) {
			navigate('/');
		}
	};

	return (
		<div className="bg-neutral-800 text-large relative inset-x-0 bottom-0 z-10 h-[8%] w-full text-white shadow">
			<div className="flex h-full w-full items-center justify-between px-12 text-lg">
				<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
					<SiLibrariesdotio />
				</a>
				<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
					<RiCheckboxBlankCircleLine onClick={callGoToMenu} />
				</a>
				<a className="inline-block justify-center text-center hover:text-teal-500 focus:text-teal-500">
					<IoChevronBack onClick={callGoBack} />
				</a>
			</div>
		</div>
	);
};

export default NavigationBar;
