import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import OptionIcon from '@ui/components/OptionIcon';
import { useContextMenu } from '@ui/hooks/useContextMenu';

const ConversationListIconContext: React.FC = () => {
	const navigate = useNavigate();

	const actions = [
		{
			label: 'Conversa',
			onCommit: () => navigate('conversations/add/conversation'),
		},
		{
			label: 'Grupo',
			onCommit: () => navigate('conversations/add/group'),
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
