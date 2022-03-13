import React, { createContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';

export interface INotification {
	app: string;
	id?: string;
	title: string;
	content?: React.ReactNode;
	icon?: JSX.Element;
	notificationIcon: JSX.Element;
	sound?: boolean;
	cantClose?: boolean;
	keepWhenPhoneClosed?: boolean;
	onClick?: (notification: INotification) => void;
	onClose?: (notification: INotification) => void;
}

type INotificationAlert = INotification & {
	onClickAlert(e?: any): void;
	onCloseAlert(e?: any): void;
	resolve(): void;
};

export interface INotificationIcon {
	key: string;
	icon: JSX.Element;
	badge: number;
}

interface NotificationContextProvider {
	barUncollapsed: boolean;
	setBarUncollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
	notifications: INotification[];
	currentAlert?: INotificationAlert;
	icons: INotificationIcon[];
	count: number;
	removeAlerts(): void;
	addNotification(notification: INotification): void;
	removeNotification(idx: number): void;
	updateId(id: string, value: Partial<INotification>): void;
	removeId(id: string): void;
	hasNotification(id: string): INotification | null;
	hasAppNotification(appId: string): number;
	addNotificationAlert(n: INotification, cb?: (n: INotification) => void): void;
}

export const NotificationsContext = createContext<NotificationContextProvider>({} as NotificationContextProvider);

export const NotificationProvider: React.FC = ({ children }) => {
	// const isPhoneOpen = useRecoilValue(phoneState.visibility)
	// const isPhoneDisabled = useRecoilValue(phoneState.isPhoneDisabled);

	// const [ settings ] = useSettings();

	const [barUncollapsed, setBarUncollapsed] = useState<boolean>(true);
	const [notifications, setNotifications] = useState<INotification[]>([]);

	const alertTimeout = useRef<NodeJS.Timeout>();

	const [alerts, setAlerts] = useState<Array<[INotification, (n: INotification) => void, string | undefined]>>();
	const [currentAlert, setCurrentAlert] = useState<INotificationAlert>();

	useEffect(() => {
		if (/*isPhoneOpen &&*/ currentAlert && !currentAlert.keepWhenPhoneClosed) {
			currentAlert.resolve();
		}
	}, [, /*isPhoneOpen*/ currentAlert]);

	const addNotification = useCallback(
		(value: INotification) => {
			// if(isPhoneDisabled)
			// return;
			setNotifications((all) => [value, ...all]);
		},
		[
			/*isPhoneDisabled*/
		]
	);

	const updateNotification = useCallback((idx: number, value: INotification) => {
		setNotifications((all) => {
			const updated = [...all];
			updated.splice(idx, 1, value);
			return updated;
		});
	}, []);

	const removeNotification = (idx: number) => {
		setNotifications((all) => {
			const updated = all;
			updated.splice(idx, 1);
			return [...updated];
		});
	};

	const hasAppNotification = useCallback(
		(appId: string): number => {
			return notifications.findIndex((n) => n.app === appId);
		},
		[notifications]
	);

	const hasNotification = useCallback(
		(id: string): INotification | null => {
			return notifications.find((n) => n.id === id) || null;
		},
		[notifications]
	);

	const _showAlert = useCallback(
		(n: INotification, cb: (n: INotification) => void, sound?: string) => {
			return new Promise<void>((res) => {
				const resolve = () => {
					cb?.(n);
					res();
				};

				const onExit = (cb: any) => () => {
					cb?.(n);

					if (alertTimeout) {
						clearTimeout(alertTimeout.current!);
					}
					resolve();
				};

				setCurrentAlert({
					...n,
					resolve,
					onClickAlert: onExit(n.onClick),
					onCloseAlert: onExit(n.onClose),
				});

				if (n.sound && sound) {
					// play(sound)
				}

				if (n.keepWhenPhoneClosed) {
					return;
				}

				alertTimeout.current = setTimeout(() => {
					resolve();
				}, /*TODO: CONSTANT DEFAULT_TIMEOUT */ 3000);
			});
		},
		[
			/*TODO: play*/
		]
	);

	const addNotificationAlert = (n: INotification, cb: (n: INotification) => void) => {
		// if(isPhoneDisabled) return;
		if (n.sound) {
			//TODO: mount and play sound
		}

		setAlerts((curr) => [...(curr ?? []), [n, cb, undefined]]);
	};

	const updateId = (id: string, value: Partial<INotification>) => {
		const idx = notifications.findIndex((n) => n.id === id);

		if (idx !== -1) {
			const curr = { ...notifications[idx], ...value };
			updateNotification(idx, curr);
		}
	};

	const removeId = (id: string) => {
		setNotifications((curr) => curr.filter((n) => n.id !== id));
	};

	useEffect(() => {
		if (!currentAlert && alerts?.length) {
			_showAlert(...alerts[0]).then(() => {
				setAlerts((curr) => {
					const newQueue = curr;

					if (curr) curr.shift();

					return newQueue;
				});
			});
		}
	}, [_showAlert, alerts, currentAlert]);

	const icons: INotificationIcon[] = useMemo(() => {
		return notifications.reduce((icons: INotificationIcon[], curr) => {
			const find = icons.findIndex((i: INotificationIcon) => (i.key = curr.app));

			if (find !== -1) {
				icons[find].badge++;
				return icons;
			}

			icons.unshift({ key: curr.app, icon: curr.notificationIcon, badge: 1 });
			return icons;
		}, []);
	}, [notifications]);

	const removeAlerts = () => {
		setAlerts([]);
		setCurrentAlert(undefined);
	};

	return (
		<NotificationsContext.Provider
			value={{
				setBarUncollapsed,
				barUncollapsed,
				currentAlert,
				notifications,
				removeAlerts,
				addNotification,
				removeNotification,
				updateId,
				removeId,
				hasNotification,
				hasAppNotification,
				addNotificationAlert,
				icons,
				count: notifications.length,
			}}
		>
			{children}
		</NotificationsContext.Provider>
	);
};
