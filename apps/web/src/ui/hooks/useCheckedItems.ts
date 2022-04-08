import React, { useState } from 'react';

export type UseCheckedItems<T> = {
	addChecked: (items: T[]) => void;
	removeChecked: (items: T[]) => void;
	checked: T[];
};

const useCheckedItems = <T>(): UseCheckedItems<T> => {
	const [checked, setChecked] = useState<T[]>([]);

	const addChecked = (items: T[]) => setChecked((prev) => [...prev, ...items]);
	const removeChecked = (items: T[]) => setChecked((prev) => [...prev].filter((item) => !items.includes(item)));

	return {
		addChecked,
		removeChecked,
		checked,
	};
};

export default useCheckedItems;
