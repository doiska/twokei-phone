import { createTweet, deleteTweet } from "@apps/twitter/twitter_content/twitterContent.service";
import { onNetPromise } from "@lib/onNetPromise";

import { TweetDTO, Tweet, TwitterEvents } from "@typings/twitter";

onNetPromise<TweetDTO, Tweet>(TwitterEvents.CREATE_TWEET, createTweet);
onNetPromise<{ tweetId: number }, void>(TwitterEvents.DELETE_TWEET, deleteTweet);