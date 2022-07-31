import { useRecoilCallback, useRecoilValueLoadable } from 'recoil';

import { Profile } from '@typings/messages';

import {
	messageProfileState,
	useSetProfiles,
	useUserProfile,
} from './messageProfileState';

export const useMessageProfileActions = () => {
	const { state: profilesLoading } = useRecoilValueLoadable(
		messageProfileState.profiles
	);

	const [userProfile, setUserProfile] = useUserProfile();

	const setProfiles = useSetProfiles();

	const setLocalProfiles = useRecoilCallback<[Profile[]], void>(
		({ snapshot }) =>
			(profiles: Profile[]) => {
				const { state } = snapshot.getLoadable(
					messageProfileState.profiles
				);

				if (state !== 'hasValue') return null;

				setProfiles((curr) => [...profiles, ...curr]);
			},
		[setProfiles]
	);

	const removeLocalProfiles = useRecoilCallback(
		({ snapshot }) =>
			(profiles: Profile[]) => {
				const { state } = snapshot.getLoadable(
					messageProfileState.profiles
				);

				if (state !== 'hasValue') return null;

				if (!profiles.length) return;

				setProfiles((curr) =>
					[...curr].filter((profile) => !profiles.includes(profile))
				);
			},
		[setProfiles, profilesLoading]
	);

	const setLocalUserProfile = useRecoilCallback(
		({ snapshot }) =>
			(profile: Profile) => {
				const { state } = snapshot.getLoadable(
					messageProfileState.userProfile
				);

				if (state !== 'hasValue') return null;

				setUserProfile(profile);
			},
		[setUserProfile]
	);

	const fetchProfile = useRecoilCallback<[string], Profile>(
		({ snapshot }) =>
			(source: number) => {
				const { state } = snapshot.getLoadable(
					messageProfileState.profiles
				);

				if (state !== 'hasValue') return null;

				const { contents: profiles } = snapshot.getLoadable(
					messageProfileState.profiles
				);

				const profile = profiles.find(
					(profile: Profile) => profile.source === source
				);

				return profile;
			},
		[setProfiles]
	);

	return {
		fetchProfile,
		setLocalProfiles,
		removeLocalProfiles,
		setLocalUserProfile,
	};
};
