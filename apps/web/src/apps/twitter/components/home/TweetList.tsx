import React, { memo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { FormattedTweet } from '@typings/twitter';
import TweetItem from 'apps/twitter/components/home/TweetItem';

const ShowMoreTweets = () => (
	<div className="flex flex-row items-center justify-center">
		<button className="text-twitter-blue rounded py-2 px-4 font-medium">
			Mostrar 2 Tweets
		</button>
	</div>
);

const TweetList = ({ tweets }: { tweets: FormattedTweet[] }) => {
	return (
		<ScrollContainer
			className={`h-[650px] cursor-grab select-none snap-y overflow-y-scroll`}
			horizontal={false}
		>
			{tweets.map((tweet, index) => (
				//TODO: resolver key
				<TweetItem {...tweet} key={tweet.id + index + Math.random()} />
			))}
		</ScrollContainer>
	);
};

export default memo(TweetList);
