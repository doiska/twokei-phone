import { PromiseRequest, PromiseEventResponse } from 'lib/promise.types';
import { TweetDTO, TwitterEvents } from '@typings/twitter';
import TwitterDB from './twitter.db';

class TwitterService {
	private twitterDB: TwitterDB;

	constructor() {
		this.twitterDB = new TwitterDB();
	}

	async handleCreateTweet(
		req: PromiseRequest<TweetDTO>,
		resp: PromiseEventResponse<void>
	) {
		try {
			const create = await this.twitterDB.createTweet(
				req.source.toString(),
				req.data
			);

			console.log(`Created tweet: ${create.id}`, JSON.stringify(create));

			resp({ status: 'ok' });
			emitNet(TwitterEvents.BROADCAST_TWEET, -1, create);
		} catch (err) {
			console.error(err);
			resp({ status: 'error', errorMsg: err.message });
		}
	}
}

export default new TwitterService();
