import React from 'react';

import { IContextMenuItem } from './ContextMenu';

const ContextMenuItemOption: React.FC<IContextMenuItem> = ({ option, onClose }) => {
	const { key, label, onCommit, selected } = option;

	return (
		<span
			className={`w-[70%] cursor-pointer rounded-md bg-opacity-70 p-1 text-center text-sm transition-all duration-150 hover:bg-zinc-700 ${
				selected ? 'text-blue-300' : 'text-white'
			}`}
		>
			<option
				key={key ?? label}
				label={label}
				onClick={(e) => {
					onCommit?.(e, option);
					onClose();
				}}
			/>
		</span>
	);
};

export default ContextMenuItemOption;
