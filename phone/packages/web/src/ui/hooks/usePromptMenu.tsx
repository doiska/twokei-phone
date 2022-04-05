import React from 'react';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

import { useContextMenu } from './useContextMenu';

const usePromptMenu = (onConfirm?: () => void, onDeny?: () => void, options?: IContextMenuOption[]) => {
	const context = useContextMenu('Deseja continuar?', [
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
	]);

	return { ...context };
};

export default usePromptMenu;
