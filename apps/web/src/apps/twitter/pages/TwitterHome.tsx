import React from 'react';

import useNavigation from '@os/hooks/useNavigation';
import useToggle from '@os/hooks/useTogglableMenu';

import { ComposeModal } from '@apps/twitter/common/ComposeModal';
import TweetList from '@apps/twitter/home/components/TweetList';
import { useTweetsValue } from '@apps/twitter/hooks/state';
import { TwitterNewTweetIcon } from '@apps/twitter/Twitter.styles';

const TwitterHome = () => {
	const { goTo } = useNavigation();
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
