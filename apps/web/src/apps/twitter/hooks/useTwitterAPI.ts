import { useCallback } from 'react';

import { TwitterEvents, TweetDTO } from '@typings/twitter';
import fetchNui from '@utils/fetchNui';

import useTwitterActions from '@apps/twitter/hooks/useTwitterActions';

const useTwitterAPI = () => {
	const { addTweet } = useTwitterActions();

	const submitTweet = useCallback(
		(tweet: TweetDTO) => {
			fetchNui(
				TwitterEvents.CREATE_TWEET,
				tweet
				// buildRespObj(tweet)
			).then((resp) => {
				console.log('tweet', tweet, resp);
				if (resp.status !== 'ok') {
					console.log('error', resp);
					return;
				}
			});
		},
		[addTweet]
	);

	return {
		submitTweet,
	};
};

export default useTwitterAPI;
