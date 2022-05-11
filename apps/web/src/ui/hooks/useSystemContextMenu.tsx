import React, { useState } from 'react';

import { SettingOption } from '@typings/settings';
import ContextMenu, { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

export type UseSystemContextMenu = {
	openMenu: (opts?: IContextMenuOption[], title?: string) => void;
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

const useSystemContextMenu = (_title?: string, _options?: IContextMenuOption[]): UseSystemContextMenu => {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(_title ?? '');
	const [currentOptions, setCurrentOptions] = useState<IContextMenuOption[]>([]);

	const openMenu = (opts?: IContextMenuOption[], title?: string) => {
		if (_options) setCurrentOptions(_options);
		if (opts) setCurrentOptions(opts);
		if (title) setTitle(title);

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