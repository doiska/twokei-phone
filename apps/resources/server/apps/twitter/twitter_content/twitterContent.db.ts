import { XiaoDS } from "@db/xiao";
import { TweetItemModel } from "@models/Twitter.model";

import { TwitterActionDB } from "@apps/twitter/twitter_action/twitterAction.db";
import { TwitterProfileDB } from "@apps/twitter/twitter_profile/twitterProfile.db";

import { TweetDTO, Tweet } from "@typings/twitter";

class _TwitterContentDB {

	async createTweet(identifier: string, tweet: TweetDTO): Promise<Tweet> {

		const insert = {
			identifier,
			content: tweet.content,
			images: tweet.images.join('|||'),
			retweet: tweet.retweet_id,
		} as TweetItemModel;

		const result = await XiaoDS.getRepository(TweetItemModel).save(insert);

		return {
			...result,
			profile: await TwitterProfileDB.fetchProfile(identifier),
			status: {
				mine: true,
				liked: false,
				retweeted: false,
			},
			count: {
				likes: 0,
				retweets: 0,
			}
		};
	}

	async deleteTweet(tweetId: number) {
		const result = await XiaoDS.getRepository(TweetItemModel).delete(tweetId);
		return !!result;
	}

	async fetchTweetDetails(identifier: string, tweetId: number) {
		return Promise.all([
			TwitterProfileDB.fetchProfile(identifier),
			TwitterActionDB.fetchBothActionsByTweetId(tweetId),
			TwitterActionDB.isLikedOrRetweeted(tweetId, identifier)
		]);
	}

	async fetchTweets(identifier: string, offset: number) {
		const result = await XiaoDS.getRepository(TweetItemModel).find({ take: 10 });

		console.log(`[TWEET] Fetching tweets`, result);

		const promises = result.map(async item => {

			const [profile, actions, isLikedOrRetweeted] = await this.fetchTweetDetails(identifier, item.id);

			console.log(`[TWEET] Fetching profile`, profile);
			console.log(`[TWEET] Fetching tweet actions`, actions);
			console.log(`[TWEET] Is liked or retweeted?`, isLikedOrRetweeted);

			return {
				...item,
				profile,
				status: {
					mine: profile.identifier === identifier,
					liked: isLikedOrRetweeted.liked,
					retweeted: isLikedOrRetweeted.retweeted,
				},
				count: actions
			} as Tweet;
		});

		return await Promise.all(promises);
	}
}

export const TwitterContentDB = new _TwitterContentDB();