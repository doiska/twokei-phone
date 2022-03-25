import useNuiEvent from '@common/hooks/useNuiEvent';
import InjectDebugData from '@debug/InjectDebugData';
import { PhoneEvents } from '@typings/phone';
import { useSetRecoilState } from 'recoil';

import { simcardState } from './state';
import { usePhoneNumber } from './usePhoneNumber';

export const useSimcardService = () => {
	InjectDebugData([
		{
			app: 'SIMCARD',
			method: PhoneEvents.SET_NUMBER,
			data: '0147-0147',
		},
	]);

	const setNumber = useSetRecoilState(simcardState.number);
	useNuiEvent('SIMCARD', PhoneEvents.SET_NUMBER, setNumber);

	return usePhoneNumber();
};
