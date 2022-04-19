import React, { useState } from 'react';

import { SettingOption } from '@typings/settings';
import ContextMenu, { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

export type UseSystemContextMenu = {
	openMenu: () => void;
	setOptions: (opts: IContextMenuOption[]) => void;
	closeMenu: () => void;
	ContextMenu: () => JSX.Element;
	isOpen: boolean;
};

const MapStringOptions = (current: string, onClick: (params: unknown) => unknown) => (item: string) => ({
	key: item,
	label: item,
	selected: current === item,
	onClick: () => onClick(item),
});

const MapSettingItem = (current: SettingOption, onClick: (params: unknown) => unknown) => (item: SettingOption) => ({
	key: item.value,
	label: item.label,
	selected: current.value === item.value,
	onClick: () => onClick(item),
});

const useSystemContextMenu = (title?: string, _options?: IContextMenuOption[]): UseSystemContextMenu => {
	const [open, setOpen] = useState(false);
	const [currentOptions, setCurrentOptions] = useState<IContextMenuOption[]>([]);

	const openMenu = (opts?: IContextMenuOption[]) => {
		if (_options) setCurrentOptions(_options);
		if (opts) setCurrentOptions(opts);

		setOpen(true);
	};

	const closeMenu = () => open && setOpen(false);
	const _setOptions = (opts: IContextMenuOption[]) => setCurrentOptions(opts);

	return {
		openMenu,
		setOptions: _setOptions,
		closeMenu,
		ContextMenu: () => <ContextMenu isOpen={open} onClose={closeMenu} options={currentOptions} title={title} />,
		isOpen: open,
	};
};

export { useSystemContextMenu, MapStringOptions, MapSettingItem };
