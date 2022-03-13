import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const NotificationList: React.FC<{ collapsed: boolean }> = ({ children, collapsed }) => {
	return (
		<ScrollContainer
			className={`absolute top-[30px] z-[98] w-full cursor-grab select-none snap-y overflow-y-scroll scroll-smooth backdrop-blur-sm transition-all duration-500`}
			style={{ height: collapsed ? '0' : '90%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
		>
			<ul className="flex flex-col p-3">{children}</ul>
		</ScrollContainer>
	);
};

export default NotificationList;
