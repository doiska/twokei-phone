import { useRecoilCallback } from 'recoil';

import { CallEvents, CallHistoryItem } from '@typings/call';
import { useNuiEvent } from 'fivem-nui-react-lib';

import { dialState, useSetDialHistory } from '@apps/Dial/hooks/state';

export const useDialService = () => {
	const setDialHistory = useSetDialHistory();

	const saveCall = useRecoilCallback(
		({ snapshot }) =>
			(call: CallHistoryItem) => {
				const { state } = snapshot.getLoadable(dialState.history);

				if (state !== 'hasValue') return;

				setDialHistory((curr) => [call, ...curr]);
			},
		[]
	);

	useNuiEvent('DIAL', CallEvents.WAS_ACCEPTED, saveCall);
	useNuiEvent('DIAL', CallEvents.WAS_REJECTED, saveCall);
};
