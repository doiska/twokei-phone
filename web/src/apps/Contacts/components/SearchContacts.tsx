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
			className="input input-bordered input-xs w-full max-w-xs"
			placeholder="Placeholder"
			value={input}
			onChange={(e) => setInput(e.target.value)}
		/>
	);
};

export default SearchContacts;
