import { Profile } from '@typings/common';
import { TweetDTO, FormattedTweet, TwitterProfile } from '@typings/twitter';

import { XiaoDS } from 'db/xiao';
import { TweetItemModel, TwitterProfileModel } from 'models/Twitter.model';

export class TwitterDB {
	async createProfile(
		source: number,
		profile?: Profile
	): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).save({
			source,
			...profile,
		});
	}

	async updateProfile(
		source: number,
		profile: Profile
	): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).save({
			source,
			...profile,
		});
	}

	async getProfile(source: number): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).findOne({
			where: { source },
		});
	}

	async createTweet(
		source: number,
		tweet: TweetDTO
	): Promise<FormattedTweet> {
		const profile = await this.getProfile(source);

		const res = await XiaoDS.getRepository(TweetItemModel).save({
			...tweet,
			source,
		});

		return {
			...res,
			profile,
			isMine: true,
		};
	}
}
