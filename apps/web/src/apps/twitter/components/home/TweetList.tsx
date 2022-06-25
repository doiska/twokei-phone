import React from 'react';

import { FormattedTweet } from '@typings/twitter';

import TweetItem from '@apps/twitter/home/components/TweetItem';

const ShowMoreTweets = () => (
	<div className="flex flex-row items-center justify-center">
		<button className="text-twitter-blue rounded py-2 px-4 font-medium">
			Mostrar 2 Tweets
		</button>
	</div>
);

const TweetList = ({ tweets }: { tweets: FormattedTweet[] }) => {
	return (
		<div className="flex h-full w-full flex-col gap-2">
			{tweets.map((tweet, index) => (
				<TweetItem {...tweet} key={tweet.id} />
			))}
		</div>
	);
};

export default TweetList;
