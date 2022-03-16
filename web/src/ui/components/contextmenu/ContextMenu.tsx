import React from 'react';

import ContextMenuItem from './ContextMenuItem';

export interface IContextMenuOption {
	key?: string;
	label?: string;
	value: string;
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
	return (
		<>
			{open && (
				<div className="absolute bottom-0 z-10 max-h-[90%] min-h-[10%] w-full overflow-auto">
					<div className="flex flex-col items-center justify-center p-4">
						{options.map((option) => (
							<ContextMenuItem key={option.key ?? option.label} option={option} onClose={onClose} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default ContextMenu;
