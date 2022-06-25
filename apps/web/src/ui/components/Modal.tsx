import { useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
	isOpen: boolean;
	toggle: () => void;
	children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, children, toggle }) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();

				isOpen && toggle();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, toggle]);

	return isOpen && ReactDOM.createPortal();
};
