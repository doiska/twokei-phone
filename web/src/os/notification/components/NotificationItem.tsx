import React, { memo } from 'react';
import { INotification } from '../providers/NotificationProvider';

type INotificationItem = INotification & {
	onClose: (e: any) => void;
	onClickClose: (e: any) => void;
};

const NotificationItem: React.FC<INotificationItem> = ({ onClose, onClickClose, ...notification }) => {
	const { title, notificationIcon, content, cantClose, onClick, icon } = notification;

	return (
		<li
			className="relative my-[0.5px] flex h-full flex-col bg-zinc-700 p-3 text-white first:rounded-t-lg last:rounded-b-lg"
			onClick={(e) => {
				if (onClick) {
					onClick(notification);
					onClickClose(e);
				} else {
					onClose(e);
				}
			}}
		>
			<div className="flex flex-row items-center gap-1 text-[12px]">
				<span>{notificationIcon}</span>
				<span>{title}</span>
			</div>
			<span>{content}</span>
		</li>
	);
};

export default NotificationItem;
