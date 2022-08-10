import { TwitterActionDB, Action } from "@apps/twitter/twitter_action/twitterAction.db";
import { TwitterContentDB } from "@apps/twitter/twitter_content/twitterContent.db";

import { ToggleAction } from "@typings/twitter";

import { PromiseRequest, PromiseEventResponse } from "@server-types/promises";

export async function handleRetweet(req: PromiseRequest<ToggleAction>, resp: PromiseEventResponse<void>) {

	const { tweetId: targetTweetId, action } = req.data;
	const result = await setAction(req.identifier, targetTweetId, action);

	if (result) {
		const targetTweet = await TwitterContentDB.fetchTweet(targetTweetId);

		if (targetTweet) {
			await TwitterContentDB.createTweet(req.identifier, {
				content: targetTweet.content,
				images: targetTweet.images.split('|||'),
				retweet_id: targetTweetId
			});
			console.log(`[TWEET] Retweeted`, targetTweet);
		}
	} else {
		await TwitterActionDB.deleteRetweet(req.identifier, targetTweetId);
	}

	resp({ status: 'ok' });
}

async function setAction(identifier: string, tweetId: number, action: Action) {
	const isActionActive = await TwitterActionDB.getActionStatus(identifier, tweetId, action);

	if (isActionActive) {
		await TwitterActionDB.removeAction(identifier, tweetId, action);
		return false;
	} else {
		await TwitterActionDB.createAction(identifier, tweetId, action);
		return true;
	}
}