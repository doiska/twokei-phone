import React, { useState } from 'react';

import { FCWithChildren } from '@typings/ext';

type Props = {
	bgColor: string;
	textColor: string;
	icon: React.ReactNode;
	isSelected?: boolean;
	count?: number;
	selectedIcon?: React.ReactNode;
};

export const TweetButton: FCWithChildren<Props> = ({ isSelected, textColor, bgColor, count, icon, selectedIcon }) => {
	const [active, setActive] = useState(false);

	const selectTextColor = isSelected || active ? textColor : 'text-twitter-light-gray';
	const selectBGColor = active ? bgColor : 'bg-transparent';
	const shouldShowCount = count && count > 0;
	const activeIcon = isSelected ? selectedIcon : icon;

	return (
		<div
			className={`flex h-5 w-fit items-center gap-2 transition-all duration-150 ${selectTextColor}`}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			<span
				className={`inline-block rounded-full bg-opacity-30 p-1 transition-all duration-150 ${selectTextColor} ${selectBGColor}`}
			>
				{activeIcon ?? icon}
			</span>
			{shouldShowCount && <span>{count}</span>}
		</div>
	);
};

export const TweetButtonContainer: FCWithChildren = ({ children }) => {
	return <div className="mt-4 flex items-center justify-between">{children}</div>;
};
