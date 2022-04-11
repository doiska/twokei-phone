import React from 'react';

type IOptionIcon = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	className?: string;
	icon: JSX.Element;
};

const OptionIconHolder: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
	children,
	className,
	...rest
}) => (
	<div className={`absolute bottom-20 flex w-full cursor-pointer items-end justify-end ${className}`} {...rest}>
		{children}
	</div>
);

const OptionIcon: React.FC<IOptionIcon> = ({ icon, className, ...rest }) => (
	<div className={`mr-6 w-fit rounded-full p-4 text-xl text-white ${className} `} {...rest}>
		{icon}
	</div>
);

export { OptionIconHolder, OptionIcon };
