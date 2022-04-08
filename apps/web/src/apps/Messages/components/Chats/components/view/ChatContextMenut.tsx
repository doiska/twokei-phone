import { useNavigate } from 'react-router-dom';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { UseContextMenu, useContextMenu } from '@ui/hooks/useContextMenu';

const ConversationListIconContext = (conversationId: string | undefined): UseContextMenu => {
	const navigate = useNavigate();

	const actions = [
		{
			label: 'Detalhes',
			onCommit: () => navigate(`/messages/conversations/details/${conversationId}`),
		},
		{
			label: 'Configurações',
			onCommit: () => navigate(`/messages/conversations/settings/${conversationId}`),
		},
	] as IContextMenuOption[];

	return useContextMenu('', conversationId ? actions : []);
};

export default ConversationListIconContext;
