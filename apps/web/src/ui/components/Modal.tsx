import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@ui/components/modal/ModalOverlay';

type Props = {
	isShowing: boolean;
	toggle: () => void;
	children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isShowing, children, toggle }) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();

				isShowing && toggle();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isShowing, toggle]);

	if (!isShowing) return null;

	return ReactDOM.createPortal(
		<ModalOverlay toggle={toggle}>{children}</ModalOverlay>,
		document.querySelector('#phone-body') as HTMLElement
	);
};
