import React from 'react';

type EditableInput = {
	label?: string;
	className?: string;
	icon?: JSX.Element;
	type: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactDetailsEditableItem: React.FC<EditableInput> = ({ label, icon, type, value, className, onChange }) => {
	return (
		<div className={`flex flex-row content-center items-center justify-center`}>
			{label ? <label>{label}</label> : ''}
			<input
				className={`input h-fit w-full max-w-xs focus:outline-none ${className}`}
				type={type}
				onChange={onChange}
				value={value}
			></input>
			<span>{icon}</span>
		</div>
	);
};

export default ContactDetailsEditableItem;
