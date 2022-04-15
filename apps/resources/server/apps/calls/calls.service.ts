import { ActiveCall, CallEvents, CallHistoryItem, EndCallDTO, InitizalizeCallDTO, RawActiveCall } from '@typings/call';
import Collection from '@discordjs/collection';
import CallsDB, { CallsRepo } from '@apps/calls/calls.db';
import { PromiseEventResponse, PromiseRequest } from '@lib/promise.types';
import Service from '@common/service';
import PlayerService from 'players/player.service';
import { emitNetTyped } from '@utils/fivem';

class CallsService extends Service {
	private callMap: Collection<string, RawActiveCall>;
	private readonly callsDB: CallsRepo;

	constructor() {
		super('Calls');

		this.callMap = new Collection();
		this.callsDB = CallsDB;
	}

	async setToMap(dialer: string, raw: RawActiveCall) {
		this.callMap.set(dialer, raw);
		this.logger.debug(`Added call to map: ${dialer} -> ${raw}`);
	}

	async handleInitializeCall(req: PromiseRequest<InitizalizeCallDTO>, res: PromiseEventResponse<ActiveCall>) {
		const dialerPlayer = PlayerService.getPlayer(req.source);
		const dialerNumber = dialerPlayer.phoneNumber;

		const receiverIdentifier = await PlayerService.getIdentifierByPhone(req.data.receiverNumber, true);

		const startCallTime = Math.floor(new Date().getTime() / 1000);

		const callIdentifier = `${dialerNumber}-${receiverIdentifier}-${startCallTime}`;

		const rawTempCall = {
			identifier: callIdentifier,
			dialer: dialerNumber,
			receiver: receiverIdentifier,
			isAccepted: false,
			start: startCallTime,
		} as CallHistoryItem;

		if (!receiverIdentifier) {
			await this.callsDB.saveCall(rawTempCall);
			return res({
				status: 'ok',
				data: {
					identifier: callIdentifier,
					dialer: dialerNumber,
					isDialer: true,
					receiver: req.data.receiverNumber,
					start: startCallTime,
					isAccepted: false,
					isUnavailable: true,
				},
			});
		}

		const receiverPlayer = PlayerService.getPlayerByIdentifier(receiverIdentifier);

		if (!receiverPlayer) {
			await this.callsDB.saveCall(rawTempCall);
			return res({
				status: 'ok',
				data: {
					identifier: callIdentifier,
					start: startCallTime,
					isDialer: true,
					dialer: dialerNumber,
					receiver: req.data.receiverNumber,
					isAccepted: false,
					isUnavailable: true,
				},
			});
		}

		this.logger.debug(`Receiver player: ${receiverIdentifier}`);
		this.logger.debug(`Receiver source: ${receiverPlayer.source}`);

		const call: RawActiveCall = {
			identifier: callIdentifier,
			dialer: dialerNumber,
			dialerSource: dialerPlayer.source,
			receiver: receiverIdentifier,
			receiverSource: receiverPlayer.source,
			start: startCallTime.toString(),
			isAccepted: false,
		};

		this.setToMap(call.dialer, call);

		try {
			await this.callsDB.saveCall(call);
		} catch (e) {
			this.logger.error(e);
			res({ status: 'error', errorMsg: 'DATABASE_ERROR' });
		}

		res({
			status: 'ok',
			data: {
				identifier: callIdentifier,
				dialer: dialerNumber,
				receiver: req.data.receiverNumber,
				isAccepted: false,
				isUnavailable: false,
				isDialer: true,
			},
		});

		emitNetTyped<ActiveCall>(
			CallEvents.START_CALL,
			{
				isAccepted: false,
				dialer: dialerNumber,
				receiver: req.data.receiverNumber,
				isDialer: false,
			},
			receiverPlayer.source
		);
	}

	async handleAcceptCall(source: number, dialerNumber: string) {
		const target = this.callMap.get(dialerNumber);
		target.isAccepted = true;

		const channelId = target.dialerSource;

		await this.callsDB.updateCall(target, true, null);

		emitNetTyped<ActiveCall>(
			CallEvents.WAS_ACCEPTED,
			{
				isAccepted: true,
				dialer: dialerNumber,
				receiver: target.receiver,
				isDialer: false,
				channelId,
			},
			target.receiverSource as number
		);

		this.logger.debug(`Call ${target.identifier} was accepted ${target.dialer} -> ${target.receiver} ${target}`);
	}

	async handleRejectCall(source: number, dialerNumber: string) {
		const current = this.callMap.get(dialerNumber);

		const endUnix = Math.floor(new Date().getTime() / 1000);

		if (!current) {
			this.logger.error(`Call ${dialerNumber} was not found.`);
			return;
		}

		emitNet(CallEvents.WAS_REJECTED, current.dialerSource, current);
		emitNet(CallEvents.WAS_REJECTED, current.receiverSource, current);

		await this.callsDB.updateCall(current, false, endUnix);

		this.callMap.delete(dialerNumber);
	}

	async handleEndCall(req: PromiseRequest<EndCallDTO>, res: PromiseEventResponse<void>) {
		const dialerNumber = req.data.dialerNumber;

		const endUnix = Math.floor(new Date().getTime() / 1000);

		if (req.data.isUnavailable) {
			emitNet(CallEvents.WAS_ENDED, req.source);
			res({ status: 'ok' });
			return;
		}

		const current = this.callMap.get(dialerNumber);

		if (!current) {
			this.logger.error(`Call ${dialerNumber} was not found.`);
			return res({ status: 'error', errorMsg: 'CALL_NOT_FOUND' });
		}

		if (current) {
			if (current.isAccepted) {
				emitNet(CallEvents.WAS_ENDED, current.receiverSource, current);
				emitNet(CallEvents.WAS_ENDED, current.dialerSource, current);
			} else {
				emitNet(CallEvents.WAS_REJECTED, current.dialerSource, current);
				emitNet(CallEvents.WAS_REJECTED, current.receiverSource, current);
			}
		}

		res({ status: 'ok' });

		await this.callsDB.updateCall(current, current?.isAccepted, endUnix);
		this.callMap.delete(dialerNumber);
	}
}

export default new CallsService();
