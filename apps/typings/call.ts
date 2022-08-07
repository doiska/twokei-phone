export interface RawActiveCall {
	identifier: string;
	dialer: string;
	dialerSource?: number;
	receiver: string;
	receiverSource?: number;
	start: string;
	isAccepted: boolean;
}

export interface ActiveCall {
	start?: string;

	isAccepted: boolean;
	isDialer: boolean;

	dialer: string;
	receiver: string;

	channelId?: number;
	identifier?: string;

	isUnavailable?: boolean;
}

export interface InitizalizeCallDTO {
	receiverNumber: string;
}

export interface EndCallDTO {
	dialerNumber: string;
	isDialer: boolean;
	isUnavailable: boolean;
}

export interface CallHistoryItem {
	id?: number;
	identifier?: string;
	dialer: string;
	dialerSource?: number;
	receiver: string;
	receiverSource?: number;
	start: string;
	end?: string;
	isAccepted: boolean;
}

export interface StartCallEventData {
	dialer: string;
	receiver: string;
	isDialer: boolean;
	isUnavailable?: boolean;
}

export interface AcceptedCallEventData {
	channelId: number;
	isDialer: boolean;
	currentCall: ActiveCall;
}

export interface WasAcceptedCallEventData {
	channelId: number;
	isDialer: boolean;
	currentCall: CallHistoryItem;
}

export interface DialerDTO {
	dialerNumber: string;
}

export enum CallRejectReasons {
	Busy = 'busy',
	Unavailable = 'unavailable',
	Declined = 'declined',
	Unknown = 'unknown',
}

export enum CallEvents {
	/* DIALER */
	INITIALIZE_CALL = 'tkphone:call:initialize',
	START_CALL = 'tkphone:call:start',
	WAS_ACCEPTED = 'tkphone:call:accepted',
	WAS_REJECTED = 'tkphone:call:rejected',

	/* RECEIVER */
	ACCEPT_CALL = 'tkphone:call:accept',
	REJECT_CALL = 'tkphone:call:reject',

	/* SHARED */
	SHOW_MODAL = 'tkphone:call:show',
	HANGUP_CALL = 'tkphone:call:end',
	WAS_ENDED = 'tkphone:call:ended',

	/* DATA */
	FETCH_CALLS = 'tkphone:call:fetch',
	SET_INFO = 'tkphone:call:setInfo',
	SAVE_CALL = 'tkphone:call:save',
}
