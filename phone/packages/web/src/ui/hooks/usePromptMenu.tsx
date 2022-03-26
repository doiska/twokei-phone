import React from 'react';

import { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

import { UseContextMenu, useContextMenu } from './useContextMenu';

type UsePromptMenu = UseContextMenu & {
	onConfirm?: () => void;
	onDeny?: () => void;
};

const usePromptMenu = (onConfirm?: () => void, onDeny?: () => void, options?: IContextMenuOption[]): UsePromptMenu => {
	const context = useContextMenu(
		`Nenhuma opção informada.`,
		options ?? [
			{
				key: 'confirm',
				label: 'Confirmar',
				onClick: onConfirm,
			},
			{
				key: 'cancel',
				label: 'Cancelar',
				onClick: onDeny,
			},
		]
	);

	return {
		...context,
		onConfirm,
		onDeny,
	};
};

export default usePromptMenu;
