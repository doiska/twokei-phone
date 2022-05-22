import React from 'react';

import TweetList from '@apps/twitter/home/components/TweetList';
import { useTweetsValue } from '@apps/twitter/hooks/state';

const TwitterHome = () => {
	const tweets = useTweetsValue();

	return <TweetList tweets={tweets} />;
};

export default TwitterHome;
