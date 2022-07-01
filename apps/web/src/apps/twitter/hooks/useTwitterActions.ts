import { useCallback } from 'react';

import { Snapshot, useRecoilCallback } from 'recoil';

import { Profile } from '@typings/common';
import { FormattedTweet } from '@typings/twitter';

import {
	twitterState,
	useSetFilteredTweets,
	useSetTweets,
	useSetTwitterProfile,
} from '@apps/twitter/hooks/state';

interface UseTwitterActions {
	addTweet: (tweet: FormattedTweet) => void;
	deleteTweet: (id: number) => void;
	updateTweets: (tweets: FormattedTweet[]) => void;
	updateFilteredTweets: (tweets: FormattedTweet[]) => void;
	updateLocalProfile: (profile: Profile) => void;
}

const isTweetsLoading = (snapshot: Snapshot) =>
	snapshot.getLoadable<FormattedTweet[]>(twitterState.tweets).state !==
	'hasValue';

export const useTwitterActions = (): UseTwitterActions => {
	const setTweets = useSetTweets();
	const setFilteredTweets = useSetFilteredTweets();
	const setTwitterProfile = useSetTwitterProfile();

	const addTweet = useRecoilCallback(
		({ snapshot, set }) =>
			async (tweet: FormattedTweet) => {
				if (isTweetsLoading(snapshot)) return;
				set(twitterState.tweets, (curr) => [...curr, tweet]);
			}
	);

	const deleteTweet = useRecoilCallback(
		({ snapshot, set }) =>
			(tweetId: number) => {
				if (isTweetsLoading(snapshot)) return;
				set(twitterState.tweets, (curr) =>
					curr.filter((tweet) => tweet.id !== tweetId)
				);
			},
		[setTweets]
	);

	const updateTweets = useRecoilCallback(
		({ snapshot, set }) =>
			(tweets: FormattedTweet[]) => {
				if (isTweetsLoading(snapshot)) return;
				set(twitterState.tweets, (curr) => [...curr, ...tweets]);
			},
		[setTweets]
	);

	const updateFilteredTweets = useCallback(
		(tweets: FormattedTweet[]) => {
			setFilteredTweets(tweets);
		},
		[setFilteredTweets]
	);

	const updateLocalProfile = useCallback(
		(profile: Profile) => {
			setTwitterProfile((curr) => {
				if (curr) {
					return {
						...curr,
						...profile,
					};
				}
			});
		},
		[setTwitterProfile]
	);

	return {
		addTweet,
		deleteTweet,
		updateTweets,
		updateFilteredTweets,
		updateLocalProfile,
	};
};

export default useTwitterActions;
