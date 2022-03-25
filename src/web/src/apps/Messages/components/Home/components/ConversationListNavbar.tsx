import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import usePromptMenu from '@ui/hooks/usePromptMenu';

import { useCheckedConversations, useFilterValueState, useIsEditing } from '@apps/Messages/hooks/state';
import { useMessageAPI } from '@apps/Messages/hooks/useMessageAPI';

const ConversationListNavbar: React.FC = () => {
	const navigate = useNavigate();

	const { removeConversation } = useMessageAPI();
	const { openMenu: openDeleteMenu, ContextMenu } = usePromptMenu(
		() => removeConversation(checkedConversation),
		() => {
			setCheckedConversation([]);
			setEditing(false);
		}
	);

	const [checkedConversation, setCheckedConversation] = useCheckedConversations();

	const [isEditing, setEditing] = useIsEditing();
	const toggleEdit = () => setEditing((prev) => !prev);

	const [searchValue, setSearchValue] = useFilterValueState();
	const [showSearch, setShowSearch] = useState<boolean>(searchValue !== '');

	return (
		<>
			<div className="flex flex-1 flex-row items-center gap-2 px-3 text-lg">
				<span className="basis-[50%] text-white drop-shadow-2xl">WhatsApp</span>
				<input
					style={{ opacity: showSearch ? '1' : '0' }}
					className="bg-whatsapp-teal rounded-md px-1 py-0.5 text-base text-white transition-all duration-150 placeholder:text-white focus:outline-none"
					placeholder="Pesquisar contato"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<div className="flex flex-1 flex-row justify-end gap-2">
					<AiOutlineSearch
						onClick={() => setShowSearch((curr) => !curr)}
						className="cursor-pointer place-self-center"
						size={'22px'}
					/>
					<BiEdit onClick={() => toggleEdit()} className="cursor-pointer place-self-center" size={'22px'} />
					{isEditing && (
						<TiDeleteOutline
							className="cursor-pointer place-self-center rounded-full"
							size={'24px'}
							onClick={() => openDeleteMenu()}
						/>
					)}
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
			<ContextMenu />
		</>
	);
};

export default ConversationListNavbar;
