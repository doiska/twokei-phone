import React from 'react';

type ContextMenuProps = {
	children: React.ReactNode;
	isOpen: boolean;
};

const ContextMenu: React.FC<ContextMenuProps> = ({ children, isOpen }) => {
	return <>{isOpen && children}</>;
};

export default ContextMenu;
