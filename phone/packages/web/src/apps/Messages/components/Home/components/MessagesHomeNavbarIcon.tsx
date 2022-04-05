import { useNavigate } from 'react-router-dom';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';
import { UseContextMenu, useContextMenu } from '@ui/hooks/useContextMenu';

const MessagesHomeNavbarIcon = (): UseContextMenu => {
	const navigate = useNavigate();

	const actions = [
		{
			label: 'Perfil',
			onCommit: () => navigate('profile/edit'),
		},
	] as IContextMenuOption[];

	return useContextMenu('', actions);
};

export default MessagesHomeNavbarIcon;
