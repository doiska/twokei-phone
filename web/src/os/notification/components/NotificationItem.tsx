import React from 'react';

import { INotification } from '../providers/NotificationProvider';

/**
 *
 * onCloseNotification is called when the user clicks the close button and dont opens the notification
 * onClickCloseNotification is called when the user opens the notification
 */

type INotificationItem = INotification & {
	onCloseNotification: (e: React.MouseEvent) => void;
};

const NotificationItem = ({ onCloseNotification, ...notification }: INotificationItem) => {
	const { title, notificationIcon, content, onClick, icon } = notification;

	return (
		<li
			className="relative my-[0.5px] flex h-full flex-col bg-zinc-700 p-3 text-white first:rounded-t-lg last:rounded-b-lg"
			onClick={(e: React.MouseEvent) => {
				// if (onClick) {
				// 	onClick(notification);
				// }
				onCloseNotification(e);
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
