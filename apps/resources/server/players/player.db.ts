import { XiaoDS } from '@db/xiao';

import { FiveUserModel } from 'models/FiveUserModel';

export class PlayerDB {
	async fetchIdentifierByPhone(phone: string): Promise<string | null> {
		return XiaoDS.getRepository(FiveUserModel)
			.findOne({
				where: { phoneNumber: phone },
			})
			.then((user) => {
				return user ? user.identifier : null;
			});
	}

	async fetchPhoneByIdentifier(identifier: string): Promise<string | null> {
		return XiaoDS.getRepository(FiveUserModel)
			.findOne({
				where: { identifier },
			})
			.then((user) => {
				return user ? user.phoneNumber : null;
			});
	}
}

export default new PlayerDB();
