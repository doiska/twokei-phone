import { XiaoDS } from "@db/xiao";
import { TwitterActionModel } from "@models/Twitter.model";

type CountResult = {
	likes: number;
	retweets: number;
	total: number;
}

type LikedOrRetweeted = {
	liked: boolean;
	retweeted: boolean;
}

class _TwitterActionDB {

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

	fetchActionByTweetId(tweetId: number, action: string): Promise<number> {
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