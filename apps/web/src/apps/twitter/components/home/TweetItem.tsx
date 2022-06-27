import React from 'react';
import {
	AiOutlineRetweet,
	FiShare,
	IoHeart,
	IoHeartOutline,
} from 'react-icons/all';

import { FormattedTweet } from '@typings/twitter';

import { TweetContainer } from '@apps/twitter/components/home/item/TweetContainer';
import { TweetItemAvatar } from '@apps/twitter/components/home/item/TweetItemAvatar';
import { TweetItemContent } from '@apps/twitter/components/home/item/TweetItemContent';
import {
	TweetButton,
	TweetButtonContainer,
} from '@apps/twitter/components/home/item/TweetItemFooter';
import { TweetItemHeader } from '@apps/twitter/components/home/item/TweetItemHeader';

const TweetItem = ({
	content,
	createdAt,
	isRetweeted,
	profile: { name, username, avatar },
}: FormattedTweet) => {
	return (
		<TweetContainer>
			<TweetItemAvatar sourceProfileAvatar={avatar ?? ''} />
			<div className={'flex-grow'}>
				{isRetweeted && (
					<span className={'text-twitter-dark-gray text-sm'}>
						Retweet de @xd
					</span>
				)}
				<TweetItemHeader
					sourceProfileName={name}
					sourceProfileUsername={username ?? ''}
					createdAt={createdAt}
				/>
				<TweetItemContent message={content} />
				<TweetButtonContainer>
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
