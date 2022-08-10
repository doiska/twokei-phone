import { XiaoDS } from "@db/xiao";
import { TwitterActionModel, TweetItemModel } from "@models/Twitter.model";

import { TwitterAction } from "@typings/twitter";

type CountResult = {
	likes: number;
	retweets: number;
	total: number;
}

type LikedOrRetweeted = {
	liked: boolean;
	retweeted: boolean;
}

export type Action = 'like' | 'retweet';

class _TwitterActionDB {

	async createAction(identifier: string, tweetId: number, action: TwitterAction): Promise<void> {
		await XiaoDS.getRepository(TwitterActionModel).save({ identifier, tweet_id: tweetId, action });
	}

	async removeAction(identifier: string, tweetId: number, action: TwitterAction): Promise<void> {
		await XiaoDS.getRepository(TwitterActionModel).delete({ identifier, tweet_id: tweetId, action });
	}

	async getActionStatus(identifier: string, tweetId: number, action: TwitterAction): Promise<boolean> {
		const result = await XiaoDS.getRepository(TwitterActionModel).find({ where: { identifier, tweet_id: tweetId, action } });
		return result.length > 0;
	}

	async fetchRetweet(identifier: string, retweetId: number): Promise<TweetItemModel> {
		return await XiaoDS.getRepository(TweetItemModel).findOne({ where: { identifier, retweet: retweetId } });
	}

	async deleteRetweet(identifier: string, retweetId: number): Promise<void> {
		await XiaoDS.getRepository(TweetItemModel).delete({ identifier, retweet: retweetId });
	}

	async fetchBothActionsByTweetId(tweetId: number): Promise<CountResult> {
		const { total, retweets, likes } = await XiaoDS.getRepository(TwitterActionModel)
			.createQueryBuilder('action')
			.cache(1000 * 30)
			.addSelect('COUNT(*) as total')
			.addSelect('COUNT (CASE WHEN action.action = \'like\' THEN 1 ELSE NULL END) as likes')
			.addSelect('COUNT (CASE WHEN action.action = \'retweet\' THEN 1 ELSE NULL END) as retweets')
			.where('action.tweet_id = :tweetId', { tweetId })
			.getRawOne<CountResult>();

		return {
			likes,
			retweets,
			total
		};
	}

	fetchActionByTweetId(tweetId: number, action: Action): Promise<number> {
		return XiaoDS.getRepository(TwitterActionModel).count({ where: { tweet_id: tweetId, action } });
	}

	async isLikedOrRetweeted(tweetId: number, identifier: string): Promise<LikedOrRetweeted> {
		const result = await XiaoDS.getRepository(TwitterActionModel).find({ where: { tweet_id: tweetId, identifier } });

		return {
			liked: result.some(item => item.action === 'like'),
			retweeted: result.some(item => item.action === 'retweet')
		};
	}
}

export const TwitterActionDB = new _TwitterActionDB();