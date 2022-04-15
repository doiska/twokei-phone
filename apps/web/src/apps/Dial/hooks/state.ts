import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { CallEvents, CallHistoryItem } from '@typings/call';
import { ServerPromiseResp } from '@typings/common';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { MockHistoryData } from '@apps/Dial/hooks/mock';

export const dialState = {
	history: atom<CallHistoryItem[]>({
		key: 'dialHistory',
		default: selector({
			key: 'dialHistory',
			get: async () => {
				try {
					const response = await fetchNui<ServerPromiseResp<CallHistoryItem[]>>(
						CallEvents.FETCH_CALLS,
						{},
						buildRespObj(MockHistoryData, 'ok')
					);
					return response.data ?? [];
				} catch (e) {
					console.error(e);
					return [];
				}
			},
		}),
	}),
};

export const useDialHistory = () => useRecoilState(dialState.history);
export const useSetDialHistory = () => useSetRecoilState(dialState.history);
export const useDialHistoryValue = () => useRecoilValue(dialState.history);
