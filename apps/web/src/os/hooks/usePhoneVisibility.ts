import { useEffect, useMemo, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { useNotifications } from '@os/notification/hooks/useNotifications';

import { useSettings } from '@apps/settings/hooks/useSettings';

import phoneState from './phoneState';

export const usePhoneVisibility = () => {
	const [visibility, setVisibility] = useRecoilState<boolean>(
		phoneState.visibility
	);
	const [phoneDisabled, setPhoneDisabled] = useRecoilState<boolean>(
		phoneState.phoneDisabled
	);
	const [notificationVisibility, setNotificationVisibility] =
		useState<boolean>(false);
	const notificationTimer = useRef<NodeJS.Timeout>();

	const { currentAlert } = useNotifications();
	const [{ zoom }] = useSettings();

	useEffect(() => {
		if (visibility) {
			setNotificationVisibility(false);
		}
	}, [visibility]);

	useEffect(() => {
		if (!visibility) {
			setNotificationVisibility(true);
			if (notificationTimer.current) {
				clearTimeout(notificationTimer.current);
				notificationTimer.current = undefined;
			}

			if (currentAlert?.keepWhenPhoneClosed) return;

			notificationTimer.current = setTimeout(
				() => setNotificationVisibility(false),
				/* TODO: DEFAULT TIME*/ 500
			);
		}
	}, [currentAlert, visibility, setVisibility]);

	const bottom = useMemo(() => {
		//TODO: check visibility
		if (!visibility) {
			return `${-728 * zoom}px`;
		}
		return '0px';
	}, [visibility, zoom]);

	return {
		setVisibility,
		phoneDisabled,
		visibility: notificationVisibility || visibility,
		bottom,
	};
};
