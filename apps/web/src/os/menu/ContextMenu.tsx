import React from 'react';

type ContextMenuProps = {
	isOpen: boolean;
};

const ContextMenu: React.FC<ContextMenuProps> = ({ children, isOpen }) => {
	return <>{isOpen && children}</>;
};

export default ContextMenu;
