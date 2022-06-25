import React from 'react';
import {
	AiOutlineRetweet,
	FiShare,
	HiOutlineChat,
	IoHeart,
	IoHeartOutline,
} from 'react-icons/all';

import { FormattedTweet } from '@typings/twitter';

import {
	TweetButton,
	TweetButtonContainer,
} from '@apps/twitter/home/components/tweetItem/TweetButtons';
import { TweetContainer } from '@apps/twitter/home/components/tweetItem/TweetContainer';
import { TweetMessage } from '@apps/twitter/home/components/tweetItem/TweetMessage';
import {
	TweetProfileAvatar,
	TweetProfileName,
} from '@apps/twitter/home/components/tweetItem/TweetProfileAvatar';

const TweetItem = ({
	message,
	sourceProfileUsername,
	sourceProfileName,
	sourceProfileAvatar,
	secondsAgo,
	isRetweeted,
	retweetedBy,
}: FormattedTweet) => {
	const isRetweet = isRetweeted && !!retweetedBy;

	return (
		<TweetContainer>
			<TweetProfileAvatar sourceProfileAvatar={sourceProfileAvatar} />
			<div className={'flex-grow'}>
				{isRetweet && (
					<span className={'text-twitter-dark-gray text-sm'}>
						Retweet de @{retweetedBy}
					</span>
				)}
				<TweetProfileName
					sourceProfileName={sourceProfileName}
					sourceProfileUsername={sourceProfileUsername}
					secondsAgo={secondsAgo}
				/>
				<TweetMessage message={message} />
				<TweetButtonContainer>
					<TweetButton
						count={3}
						bgColor={'bg-cyan-700'}
						textColor={'text-cyan-500'}
						icon={<HiOutlineChat />}
						isSelected={false}
					/>
					<TweetButton
						count={500}
						bgColor={'bg-green-700'}
						textColor={'text-green-400'}
						icon={<AiOutlineRetweet />}
						isSelected={true}
					/>
					<TweetButton
						count={10}
						bgColor={'bg-rose-700'}
						textColor={'text-rose-500'}
						icon={<IoHeartOutline />}
						selectedIcon={<IoHeart />}
						isSelected={true}
					/>
					<TweetButton
						bgColor={'bg-blue-300'}
						textColor={'text-blue-500'}
						icon={<FiShare />}
					/>
				</TweetButtonContainer>
			</div>
		</TweetContainer>
	);
};

export default TweetItem;
