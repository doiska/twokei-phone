import { createTweet, deleteTweet } from "@apps/twitter/twitter_content/twitterContent.service";
import { fetchProfile, createProfile } from "@apps/twitter/twitter_profile/twitterProfile.service";
import { onNetPromise } from "@lib/onNetPromise";

import { TweetDTO, Tweet, TwitterEvents, TwitterProfile } from "@typings/twitter";

onNetPromise<TwitterProfile, TwitterProfile>(TwitterEvents.UPDATE_OR_CREATE_PROFILE, createProfile);
onNetPromise<{ id: number }, TwitterProfile>(TwitterEvents.GET_PROFILE, fetchProfile);