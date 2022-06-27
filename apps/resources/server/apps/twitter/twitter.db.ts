import { TweetDTO, FormattedTweet } from '@typings/twitter';
import TweetItemSchema from 'entity/twitter/tweets.schema';

class TwitterDB {
	async createTweet(
		source: string,
		tweet: TweetDTO
	): Promise<FormattedTweet> {
		const profileId = 123;

		const res = await TweetItemSchema.create(
			{
				source,
				...tweet,
			},
			{
				raw: true,
			}
		).then((res) => res.get({ plain: true }));

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
