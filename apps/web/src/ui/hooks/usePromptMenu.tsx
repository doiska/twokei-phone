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

	const _openMenu = (title?: string, onConfirm?: () => void, onDeny?: () => void) => {
		if (onConfirm) {
			context.openMenu(
				[
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
				],
				title ?? 'Deseja continuar?'
			);
		} else {
			context.openMenu();
		}
	};

	return { ...context, openMenu: _openMenu };
};

export default usePromptMenu;
