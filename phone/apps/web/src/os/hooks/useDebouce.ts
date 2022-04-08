import { useEffect, useState } from 'react';

export const useDebouce = <T = any>(value: T, delay = 100) => {
	const [debounced, setDebouced] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouced(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debounced;
};
