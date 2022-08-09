import { Profile } from "./common";

export type SETTINGS_ALL_TWEETS = 'all';
export type SETTINGS_MENTION = 'mentions';

export type TweetDTO = {
	retweet_id?: number;
	content: string;
	images?: string[];
}

export type TwitterAction = 'like' | 'retweet';

export type ToggleAction = {
	tweetId: number;
	action: TwitterAction;
}

export type Tweet = {
	id: number;
	identifier: string;
	content: string;
	profile: Profile;
	retweet?: number;
	status: {
		mine: boolean;
		liked: boolean;
		retweeted: boolean;
	},
	count: {
		likes: number;
		retweets: number;
	},
	created_at: string;
	updated_at?: string;
}

export type TwitterProfile = Profile & {
	description?: string;
}

export enum TwitterEvents {
	FETCH_TWEETS = 'tkphone:twitter:fetch',
	FETCH_TWEETS_WITH_FILTER = 'tkphone:twitter:fetch:with:filter',

	// CREATE_PROFILE = 'tkphone:twitter:create:profile',
	GET_PROFILE = 'tkphone:twitter:get:or:create:profile',
	UPDATE_OR_CREATE_PROFILE = 'tkphone:twitter:update_create:profile',

	CREATE_TWEET = 'tkphone:twitter:create:tweet',
	BROADCAST_TWEET = 'tkphone:twitter:broadcast:tweet',
	DELETE_TWEET = 'tkphone:twitter:delete:tweet',

	TOGGLE_ACTION = 'tkphone:twitter:toggle:action',
	REPORT_TWEET = 'tkphone:twitter:report:tweet',
}
