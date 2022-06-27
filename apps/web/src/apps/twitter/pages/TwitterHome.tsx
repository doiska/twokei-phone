import React from 'react';

import useToggle from '@os/hooks/useTogglableMenu';

import { ComposeModal } from '@apps/twitter/components/create/ComposeModal';
import TweetList from '@apps/twitter/components/home/TweetList';
import { useTweetsValue } from '@apps/twitter/hooks/state';
import { TwitterNewTweetIcon } from '@apps/twitter/Twitter.styles';

const TwitterHome = () => {
	const tweets = useTweetsValue();

	const { setOpen, toggle, isOpen } = useToggle();

	return (
		<>
			<TweetList tweets={tweets} />
			<TwitterNewTweetIcon onClick={() => setOpen(true)} />
			<ComposeModal toggle={toggle} isOpen={isOpen} setOpen={setOpen} />
		</>
	);
};

export default TwitterHome;
