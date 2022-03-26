import React from 'react';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

import { UseContextMenu, useContextMenu } from './useContextMenu';

const usePromptMenu = (onConfirm?: () => void, onDeny?: () => void, options?: IContextMenuOption[]) => {
	const context = useContextMenu('Nenhuma opção informada', [
		{
			key: 'confirm',
			label: 'Confirmar',
			onClick: () => onConfirm?.(),
		},
		{
			key: 'cancel',
			label: 'Cancelar',
			onClick: () => onDeny?.(),
		},
	]);

	return { ...context };
};

export default usePromptMenu;
