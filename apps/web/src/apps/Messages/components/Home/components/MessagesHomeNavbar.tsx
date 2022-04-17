import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { GrMoreVertical } from 'react-icons/gr';
import { TiDeleteOutline } from 'react-icons/ti';

import usePromptMenu from '@ui/hooks/usePromptMenu';

import useNavigation from '@os/hooks/useNavigation';

import { useCheckedConversations, useFilterValueState, useIsEditing } from '@apps/messages/hooks/messages/messageState';
import { useMessageAPI } from '@apps/messages/hooks/messages/useMessageAPI';

import MessagesHomeNavbarIcon from './MessagesHomeNavbarIcon';

const ConversationListNavbar: React.FC = () => {
	const { goTo } = useNavigation();

	const [checkedConversation, setCheckedConversation] = useCheckedConversations();

	const [isEditing, setEditing] = useIsEditing();
	const toggleEdit = () => setEditing((prev) => !prev);

	const [searchValue, setSearchValue] = useFilterValueState();
	const [showSearch, setShowSearch] = useState<boolean>(searchValue !== '');

	const { removeConversation } = useMessageAPI();

	const handleConfirmRemove = () => {
		removeConversation(checkedConversation);
		setCheckedConversation([]);
		setEditing(false);
	};

	const handleCancelRemove = () => {
		setEditing(false);
	};

	const { openMenu: openDeleteMenu, ContextMenu: ContextDeleteMenu } = usePromptMenu(
		handleConfirmRemove,
		handleCancelRemove
	);

	const { ContextMenu: ContextEditMenu, openMenu: openConfigMenu } = MessagesHomeNavbarIcon();

	return (
		<>
			<div className="flex w-full flex-1 flex-row items-center gap-2 px-3 text-lg">
				<span className="basis-[30%] text-white drop-shadow-2xl">WhatsApp</span>
				<input
					style={{ opacity: showSearch ? '1' : '0' }}
					className="bg-whatsapp-teal w-full rounded-md px-1 py-0.5 text-base text-white transition-all duration-150 placeholder:text-white"
					placeholder="Pesquisar contato"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<div className="flex flex-1 flex-row gap-2">
					<AiOutlineSearch
						onClick={() => setShowSearch((curr) => !curr)}
						className="cursor-pointer place-self-center"
						size={'22px'}
					/>
					<BiEdit onClick={() => toggleEdit()} className="cursor-pointer place-self-center" size={'22px'} />
					<GrMoreVertical
						className="cursor-pointer place-self-center"
						onClick={() => openConfigMenu()}
						size={'22px'}
					/>
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
				<a className={`tab w-1/3 text-gray-200`} onClick={() => goTo('/')}>
					Conversas
				</a>
				<a className={`tab w-1/3 text-gray-300`} onClick={() => goTo('status')}>
					Status
				</a>
				<a className={`tab w-1/3 text-gray-300`} onClick={() => goTo('calls')}>
					Chamadas
				</a>
			</div>
			<ContextEditMenu />
			<ContextDeleteMenu />
		</>
	);
};

export default ConversationListNavbar;
