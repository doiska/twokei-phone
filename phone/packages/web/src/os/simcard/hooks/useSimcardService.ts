import { useRecoilState } from 'recoil';

import useNuiEvent from '@common/hooks/useNuiEvent';
import InjectDebugData from '@debug/InjectDebugData';
import { PhoneEvents } from '@typings/phone';

import { simcardState } from './state';
import { usePhoneNumber } from './usePhoneNumber';

InjectDebugData([
	{
		app: 'SIMCARD',
		event: PhoneEvents.SET_NUMBER,
		data: '0147-0147',
	},
]);

export const useSimcardService = () => {
	const [number, setNumber] = useRecoilState(simcardState.number);

	useNuiEvent('SIMCARD', PhoneEvents.SET_NUMBER, setNumber);

	return usePhoneNumber();
};
