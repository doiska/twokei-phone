import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';

import useNavigation from '@os/hooks/useNavigation';

import { useContactsValue } from '@apps/Contacts/hooks/contactsState';

const CreationNavbar: React.FC<{ isGroup: boolean }> = ({ isGroup }) => {
	const contacts = useContactsValue();

	const { goBack } = useNavigation();

	return (
		<div className="flex flex-row items-center gap-4 px-2.5">
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<div className="flex h-full max-h-[100%] w-full flex-col place-content-center">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-semibold text-white">{isGroup ? 'Novo grupo' : 'Nova conversa'}</span>
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
