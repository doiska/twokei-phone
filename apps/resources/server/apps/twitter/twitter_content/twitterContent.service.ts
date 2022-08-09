import { TwitterContentDB } from "@apps/twitter/twitter_content/twitterContent.db";

import { TweetDTO, Tweet } from "@typings/twitter";

import { PromiseEventResponse, PromiseRequest } from "@server-types/promises";

export async function createTweet(req: PromiseRequest<TweetDTO>, resp: PromiseEventResponse<Tweet>) {
	const tweet = await TwitterContentDB.createTweet(req.identifier, req.data);
	resp({ status: 'ok', data: tweet });
}

export async function deleteTweet(req: PromiseRequest<{ tweetId: number }>, resp: PromiseEventResponse<void>) {
	try {
		await TwitterContentDB.deleteTweet(req.data.tweetId);
		resp({ status: 'ok' });
	} catch (err) {
		resp({ status: 'error', errorMsg: err.message });
	}
}