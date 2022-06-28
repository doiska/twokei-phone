import { TweetDTO, FormattedTweet } from '@typings/twitter';
import { XiaoDS } from 'db/xiao';
import { TweetItemModel } from 'entities/Twitter.entity';

class TwitterDB {
	async createTweet(
		source: number,
		tweet: TweetDTO
	): Promise<FormattedTweet> {
		const profileId = 123;

		const res = await XiaoDS.getRepository(TweetItemModel).save({
			...tweet,
			source,
		});

		console.log(`Created tweet: ${res.id}`, res);

		return {
			...res,
			id: res.id,
			profile: {
				id: profileId,
				source,
				name: 'doiska',
				username: 'doiska',
			},
			isMine: true,
		};
	}
}

export default TwitterDB;
