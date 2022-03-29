import { useCallback } from 'react';

import { useRecoilValueLoadable } from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { MessageEvents, Profile } from '@typings/messages';
import fetchNui from '@utils/fetchNui';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { MockProfileResp } from '@apps/Messages/utils/constants';

import { messageProfileState } from './messageProfileState';
import { useMessageProfileActions } from './useMessageProfileActions';

type UseMessageProfile = {
	userProfile: Profile;
	profiles: Profile[];
	setUserProfile: (profile: Profile) => void;
	fetchUserProfile: () => void;
};

export const useMessageProfileAPI = (): UseMessageProfile => {
	const phoneNumber = usePhoneNumber();

	const { state: userProfileState, contents: userProfile } = useRecoilValueLoadable(messageProfileState.userProfile);
	const { contents: profiles } = useRecoilValueLoadable(messageProfileState.profiles);

	const { setLocalUserProfile } = useMessageProfileActions();

	const fetchUserProfile = useCallback(() => {
		fetchNui<ServerPromiseResp<Profile>>(
			MessageEvents.FETCH_PROFILE,
			{ number: phoneNumber },
			MockProfileResp
		).then(({ status, data }) => {
			if (status === 'ok' && data) {
				console.log(`fetched profile: ${JSON.stringify(data)}`);
				setLocalUserProfile(data);
			}
		});
	}, [setLocalUserProfile, phoneNumber]);

	const setUserProfile = useCallback(
		(profile: Profile) => {
			fetchNui<ServerPromiseResp<Profile>>(
				MessageEvents.SET_PROFILE,
				{
					...profile,
				},
				{
					status: 'ok',
					data: { ...profile },
				}
			).then((response) => {
				if (response.status === 'ok' && response.data) {
					console.log('setUserProfile', response.data);
					setLocalUserProfile(response.data);
				}
			});
		},
		[setLocalUserProfile, userProfileState, phoneNumber]
	);

	return {
		userProfile,
		profiles,
		setUserProfile,
		fetchUserProfile,
	};
};
