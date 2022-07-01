import TwitterService from '@apps/twitter/twitter.service';
import { onNetPromise } from '@lib/onNetPromise';

import { Profile } from '@typings/common';
import { TweetDTO, TwitterEvents, TwitterProfile } from '@typings/twitter';

onNetPromise<TweetDTO, void>(TwitterEvents.CREATE_TWEET, async (req, res) => {
	await TwitterService.handleCreateTweet(req, res);
});

onNetPromise<Profile, TwitterProfile>(
	TwitterEvents.UPDATE_OR_CREATE_PROFILE,
	async (req, res) => {
		await TwitterService.handleUpdateOrCreateProfile(req, res);
	}
);
onNetPromise<void, TwitterProfile>(
	TwitterEvents.GET_PROFILE,
	async (req, res) => {
		await TwitterService.handleGetProfile(req, res);
	}
);
