
import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { UseContextMenu, useContextMenu } from '@ui/hooks/useContextMenu';

import useNavigation from '@os/hooks/useNavigation';

const ConversationListIconContext = (conversationId: string | undefined): UseContextMenu => {
	const { goTo } = useNavigation();

	const actions = [
		{
			label: 'Detalhes',
			onCommit: () => goTo(`/messages/conversations/details/${conversationId}`),
		},
		{
			label: 'Configurações',
			onCommit: () => goTo(`/messages/conversations/settings/${conversationId}`),
		},
	] as IContextMenuOption[];

	return useContextMenu('', conversationId ? actions : []);
};

export default ConversationListIconContext;
