import { useCallback } from 'react';

import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';

import useNuiEvent from '@common/hooks/useNuiEvent';
import { TwitterEvents, FormattedTweet, TweetDTO } from '@typings/twitter';

import { twitterState, useTweetsState } from '@apps/twitter/hooks/state';
import useTwitterActions from '@apps/twitter/hooks/useTwitterActions';
import {
	handleTweet,
	handleBroadcastedTweet,
} from '@apps/twitter/utils/tweetCreation';

const useTwitterService = () => {
	const { addTweet } = useTwitterActions();

	const setFilteredTweets = useSetRecoilState(twitterState.tweetsWithFilter);

	const _setFilteredTweets = (tweets: FormattedTweet[]) =>
		setFilteredTweets(tweets.map(handleTweet));

	const [tweets, setTweets] = useTweetsState();

	const { state: profileLoading, contents: profileContent } =
		useRecoilValueLoadable(twitterState.profile);

	const handleTweetBroadcast = useCallback(
		(tweet: TweetDTO) => {
			console.log(`handleTweetBroadcast: ${JSON.stringify(tweet)}`);

			if (profileLoading !== 'hasValue') return;
			if (!profileContent) {
				console.log(`handleTweetBroadcast: profileContent is null`);
				return;
			}

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

	useNuiEvent('TWITTER', TwitterEvents.BROADCAST_TWEET, (tweet: TweetDTO) => {
		console.log(`handleTweetBroadcast: ${JSON.stringify(tweet)}`);
		handleTweetBroadcast(tweet);
	});
};

export default useTwitterService;
