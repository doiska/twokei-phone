import React, { useState } from 'react';

import { SettingOption } from '@typings/settings';
import ContextMenu, { IContextMenuOption } from '@ui/components/contextMenu/ContextMenu';

export type UseContextMenu = {
	openMenu: (opts?: IContextMenuOption[]) => void;
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

const useContextMenu = (errorMsg?: string, _options?: IContextMenuOption[]): UseContextMenu => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState(_options ?? []);

	const openMenu = (opts?: IContextMenuOption[]) => {
		if (opts) setOptions(opts);
		setOpen(true);
	};

	const _setOptions = (opts: IContextMenuOption[]) => setOptions(opts);

	const closeMenu = () => open && setOpen(false);

	return {
		openMenu,
		setOptions: _setOptions,
		closeMenu,
		ContextMenu: () => <ContextMenu isOpen={open} onClose={closeMenu} options={options} errorMsg={errorMsg} />,
		isOpen: open,
	};
};

export { useContextMenu, MapStringOptions, MapSettingItem };
