import Apps from '@shared/Apps';

import { TwitterEvents } from '@typings/twitter';

import { RegisterNUIProxy, sendNUIEvent } from '@utils/NUI';


RegisterNUIProxy(TwitterEvents.FETCH_TWEETS);
RegisterNUIProxy(TwitterEvents.UPDATE_OR_CREATE_PROFILE);
RegisterNUIProxy(TwitterEvents.GET_PROFILE);
RegisterNUIProxy(TwitterEvents.CREATE_TWEET);
RegisterNUIProxy(TwitterEvents.DELETE_TWEET);
// RegisterNUIProxy(TwitterEvents.RETWEET_TWEET);

onNet(TwitterEvents.BROADCAST_TWEET, (tweet: any) => {
	console.log(`handleTweetBroadcast: ${JSON.stringify(tweet)}`);
	sendNUIEvent(Apps.TWITTER, TwitterEvents.BROADCAST_TWEET, tweet);
});
