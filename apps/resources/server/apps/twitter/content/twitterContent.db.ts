
import { XiaoDS } from '@db/xiao';
import { TweetItemModel } from '@models/Twitter.model';

import { TwitterProfileDB } from '@apps/twitter/profile/twitterProfile.db';

import { TweetCreateDTO, UnformattedTweet } from '@typings/twitter';

class _TwitterDB {
	async createTweet(
		source: number,
		tweet: TweetCreateDTO
	): Promise<UnformattedTweet> {
		const profile = await TwitterProfileDB.getProfile(source);

		const res = await XiaoDS.getRepository(TweetItemModel).save({
			...tweet,
			source,
		});

		return {
			...res,
			profile,
			likes: 0,
			retweets: 0,
			isLiked: false,
			isRetweeted: false,
			isMine: true,
		};
	}

	async fetchTweets(source: number, page = 0): Promise<UnformattedTweet[]> {
		const tweets = await XiaoDS.getRepository(TweetItemModel).find({
			take: 10,
			order: {
				createdAt: 'DESC',
			},
		});

		return await Promise.all(
			tweets.map(async (tweet) => {
				const profile = await TwitterProfileDB.getProfile(tweet.source);

				return {
					...tweet,
					profile,
					likes: 0,
					retweets: 0,
					isLiked: false,
					isRetweeted: false,
					isMine: profile.source === source,
				};
			})
		);
	}
}

const TwitterContentDb = new _TwitterDB();
export { TwitterContentDb };
