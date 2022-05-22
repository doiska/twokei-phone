import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import { Profile, ServerPromiseResp } from '@typings/common';
import { TwitterEvents, FormattedTweet, Tweet } from '@typings/twitter';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { MockTwitterProfile, MockTweets } from '@apps/twitter/Twitter.mock';
import { handleTweet } from '@apps/twitter/utils/tweets';

export const twitterState = {
	profile: atom<Profile | undefined>({
		key: 'twitter:profile',
		default: selector<Profile | undefined>({
			key: 'twitter:default:profile',
			get: async () => {
				try {
					const response = await fetchNui<ServerPromiseResp<Profile>>(
						TwitterEvents.GET_OR_CREATE_PROFILE,
						undefined,
						buildRespObj(MockTwitterProfile)
					);
					return response.data;
				} catch (error) {
					console.error(error);
					return;
				}
			},
		}),
	}),

	tweets: atom<FormattedTweet[]>({
		key: 'twitter:tweets',
		default: selector({
			key: 'twitter:default:tweets',
			get: async () => {
				try {
					const response = await fetchNui<ServerPromiseResp<Tweet[]>>(
						TwitterEvents.FETCH_TWEETS,
						undefined,
						buildRespObj(MockTweets)
					);

					if (response.data)
						return response.data.map((tweet) => handleTweet(tweet));

					return [];
				} catch (error) {
					console.error(error);
					return [];
				}
			},
		}),
	}),

	tweetsWithFilter: atom<FormattedTweet[]>({
		key: 'twitter:tweets:with:filter',
		default: [],
	}),

	showCreateTweet: atom({
		key: 'twitter:show:create:tweet',
		default: false,
	}),

	createTweetContent: atom({
		key: 'twitter:modal:message:content',
		default: '',
	}),

	unreadTweetsCount: atom({
		key: 'twitter:unread:tweets:count',
		default: 0,
	}),

	pageId: atom({
		key: 'twitter:page:id',
		default: '',
	}),
};

export const useTweetsState = () => useRecoilState(twitterState.tweets);
export const useTweetsValue = () => useRecoilValue(twitterState.tweets);
export const useSetTweets = () => useSetRecoilState(twitterState.tweets);

export const useTwitterProfile = () => useRecoilState(twitterState.profile);
export const useTwitterProfileValue = () =>
	useRecoilValue(twitterState.profile);
export const useSetTwitterProfile = () =>
	useSetRecoilState(twitterState.profile);

export const useFilteredTweets = () =>
	useRecoilState(twitterState.tweetsWithFilter);
export const useFilteredTweetsValue = () =>
	useRecoilValue(twitterState.tweetsWithFilter);
export const useSetFilteredTweets = () =>
	useSetRecoilState(twitterState.tweetsWithFilter);
