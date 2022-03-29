import React from 'react';

type IOptionIcon = {
	className?: string;
	childrenClassName?: string;
	childrenBackground?: string;
	icon: JSX.Element;
	onClick: () => void;
};

const OptionIcon: React.FC<
	IOptionIcon & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ icon, onClick, className, childrenClassName, childrenBackground, ...rest }) => {
	return (
		<div className={`absolute bottom-20 flex w-full items-end justify-end ${className}`} {...rest}>
			<div
				className={`${
					childrenBackground ?? 'bg-whatsapp-light-green'
				} mr-6 w-fit rounded-full p-4 text-xl text-white ${childrenClassName}`}
				onClick={onClick}
			>
				{icon}
			</div>
		</div>
	);
};

export default OptionIcon;
