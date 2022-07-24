import React from "react";
import { BiLike, FiShare, IoHeartOutline, IoHeart, AiOutlineRetweet } from "react-icons/all";

import { TweetButtonContainer, TweetButton } from "@apps/twitter/components/home/item/TweetItemFooter";


type Props = {
	tweetId: number;
	isLiked?: boolean;
	isRetweeted?: boolean;
	likeCount?: number;
	retweetCount?: number;
}

export const TweetButtonRow: React.FC<Props> = ({
	tweetId,
	isLiked,
	isRetweeted,
	likeCount,
	retweetCount
}) => {
	return (
		<TweetButtonContainer>
			<TweetButton
				tweetId={tweetId}
				isSelected={isRetweeted}
				count={retweetCount}
				bgColor={'bg-rose-700'}
				textColor={'text-rose-500'}
				icon={<IoHeartOutline/>}
				selectedIcon={<IoHeart/>}
			/>
			<TweetButton
				tweetId={tweetId}
				selectedIcon={BiLike}
				isSelected={isLiked}
				count={likeCount}
				bgColor={'bg-green-700'}
				textColor={'text-green-400'}
				icon={<AiOutlineRetweet/>}
			/>
			<TweetButton
				bgColor={'bg-blue-300'}
				textColor={'text-blue-500'}
				icon={<FiShare/>}
			/>
		</TweetButtonContainer>
	);
};