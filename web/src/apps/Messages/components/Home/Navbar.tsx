import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { MainHeader } from '@apps/Messages/MessagesApp.styles';

const Navbar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<MainHeader>
			<div className="flex flex-1 flex-row items-center px-3 text-lg">
				<span className="basis-[80%] text-white drop-shadow-2xl">WhatsApp</span>
				<div className="flex flex-1 flex-row justify-end">
					<AiOutlineSearch className="place-self-center" size={'22px'} />
					<BsThreeDotsVertical className="place-self-center" size={'22px'} />
				</div>
			</div>
			<div className="tabs w-full basis-[40%] justify-around text-white">
				<a className={`tab w-1/3 text-gray-200`} onClick={() => navigate('/')}>
					Conversas
				</a>
				<a className={`tab w-1/3 text-gray-300`} onClick={() => navigate('status')}>
					Status
				</a>
				<a className={`tab w-1/3 text-gray-300`} onClick={() => navigate('calls')}>
					Chamadas
				</a>
			</div>
		</MainHeader>
	);
};

export default Navbar;
