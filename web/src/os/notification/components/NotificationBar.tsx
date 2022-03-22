import React, { memo, useEffect, useRef } from 'react';
import { MdBatteryFull } from 'react-icons/md';
import { Md4K } from 'react-icons/md';

import usePhoneTime from '@os/hooks/usePhoneTime';
import { useNotifications } from '@os/notification/hooks/useNotifications';

import NotificationList from './NotificationList';

const NotificationBar: React.FC = () => {
	const {
		notifications,
		icons,

		addNotification,
		removeNotification,
		removeAllNotifications,

		barUncollapsed,
		setBarUncollapsed,
	} = useNotifications();

	const { now } = usePhoneTime();

	const notificationBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		for (let i = 1; i < 20; i++) {
			addNotification({
				id: `appstyle_${i % 2}`,
				app: `appstyle_${i % 2}`,
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
				className="z-[100] flex w-full flex-nowrap items-center justify-between px-2 [text-shadow:0_4px_8px_rgba(0,0,0,0.70)] hover:cursor-pointer"
				onClick={() => setBarUncollapsed((curr) => !curr)}
				tabIndex={0}
			>
				<div className="flex basis-10/12 items-center">
					<span className="justify-self-end pr-1">{now.toLocaleString('pt-BR', { timeStyle: 'short' })}</span>
					{icons?.map(({ key, icon }) => {
						return (
							<div key={key} className="indicator text">
								{icon ?? 'icon'}
							</div>
						);
					})}
				</div>
				<div className="flex basis-2/12 items-center justify-end">
					<span>95%</span>
					<span>
						<MdBatteryFull />
					</span>
				</div>
			</div>
			<NotificationList
				collapsed={barUncollapsed}
				notificationBarRef={notificationBarRef}
				notifications={notifications}
				onDismiss={(idx?: number) => (idx !== undefined ? removeNotification(idx) : removeAllNotifications())}
			/>
		</>
	);
};

export default memo(NotificationBar);
