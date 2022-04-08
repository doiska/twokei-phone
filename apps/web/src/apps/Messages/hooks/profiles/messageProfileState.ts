import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { MessageEvents, Profile } from '@typings/messages';
import fetchNui from '@utils/fetchNui';

import { MockProfileResp, MockProfilesResp } from '@apps/Messages/utils/constants';

export const messageProfileState = {
	profiles: atom<Profile[]>({
		key: 'profiles',
		default: selector({
			key: 'defaultMessageProfile',
			get: async () => {
				try {
					const resp = await fetchNui<ServerPromiseResp<Profile[]>>(
						MessageEvents.FETCH_ALL_PROFILES,
						undefined,
						MockProfilesResp
					);

					if (resp.status !== 'ok' || !resp.data) {
						return [];
					}

					return resp.data;
				} catch (e) {
					console.error(e);
				}
				return [];
			},
		}),
	}),
	userProfile: atom<Profile | undefined>({
		key: 'userProfile',
		default: selector({
			key: 'defaultUserProfile',
			get: async () => {
				try {
					const resp = await fetchNui<ServerPromiseResp<Profile>>(
						MessageEvents.FETCH_PROFILE,
						undefined,
						MockProfileResp
					);

					if (resp.data && resp.status === 'ok') {
						return resp.data;
					}
				} catch (e) {
					console.error(e);
				}
			},
		}),
	}),
};

export const useProfiles = () => useRecoilState(messageProfileState.profiles);
export const useSetProfiles = () => useSetRecoilState(messageProfileState.profiles);
export const useProfilesValues = () => useRecoilState(messageProfileState.profiles);

export const useUserProfile = () => useRecoilState(messageProfileState.userProfile);
export const useSetUserProfile = () => useSetRecoilState(messageProfileState.userProfile);
export const useUserProfileValues = () => useRecoilValue(messageProfileState.userProfile);
