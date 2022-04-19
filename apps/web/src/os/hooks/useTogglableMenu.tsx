import { useState } from 'react';

type UseToggableMenu = {
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	toggleMenu: () => void;
};

const useToggableMenu = (): UseToggableMenu => {
	const [isOpen, setOpen] = useState(false);

	return {
		isOpen,
		setOpen,
		toggleMenu: () => setOpen((curr) => !curr),
	};
};

export default useToggableMenu;
