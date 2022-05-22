import { Profile } from '@typings/common';
import { Tweet, FormattedTweet } from '@typings/twitter';
import { IMAGE_DELIMITER } from '@utils/format';

export function handleTweet(tweet: Tweet): FormattedTweet {
	const links = tweet.images ? tweet.images.split(IMAGE_DELIMITER) : [];
	const images = links.map((link) => ({ id: link, url: link }));

	return { ...tweet, images };
}

export function handleBroadcastedTweet(
	tweet: Tweet,
	profile: Profile
): FormattedTweet {
	const processedTweet = handleTweet(tweet);

	const isMine = tweet.source === profile.source;

	return { ...processedTweet, isMine, isLiked: false };
}
