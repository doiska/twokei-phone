import { useCallback } from 'react';

import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import useNuiEvent from '@common/hooks/useNuiEvent';
import { Tweet, TwitterEvents } from '@typings/twitter';

import { useTweetsState, twitterState } from '@apps/twitter/hooks/state';
import useTwitterActions from '@apps/twitter/hooks/useTwitterActions';
import {
	handleTweet,
	handleBroadcastedTweet,
} from '@apps/twitter/utils/tweets';

export const useTwitterAPI = () => {
	const { addTweet } = useTwitterActions();
	const [tweets, setTweets] = useTweetsState();
	const setFilteredTweets = useSetRecoilState(twitterState.tweetsWithFilter);

	const { state: profileLoading, contents: profileContent } =
		useRecoilValueLoadable(twitterState.profile);

	const _setFilteredTweets = (tweets: Tweet[]) => {
		setFilteredTweets(tweets.map(handleTweet));
	};

	const handleTweetBroadcast = useCallback(
		(tweet: Tweet) => {
			if (profileLoading !== 'hasValue') return;
			if (!profileContent) return;

			if (tweets.length >= 50) {
				setTweets((curr) => curr.slice(0, -1));
			}

			const processedTweet = handleBroadcastedTweet(
				tweet,
				profileContent
			);

			addTweet(processedTweet);
		},
		[addTweet, profileLoading, profileContent, setTweets, tweets.length]
	);

	useNuiEvent(
		'TWITTER',
		TwitterEvents.FETCH_TWEETS_WITH_FILTER,
		_setFilteredTweets
	);

	useNuiEvent('TWITTER', TwitterEvents.BROADCAST_TWEET, handleTweetBroadcast);
};

export default useTwitterAPI;
