import { useState } from 'react';

export type UseToggleMenu = {
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	toggle: () => void;
};

export const useToggle = (): UseToggleMenu => {
	const [isOpen, setOpen] = useState(false);

	return {
		isOpen,
		setOpen,
		toggle: () => setOpen((curr) => !curr),
	};
};

export default useToggle;
