import React from 'react';

import TweetItem from '@apps/twitter/home/components/TweetItem';

const ShowMoreTweets = () => (
	<div className="flex flex-row items-center justify-center">
		<button className="text-twitter-blue rounded py-2 px-4 font-medium">Mostrar 2 Tweets</button>
	</div>
);

const Tweets = () => {
	return (
		<div className="flex h-full w-full flex-col gap-2">
			<ShowMoreTweets />
			<TweetItem
				name="doiská"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
				date="10h"
				content="test"
			/>
			<TweetItem
				name="doiská"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
				date="10h"
				content="test"
			/>{' '}
			<TweetItem
				name="doiská"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
				date="10h"
				content="test"
			/>{' '}
			<TweetItem
				name="doiská"
				username="@two2kei"
				avatar="https://pbs.twimg.com/media/EkTogZ-X0AEBn-W.jpg"
				date="10h"
				content="test"
			/>
		</div>
	);
};

export default Tweets;
