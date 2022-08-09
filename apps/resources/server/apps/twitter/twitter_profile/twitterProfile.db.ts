import { XiaoDS } from "@db/xiao";
import { TwitterProfileModel } from "@models/Twitter.model";

import { TwitterProfile } from "@typings/twitter";

class _TwitterProfileDB {

	createProfile(identifier: string, twitterProfile: TwitterProfile): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).save({ ...twitterProfile, identifier });
	}

	deleteProfileById(id: number) {
		return XiaoDS.getRepository(TwitterProfileModel).delete({ id });
	}

	deleteProfileByIdentifier(identifier: string) {
		return XiaoDS.getRepository(TwitterProfileModel).delete({ identifier });
	}

	fetchProfile(identifier: string): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).findOne({ where: { identifier }, cache: 1000 * 30 });
	}

	fetchProfileById(id: number): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).findOne({ where: { id }, cache: 1000 * 30 });
	}
}

export const TwitterProfileDB = new _TwitterProfileDB();