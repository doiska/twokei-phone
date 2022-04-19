import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

import { useSystemContextMenu } from './useSystemContextMenu';

const usePromptMenu = (onConfirm?: () => void, onDeny?: () => void, options?: IContextMenuOption[]) => {
	const context = useSystemContextMenu(
		'Deseja continuar?',
		options || [
			{
				key: 'confirm',
				label: 'Confirmar',
				onCommit: () => onConfirm?.(),
			},
			{
				key: 'cancel',
				label: 'Cancelar',
				onCommit: () => onDeny?.(),
			},
		]
	);

	return { ...context };
};

export default usePromptMenu;
