import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { UseContextMenu, useContextMenu } from '@ui/hooks/useContextMenu';

import useNavigation from '@os/hooks/useNavigation';

const MessagesHomeNavbarIcon = (): UseContextMenu => {
	const { goTo } = useNavigation();

	const actions = [
		{
			label: 'Perfil',
			onCommit: () => goTo('profile/edit'),
		},
	] as IContextMenuOption[];

	return useContextMenu('', actions);
};

export default MessagesHomeNavbarIcon;
