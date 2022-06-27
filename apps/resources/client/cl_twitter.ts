import { RegisterNUIProxy, sendNUIEvent } from '@utils/NUI';
import { TwitterEvents } from '@typings/twitter';
import Apps from '@shared/Apps';

RegisterNUIProxy(TwitterEvents.FETCH_TWEETS);
RegisterNUIProxy(TwitterEvents.CREATE_TWEET);
RegisterNUIProxy(TwitterEvents.DELETE_TWEET);
// RegisterNUIProxy(TwitterEvents.RETWEET_TWEET);

onNet(TwitterEvents.BROADCAST_TWEET, (tweet: any) =>
	sendNUIEvent(Apps.TWITTER, TwitterEvents.BROADCAST_TWEET, tweet)
);
