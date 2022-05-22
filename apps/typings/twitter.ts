export type SETTINGS_ALL_TWEETS = 'all';
export type SETTINGS_MENTION = 'mentions';

export interface NewTweet {
	message: string;
	images?: string;
	retweet?: number;
}

interface Retweet {
	retweetId?: number;
	retweetedBy?: string;
	isRetweetedByUser?: boolean;
}

export interface Tweet extends NewTweet {
	id: number;

	source: string;
	sourceProfileId: number;
	sourceProfileUsername: string;
	sourceProfileName: string;
	sourceProfileAvatar: string;

	isMine: boolean;
	isLiked: boolean;
	isRetweeted: boolean;

	secondsAgo: number;

	createdAt: string;
	updatedAt: string;
}

export interface Image {
	id: string;
	url: string;
}

export interface FormattedTweet extends Omit<Tweet, 'images'> {
	images: Image[];
}

export enum TwitterEvents {
	FETCH_TWEETS = 'tkphone:twitter:fetch',
	FETCH_TWEETS_WITH_FILTER = 'tkphone:twitter:fetch:with:filter',

	CREATE_PROFILE = 'tkphone:twitter:create:profile',
	GET_OR_CREATE_PROFILE = 'tkphone:twitter:get:or:create:profile',
	UPDATE_PROFILE = 'tkphone:twitter:update:profile',

	CREATE_TWEET = 'tkphone:twitter:create:tweet',
	BROADCAST_TWEET = 'tkphone:twitter:broadcast:tweet',
	DELETE_TWEET = 'tkphone:twitter:delete:tweet',

	TOGGLE_LIKE_TWEET = 'tkphone:twitter:like:tweet',
	RETWEET_TWEET = 'tkphone:twitter:retweet:tweet',
	REPORT_TWEET = 'tkphone:twitter:report:tweet',
}
