import React, { useEffect } from 'react';

interface IUseDoubleClick {
	onSingleClick: () => void;
	onDoubleClick: () => void;
	delay: number;
}

const useDoubleClick = ({ onDoubleClick, delay, onSingleClick }: IUseDoubleClick) => {
	const [click, setClick] = React.useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (click === 1) onSingleClick();
			else if (click === 2) onDoubleClick();
			setClick(0);
		}, delay);

		return () => clearTimeout(timer);
	}, [click]);

	return () => setClick((prev) => prev + 1);
};

export default useDoubleClick;
