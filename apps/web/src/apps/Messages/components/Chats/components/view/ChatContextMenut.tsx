import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { useSystemContextMenu } from '@ui/hooks/useSystemContextMenu';

import useNavigation from '@os/hooks/useNavigation';

const ConversationListIconContext = (conversationId: string | undefined) => {
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

	return useSystemContextMenu('', conversationId ? actions : []);
};

export default ConversationListIconContext;
