import React from 'react';
import { AiOutlineRetweet, FiShare } from 'react-icons/all';

import { TweetItem } from '@typings/twitter';
import { LikeButton } from 'apps/twitter/components/buttons/LikeButton';

import { TweetContainer } from '@apps/twitter/components/home/item/TweetContainer';
import { TweetItemAvatar } from '@apps/twitter/components/home/item/TweetItemAvatar';
import { TweetItemContent } from '@apps/twitter/components/home/item/TweetItemContent';
import {
	TweetButton,
	TweetButtonContainer,
} from '@apps/twitter/components/home/item/TweetItemFooter';
import { TweetItemHeader } from '@apps/twitter/components/home/item/TweetItemHeader';

export const TweetSingleItem = ({
	id,
	content,
	createdAt,
	isLiked,
	likeCount,
	isRetweeted,
	retweetCount,
	profile: { name, username, avatar },
}: TweetItem) => {
	return (
		<TweetContainer>
			<TweetItemAvatar
				name={username.slice(0, 1).toUpperCase()}
				sourceProfileAvatar={avatar ?? ''}
			/>
			<div className={'flex-grow'}>
				<TweetItemHeader
					sourceProfileName={name ?? username}
					sourceProfileUsername={username ?? ''}
					createdAt={createdAt}
				/>
				<TweetItemContent message={content ?? ''} />
				<TweetButtonContainer>
					<TweetButton
						count={retweetCount}
						bgColor={'bg-green-700'}
						textColor={'text-green-400'}
						icon={<AiOutlineRetweet />}
						isSelected={isRetweeted}
					/>
					<LikeButton
						tweetId={id}
						isLiked={isLiked}
						count={likeCount}
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
