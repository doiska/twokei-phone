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
        if (!isDisabled)
            navigate(-1);
    }

    const callGoToMenu = () => {
        if (!isDisabled) {
            navigate('/');
        }
    }

    return (
        <div className='w-full h-[8%] relative inset-x-0 bottom-0 z-10 bg-neutral-800 text-large text-white shadow'>
            <div className='w-full h-full flex justify-between items-center px-12 text-lg'>
                <a className="focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center">
                    <SiLibrariesdotio />
                </a>
                <a className='focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center'>
                    <RiCheckboxBlankCircleLine onClick={callGoToMenu} />
                </a>
                <a className='focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center'>
                    <IoChevronBack onClick={callGoBack} />
                </a>
            </div>
        </div>
    )
}

export default NavigationBar;