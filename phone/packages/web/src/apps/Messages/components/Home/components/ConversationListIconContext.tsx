import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { useContextMenu } from '@ui/hooks/useContextMenu';

import { useContactsValue } from '@apps/Contacts/hooks/useContacts';

import OptionIcon from '../../Shared/OptionIcon';

const ConversationListIconContext: React.FC = () => {
	const navigate = useNavigate();

	const actions = [
		{
			label: 'Conversa',
			onClick: () => navigate('conversations/add/conversation'),
		},
		{
			label: 'Grupo',
			onClick: () => navigate('conversations/add/group'),
		},
	] as IContextMenuOption[];

	const { ContextMenu, openMenu } = useContextMenu('', actions);

	return (
		<>
			<OptionIcon icon={<MdAdd />} onClick={() => openMenu()} />
			<ContextMenu />
		</>
	);
};

export default ConversationListIconContext;
