import { XiaoDS } from "@db/xiao";
import { TwitterProfileModel } from "@models/Twitter.model";

import { TwitterProfile } from "@typings/twitter";

class _TwitterProfileDB {

	fetchProfile(identifier: string): Promise<TwitterProfile> {
		return XiaoDS.getRepository(TwitterProfileModel).findOne({ where: { identifier }, cache: 1000 * 30 });
	}
}

export const TwitterProfileDB = new _TwitterProfileDB();