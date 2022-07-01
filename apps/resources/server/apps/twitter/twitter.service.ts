import { PromiseRequest, PromiseEventResponse } from '@lib/promise.types';

import { Profile } from '@typings/common';
import { TweetDTO, TwitterEvents, TwitterProfile } from '@typings/twitter';

import { uuid } from 'uuidv4';

import { TwitterDB } from './twitter.db';

class TwitterService {
	private twitterDB: TwitterDB;

	constructor() {
		this.twitterDB = new TwitterDB();
	}

	async handleCreateProfile(
		req: PromiseRequest<Profile | undefined>,
		res: PromiseEventResponse<TwitterProfile>
	) {
		try {
			const found = await this.twitterDB.getProfile(req.source);
			if (found) return res({ status: 'ok', data: found });

			const randomName = uuid();

			const createdProfile = await this.twitterDB.createProfile(
				req.source,
				{
					name: randomName,
					username: randomName,
					...req.data,
				}
			);

			console.log(
				`Created profile: ${createdProfile.id}`,
				JSON.stringify(createdProfile)
			);

			res({ status: 'ok', data: createdProfile });
		} catch (err) {
			console.error(err);
			res({ status: 'error', errorMsg: err.message });
		}
	}

	async handleUpdateOrCreateProfile(
		req: PromiseRequest<Profile>,
		res: PromiseEventResponse<TwitterProfile>
	) {
		try {
			const found = await this.twitterDB.getProfile(req.source);
			if (found) {
				console.log(`Updating profile: ${found.id}`);
				const updated = await this.twitterDB.updateProfile(
					req.source,
					req.data
				);
				res({ status: 'ok', data: updated });
			} else {
				console.log(`Creating profile: ${req.source}`);
				const created = await this.twitterDB.createProfile(
					req.source,
					req.data
				);
				res({ status: 'ok', data: created });
			}
		} catch (err) {
			console.error(err);
			res({ status: 'error', errorMsg: err.message });
		}
	}

	async handleGetProfile(
		req: PromiseRequest<void>,
		res: PromiseEventResponse<TwitterProfile | undefined>
	) {
		try {
			const found = await this.twitterDB.getProfile(req.source);
			res({ status: 'ok', data: found });
		} catch (err) {
			console.error(err);
			res({ status: 'error', errorMsg: err.message });
		}
	}

	async handleCreateTweet(
		req: PromiseRequest<TweetDTO>,
		resp: PromiseEventResponse<void>
	) {
		try {
			const create = await this.twitterDB.createTweet(
				req.source,
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
