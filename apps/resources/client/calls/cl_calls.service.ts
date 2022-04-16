import { ActiveCall, CallEvents, CallRejectReasons } from '@typings/call';
import { sendNUIEvent } from '@utils/NUI';

export class CallService {
	private current: number;
	private currentPending: string | null = null;

	//TODO: sounds

	constructor() {
		this.current = 0;
	}

	static sendCallEvent<T>(event: CallEvents, data: T): void {
		return sendNUIEvent('CALL', event, data);
	}

	static sendDialerAction<T>(event: CallEvents, data: T): void {
		return sendNUIEvent('DIAL', event, data);
	}

	isInCall() {
		return this.current !== 0;
	}

	isCurrentCall(target: number) {
		console.log(`[CallService] isCurrentCall: ${this.current} === ${target}`);

		return this.current === target;
	}

	isInPendingCall() {
		return !!this.currentPending;
	}

	isCurrentPendingCall(target: string) {
		return this.currentPending === target;
	}

	toggleModal(show: boolean) {
		CallService.sendCallEvent<boolean>(CallEvents.SHOW_MODAL, show);
	}

	async handleCallStart(dialer: string, receiver: string, isDialer: boolean, isUnavailable: boolean) {
		if (this.isInCall() || this.currentPending) {
			console.log(`[CallService] handleCallStart: already in call.`, this.isInCall(), this.currentPending);
			return emitNet(CallEvents.WAS_REJECTED, { dialer: dialer }, CallRejectReasons.Busy);
		}

		this.currentPending = dialer;
		this.toggleModal(true);

		console.log(`[CallService] handleCallStart: ${dialer} -> ${receiver}`);
		CallService.sendCallEvent<ActiveCall>(CallEvents.SET_INFO, {
			dialer: dialer,
			receiver: receiver,
			isDialer: isDialer,
			isUnavailable: false,
			isAccepted: false,
		});
	}

	async handleCallAccepted(data: ActiveCall) {
		console.log(`[CallService] ChannelId ${data.channelId}`);

		this.current = data.channelId;
		this.currentPending = null;
		//TODO: add to voice

		console.log(`[CallService] handleCallAccepted: ${data.dialer} -> ${data.receiver}`);
		CallService.sendCallEvent<ActiveCall>(CallEvents.SET_INFO, data);
	}

	async handleCallRejected(receiver: string) {
		if (this.isInCall() || !this.isCurrentPendingCall(receiver)) {
			console.log(`[CallService] handleCallRejected: not in call.`);
			return;
		}

		console.log(`[CallService] handleCallRejected: ${receiver}`);

		this.currentPending = null;
		this.toggleModal(false);
		CallService.sendCallEvent(CallEvents.SET_INFO, null);
	}

	async handleCallEnd() {
		console.log(`[CallService] handleCallEnd`);

		this.current = 0;
		this.currentPending = null;
		this.toggleModal(false);

		CallService.sendCallEvent(CallEvents.SET_INFO, null);
	}
}
