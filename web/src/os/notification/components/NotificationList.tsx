import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const NotificationList: React.FC<{
	children: React.ReactNode;
	collapsed: boolean;
	notificationBarRef?: React.RefObject<HTMLElement>;
}> = ({ notificationBarRef, collapsed, children }) => {
	return (
		<ScrollContainer
			className={`absolute z-[98] w-full cursor-grab select-none snap-y overflow-y-scroll scroll-smooth backdrop-blur-sm transition-all duration-500`}
			style={{
				height: collapsed ? '0' : '90%',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				top: `${notificationBarRef?.current?.clientHeight ?? 0}px`,
			}}
		>
			<ul className="flex flex-col p-3">{children}</ul>
		</ScrollContainer>
	);
};

export default NotificationList;
