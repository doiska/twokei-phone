import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { useSystemContextMenu } from '@ui/hooks/useSystemContextMenu';

import useNavigation from '@os/hooks/useNavigation';

const MessagesHomeNavbarIcon = () => {
	const { goTo } = useNavigation();

	const actions = [
		{
			label: 'Perfil',
			onCommit: () => goTo('profile/edit'),
		},
	] as IContextMenuOption[];

	return useSystemContextMenu('', actions);
};

export default MessagesHomeNavbarIcon;
