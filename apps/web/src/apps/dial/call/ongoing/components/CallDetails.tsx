import React from "react";
import { IoCall } from "react-icons/io5";

type DetailProps = React.HTMLAttributes<HTMLDivElement> & {
	formattedTime: string;
};

export const CallDetails: React.FC<DetailProps> = ({ formattedTime, className, ...props }) => {
	return (
		<div className={`text-md flex w-full flex-row items-center justify-center gap-2 ${className}`} {...props}>
			<IoCall/>
			<span>{formattedTime}</span>
		</div>
	);
};