import { XiaoDS } from '@db/xiao';
import { CallModel } from '@models/Call.model';

import { CallHistoryItem, RawActiveCall } from '@typings/call';

export class CallDB {
	async fetchCalls(phoneNumber: string, limit = 20) {
		return XiaoDS.getRepository(CallModel).find({
			where: [{ dialer: phoneNumber }, { receiver: phoneNumber }],
			take: limit,
			order: { start: 'DESC' },
		});
	}

	async saveCall(call: CallHistoryItem | RawActiveCall) {
		return XiaoDS.getRepository(CallModel).save({ ...call });
	}

	async updateCall(
		{ identifier }: CallHistoryItem | RawActiveCall,
		isAccepted: boolean,
		end: string
	) {
		return XiaoDS.getRepository(CallModel).update(
			{ identifier },
			{
				isAccepted,
				end,
			}
		);
	}
}
