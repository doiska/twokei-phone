import { useDebouce } from '@os/hooks/useDebouce';
import React, { useEffect, useState } from 'react';
import { useSetContactFilterInput } from '../hooks/useContacts';

const SearchContacts: React.FC = () => {
	const setFilterVal = useSetContactFilterInput();
	const [input, setInput] = useState('');

	const debounced = useDebouce<string>(input, 400);

	useEffect(() => {
		setFilterVal(debounced);
	}, [debounced, setFilterVal]);

	return (
		<input
			type="text"
			className="input input-sm mx-2 inline-flex w-full max-w-xs self-center transition-all duration-200 focus-visible:outline-0"
			placeholder="Placeholder"
			value={input}
			onChange={(e) => setInput(e.target.value)}
		/>
	);
};

export default SearchContacts;
