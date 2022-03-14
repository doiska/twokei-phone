import React, { memo, useEffect, useRef } from 'react';
import { MdBatteryFull } from 'react-icons/md';
import { Md4K } from 'react-icons/md';

import { useNotifications } from '@os/notification/hooks/useNotifications';

import NotificationItem from './NotificationItem';
import NotificationList from './NotificationList';

const NotificationBar: React.FC = () => {
	const { addNotification, notifications, icons, removeNotification, barUncollapsed, setBarUncollapsed } = useNotifications();
	const notificationBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		for (let i = 0; i < 20; i++) {
			addNotification({
				app: 'appstyle' + i,
				notificationIcon: <Md4K />,
				title: 'Notification Title' + i,
			});
		}
	}, []);

	useEffect(() => {
		if (notifications.length === 0) setBarUncollapsed(true);
	}, [notifications, setBarUncollapsed]);

	return (
		<>
			<div
				ref={notificationBarRef}
				className="relative flex w-full basis-[4%] flex-nowrap items-center justify-between bg-gray-300 px-2 text-black hover:cursor-pointer"
				onClick={() => setBarUncollapsed((curr) => !curr)}
				tabIndex={0}
			>
				<div className="flex basis-10/12">
					<span className="justify-self-end">{new Date().toLocaleString('pt-BR', { timeStyle: 'short' })}</span>
					{icons.map(({ key, badge, icon }) => {
						<div key={key} className="mt-2">
							{badge} {icon ?? 'icon'}
						</div>;
					})}
				</div>
				<div className="flex basis-2/12 items-center justify-end">
					<span>95%</span>
					<span>
						<MdBatteryFull />
					</span>
				</div>
			</div>
			<NotificationList collapsed={barUncollapsed} notificationBarRef={notificationBarRef}>
				{notifications.map((notification, idx) => {
					return (
						<NotificationItem
							key={notification.id ?? idx}
							{...notification}
							onCloseNotification={(e: React.MouseEvent) => {
								e.stopPropagation();

								if (notification.onClose) {
									notification.onClose?.(notification);
								}
								removeNotification(idx);
							}}
						/>
					);
				})}
			</NotificationList>
		</>
	);
};

export default memo(NotificationBar);
