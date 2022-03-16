import React, { useState } from 'react';

import { SettingOption } from '@typings/settings';
import ContextMenu, { IContextMenuOption } from '@ui/components/ContextMenu';

type UseContextMenu = [(opts?: IContextMenuOption[]) => void, () => void, () => JSX.Element, boolean];

const MapStringOptions = (current: string, onClick: (params: unknown) => unknown) => (item: string) => ({
	selected: current === item,
	onClick: () => onClick(item),
	key: item,
	label: item,
});

const MapSettingItem = (current: SettingOption, onClick: (params: unknown) => unknown) => (item: SettingOption) => ({
	selected: current.value === item.value,
	onClick: () => onClick(item),
	key: item.value,
	label: item.label,
});

const useContextMenu = (_options?: IContextMenuOption[]): UseContextMenu => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState(_options ?? []);

	const onClose = () => setOpen(false);

	const onOpen = (opts?: IContextMenuOption[]) => {
		console.log(opts);
		setOptions(opts ?? []);
		setOpen(true);
	};

	return [onOpen, onClose, () => <ContextMenu open={open} onClose={onClose} options={options} />, open];
};

export { useContextMenu, MapStringOptions, MapSettingItem };
