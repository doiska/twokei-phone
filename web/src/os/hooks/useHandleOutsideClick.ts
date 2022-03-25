import React, { useEffect } from 'react';

const useHandleOutsideClick = (ref: React.MutableRefObject<HTMLElement | null>, onClickOutside: () => unknown) => {
	useEffect(() => {
		const insideHandler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener('mousedown', insideHandler);

		return () => {
			document.removeEventListener('mousedown', insideHandler);
		};
	}, [ref]);
};

export default useHandleOutsideClick;
