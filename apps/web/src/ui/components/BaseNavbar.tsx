import React from 'react';

const BaseNavbar: React.FC<{
	main?: React.HTMLAttributes<HTMLDivElement>;
	holder?: React.HTMLAttributes<HTMLDivElement>;
}> = ({ children, main, holder }) => {
	return (
		<div
			{...main}
			className={`absolute bottom-10 mb-2 flex w-full basis-[10%] justify-center py-2 ${main?.className}`}
		>
			<div
				{...holder}
				className={`flex h-full w-[70%] flex-row items-center justify-around rounded-lg ${holder?.className}`}
			>
				{children}
			</div>
		</div>
	);
};

const BaseNavbarItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
	return (
		<span
			className={`cursor-pointer rounded-md fill-white p-2 text-3xl text-white transition-all ${className}`}
			{...props}
		>
			{children}
		</span>
	);
};

export { BaseNavbar, BaseNavbarItem };
