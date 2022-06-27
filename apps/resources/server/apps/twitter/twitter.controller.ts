import { onNetPromise } from '@lib/onNetPromise';
import { TweetDTO, TwitterEvents } from '@typings/twitter';
import TwitterService from 'apps/twitter/twitter.service';

onNetPromise<TweetDTO, void>(TwitterEvents.CREATE_TWEET, async (req, res) => {
	await TwitterService.handleCreateTweet(req, res);
});
