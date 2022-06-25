import React from 'react';

type Props = {
	isActive: boolean;
	icon: React.ReactNode;
	onClick: () => void;
};

const TwitterNavItem = ({ icon, isActive, onClick }: Props) => (
	<span className={isActive ? 'text-twitter-blue' : 'text-black dark:text-white'} onClick={() => onClick()}>
		{icon}
	</span>
);

export default TwitterNavItem;
