import React from 'react';

type EditableInput = {
	label?: string;
	className?: string;
	icon?: JSX.Element;
	type: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactDetailsEditableItem: React.FC<EditableInput> = ({ icon, type, value, className, onChange }) => {
	return (
		<div className={`flex w-80 flex-row content-center items-center justify-start gap-1 rounded-full bg-zinc-800 p-1`}>
			<span className="ml-3 inline-flex items-center">{icon}</span>
			<div className="flex w-full">
				<input
					className={`input h-fit w-full ${className}`}
					value={value}
					type={type}
					onChange={onChange}
				></input>
			</div>
		</div>
	);
};

export default ContactDetailsEditableItem;
