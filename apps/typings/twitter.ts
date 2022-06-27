import { Profile } from '@typings/common';

export type SETTINGS_ALL_TWEETS = 'all';
export type SETTINGS_MENTION = 'mentions';

/**
 *
 * Tabela tweet_item: armazenar conteúdo, source e identificador do usuário
 *
 * Tabela tweet_actions: armazenar likes e retweets
 * Tabela twitter_profile: armazenar informações do usuário
 *
 */

export interface TwitterProfile extends Profile {
	description?: string;
}

export interface TweetDTO {
	id?: number;
	source?: string;

	content: string;
	images?: string[];

	createdAt?: string;
	updatedAt?: string;
}

export interface FormattedTweet extends TweetDTO {
	id: number;
	profile: TwitterProfile;

	likes?: number;
	retweets?: number;

	isMine?: boolean;
	isLiked?: boolean;
	isRetweeted?: boolean;
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

	TOGGLE_LIKE = 'tkphone:twitter:like:tweet',
	TOGGLE_RETWEET = 'tkphone:twitter:retweet:tweet',
	REPORT_TWEET = 'tkphone:twitter:report:tweet',
}
