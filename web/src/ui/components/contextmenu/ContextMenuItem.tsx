import React from 'react';

import { IContextMenuOption } from './ContextMenu';

type IContextMenuItem = {
	onClose: () => void;
	option: IContextMenuOption;
};

const ContextMenuItem: React.FC<IContextMenuItem> = ({ option, onClose }) => {
	const { key, label, onClick, selected } = option;

	console.log(option);

	return (
		<span className={`${selected ? 'text-blue-300' : 'text-white'}`}>
			<option
				key={key ?? label}
				label={label}
				onClick={(e) => {
					console.log(e);
					if (onClick) onClick(e, option);
					onClose();
				}}
			/>
		</span>
	);
};

export default ContextMenuItem;
