import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { useContactsValue } from '@apps/Contacts/hooks/contactsState';

const CreationNavbar: React.FC = () => {
	const navigate = useNavigate();
	const { type } = useParams();

	const contacts = useContactsValue();

	const goBack = () => navigate(-1);

	useEffect(() => {
		if (type !== 'conversation' && type !== 'group') navigate('/messages');
	}, []);

	return (
		<div className="flex flex-row items-center gap-4 px-2.5">
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<div className="flex h-full max-h-[100%] w-full flex-col place-content-center">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-semibold text-white">
						{type === 'conversation' ? 'Nova conversa' : 'Novo grupo'}
					</span>
				</div>
				<span className="text-sm font-light text-white">{contacts.length} contatos</span>
			</div>
			<div className="flex flex-row items-center gap-3 text-xl">
				<IoSearch className="cursor-pointer text-2xl" />
			</div>
		</div>
	);
};

export default CreationNavbar;
