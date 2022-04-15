import CallSchema from '@entity/calls.schema';
import { ActiveCall, CallHistoryItem, RawActiveCall } from '@typings/call';
import { Op } from 'sequelize';

class CallsRepo {
	async fetchCalls(phoneNumber: string, limit = 20) {
		return CallSchema.findAll({
			where: {
				[Op.or]: [
					{
						dialer: phoneNumber,
					},
					{
						receiver: phoneNumber,
					},
				],
			},
			order: [['start', 'DESC']],
			limit,
		});
	}

	async saveCall({ identifier, dialer, receiver, start }: CallHistoryItem | RawActiveCall) {
		return CallSchema.create({
			identifier,
			dialer,
			receiver,
			start,
		});
	}

	async updateCall({ identifier }: CallHistoryItem | RawActiveCall, isAccepted: boolean, end: number) {
		return CallSchema.update(
			{
				isAccepted: isAccepted,
				end: end,
			},
			{
				where: {
					identifier: identifier,
				},
			}
		);
	}
}

export { CallsRepo };

const CallsDB = new CallsRepo();
export default CallsDB;
