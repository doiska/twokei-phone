import React from 'react';

type Props = {
	label?: string;
	value: string;
	onChange: (value: string) => void;
};

export const TwitterInput: React.FC<Props> = ({ label, value, onChange }) => {
	return (
		<div className={'floating-input relative mb-5 w-10/12'}>
			<input
				type="email"
				id="email"
				className="border-twitter-dark-gray h-16 w-full appearance-none rounded-md border bg-transparent p-3 focus:border-blue-500 focus:shadow-sm focus:outline-none"
				placeholder={label}
				value={value ?? ''}
				onChange={(e) => onChange(e.target.value)}
				autoComplete="off"
			/>
			<label
				htmlFor="email"
				className="pointer-events-none absolute top-0 left-0 h-full origin-left transform px-3 py-5 transition-all duration-100 ease-in-out"
			>
				{label}
			</label>
		</div>
	);
};
