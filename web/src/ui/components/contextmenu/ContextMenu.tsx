import React, { useRef } from 'react';

import useHandleOutsideClick from '@os/hooks/useHandleOutsideClick';

import ContextMenuItem from './ContextMenuItem';

export interface IContextMenuOption {
	key?: string;
	label?: string;
	value?: string;
	description?: string;
	selected?: boolean;
	icon?: React.ReactNode;
	onClick?(e: unknown, option: unknown): void;
}

interface ContextMenuProps {
	open: boolean;
	onClose: () => void;
	options: IContextMenuOption[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ open, options, onClose }) => {
	const context = useRef<HTMLDivElement>(null);

	useHandleOutsideClick(context, () => open && onClose());

	return (
		<>
			{open && (
				<div
					ref={context}
					className="absolute bottom-0 z-10 h-full w-full bg-zinc-900 bg-opacity-20 transition-all"
					style={{ display: open ? 'block' : 'none' }}
				>
					<div className="flex h-full w-full items-center justify-center overflow-auto">
						<div className="flex w-[50%] flex-col  items-center justify-center rounded-md border-2 border-zinc-600 bg-zinc-800 p-4 shadow-2xl">
							{options.map((option) => (
								<ContextMenuItem key={option.key ?? option.label} option={option} onClose={onClose} />
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ContextMenu;
