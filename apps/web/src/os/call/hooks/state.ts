import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ActiveCall } from '@typings/call';

export enum ModalState {
	CALLING,
	INCOMING,
	ONGOING,
	OPEN,
	CLOSED,
}

export const callState = {
	currentCall: atom<ActiveCall | null>({
		key: 'callState.currentCall',
		default: null,
	}),
	callModal: atom<ModalState>({
		key: 'callState.callModal',
		default: ModalState.CLOSED,
	}),
	callDuration: atom({
		key: 'callState.callDuration',
		default: { ms: 0, s: 0, m: 0, h: 0 },
	}),
};

export const useCurrentCall = () => useRecoilState(callState.currentCall);
export const useCurrentCallValue = () => useRecoilValue(callState.currentCall);

export const useCallModal = () => useRecoilState(callState.callModal);
export const useSetCallModal = () => useSetRecoilState(callState.callModal);
export const useCallModalValue = () => useRecoilValue(callState.callModal);

export const useCallDuration = () => useRecoilState(callState.callDuration);
