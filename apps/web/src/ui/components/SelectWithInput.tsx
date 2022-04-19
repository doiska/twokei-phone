import React, { useState } from 'react';

type Props = {
	values: string[];
	className?: string;
	onChange: (content: unknown) => void;
};

const SelectWithInput: React.FC<Props> = ({ className, values, onChange }) => {
	const [showInput, setShowInput] = useState(false);

	return (
		<>
			{!showInput ? (
				<select className={className}>
					<option onClick={() => setShowInput(true)}>Informar outra opção</option>
					{values.map((value) => (
						<option key={value}>{value}</option>
					))}
				</select>
			) : (
				<div className="flex flex-row items-center gap-2">
					<span onClick={() => setShowInput(false)}>X</span>
					<input className="px-2 text-black focus:outline-none" onChange={onChange} />
				</div>
			)}
		</>
	);
};

export default SelectWithInput;
