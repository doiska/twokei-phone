"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Apps_1 = __importDefault(require("@shared/Apps"));
const twitter_1 = require("@typings/twitter");
const NUI_1 = require("@utils/NUI");
(0, NUI_1.RegisterNUIProxy)(twitter_1.TwitterEvents.FETCH_TWEETS);
(0, NUI_1.RegisterNUIProxy)(twitter_1.TwitterEvents.UPDATE_OR_CREATE_PROFILE);
(0, NUI_1.RegisterNUIProxy)(twitter_1.TwitterEvents.GET_PROFILE);
(0, NUI_1.RegisterNUIProxy)(twitter_1.TwitterEvents.CREATE_TWEET);
(0, NUI_1.RegisterNUIProxy)(twitter_1.TwitterEvents.DELETE_TWEET);
// RegisterNUIProxy(TwitterEvents.RETWEET_TWEET);
onNet(twitter_1.TwitterEvents.BROADCAST_TWEET, (tweet) => {
    console.log(`handleTweetBroadcast: ${JSON.stringify(tweet)}`);
    (0, NUI_1.sendNUIEvent)(Apps_1.default.TWITTER, twitter_1.TwitterEvents.BROADCAST_TWEET, tweet);
});
