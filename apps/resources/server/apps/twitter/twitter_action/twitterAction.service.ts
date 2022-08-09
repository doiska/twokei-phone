import { TwitterActionDB } from "@apps/twitter/twitter_action/twitterAction.db";

import { ToggleAction } from "@typings/twitter";

import { PromiseRequest, PromiseEventResponse } from "@server-types/promises";

export async function toggleAction(req: PromiseRequest<ToggleAction>, resp: PromiseEventResponse<void>) {

	const { tweetId, action } = req.data;

	const isActionActive = await TwitterActionDB.getActionStatus(req.identifier, tweetId, action);

	if (isActionActive) {
		await TwitterActionDB.removeAction(req.identifier, tweetId, action);
	} else {
		await TwitterActionDB.createAction(req.identifier, tweetId, action);
	}

	resp({ status: 'ok' });
}