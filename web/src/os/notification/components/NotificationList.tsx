import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { INotification } from '../providers/NotificationProvider';
import NotificationItem from './NotificationItem';

const NotificationList: React.FC<{
	collapsed: boolean;
	notificationBarRef?: React.RefObject<HTMLElement>;
	notifications: INotification[];
	onDismiss: (idx?: number) => void;
}> = ({ notificationBarRef, collapsed, notifications, onDismiss }) => {
	return (
		<div
			className="absolute z-[90] flex max-h-[90%] w-full flex-col overflow-hidden"
			style={{
				top: collapsed ? '0' : notificationBarRef?.current?.scrollHeight + 'px',
				height: collapsed ? '0' : 'auto',
			}}
		>
			<ScrollContainer className={`h-[95%] cursor-grab select-none snap-y overflow-y-scroll`} horizontal={false}>
				<ul className="flex h-full flex-col px-2 transition-all duration-500">
					{notifications.map((notification, idx) => {
						return (
							<NotificationItem
								key={`${notification.id ?? notification.app}${idx}`}
								{...notification}
								onCloseNotification={(e: React.MouseEvent) => {
									e.stopPropagation();

									if (notification.onClose) {
										notification.onClose?.(notification);
									}
									onDismiss(idx);
								}}
							/>
						);
					})}
				</ul>
			</ScrollContainer>
			<span className="w-fit cursor-pointer rounded-full p-2 text-white" onClick={() => onDismiss()}>
				Marcar como lidas
			</span>
		</div>
	);
};

export default NotificationList;
