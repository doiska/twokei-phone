import React, { useEffect, useState } from 'react';

import { useDebounce } from '@os/hooks/useDebounce';

import { useSetContactFilterInput } from '../../hooks/contactsState';

const SearchContacts: React.FC = () => {
	const setFilterVal = useSetContactFilterInput();
	const [input, setInput] = useState('');

	const debounced = useDebounce<string>(input, 400);

	useEffect(() => {
		setFilterVal(debounced);
	}, [debounced, setFilterVal]);

	return (
		<div className="flex items-center justify-center p-3">
			<input
				type="text"
				className="input input-sm w-2/3 transition-all duration-200 focus-visible:outline-0"
				placeholder="Placeholder"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
		</div>
	);
};

export { SearchContacts };
