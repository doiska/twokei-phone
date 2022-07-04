import { PromiseRequest, PromiseEventResponse } from '@lib/promise.types';

import {
	TweetCreateDTO,
	TwitterEvents,
	TwitterProfile,
	UnformattedTweet,
} from '@typings/twitter';

import { TwitterDB } from 'apps/twitter/twitter.db';

class TwitterService {
	async handleCreateTweet(
		req: PromiseRequest<TweetCreateDTO>,
		resp: PromiseEventResponse<void>
	) {
		try {
			const create = await TwitterDB.createTweet(req.source, req.data);

			console.log(`Created tweet: ${create.id}`, JSON.stringify(create));

			resp({ status: 'ok' });
			emitNet(TwitterEvents.BROADCAST_TWEET, -1, create);
		} catch (err) {
			console.error(err);
			resp({ status: 'error', errorMsg: err.message });
		}
	}

	async handleFetchTweets(
		req: PromiseRequest<void>,
		res: PromiseEventResponse<UnformattedTweet[]>
	) {
		try {
			const tweets = await TwitterDB.fetchTweets(req.source);
			res({ status: 'ok', data: tweets });
		} catch (err) {
			console.error(err);
			res({ status: 'error', errorMsg: err.message });
		}
	}
}

export default new TwitterService();
