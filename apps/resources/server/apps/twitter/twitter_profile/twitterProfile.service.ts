import { TwitterProfileDB } from "@apps/twitter/twitter_profile/twitterProfile.db";

import { TweetDTO, Tweet, TwitterProfile } from "@typings/twitter";

import { PromiseRequest, PromiseEventResponse } from "@server-types/promises";

export async function createProfile(req: PromiseRequest<TwitterProfile>, resp: PromiseEventResponse<TwitterProfile>) {
	try {
		await TwitterProfileDB.createProfile(req.identifier, req.data);
		resp({ status: 'ok' });
	} catch (err) {
		resp({ status: 'error', errorMsg: err.message });
	}
}

export async function fetchProfile(req: PromiseRequest<{ id: number }>, resp: PromiseEventResponse<TwitterProfile>) {
	try {
		const profile = await TwitterProfileDB.fetchProfileById(req.data.id);
		resp({ status: 'ok', data: profile });
	} catch (err) {
		resp({ status: 'error', errorMsg: err.message });
	}
}