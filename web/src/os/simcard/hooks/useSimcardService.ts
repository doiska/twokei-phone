import InjectDebugData from '@debug/InjectDebugData';
import { PhoneEvents } from '@typings/phone';
import { useNuiEvent } from 'fivem-nui-react-lib';
import { useSetRecoilState } from 'recoil';

import { simcardState } from './state';
import { usePhoneNumber } from './usePhoneNumber';

InjectDebugData([
	{
		app: 'SIMCARD',
		method: PhoneEvents.SET_NUMBER,
		data: '1234-5678',
	},
]);

export const useSimcardService = () => {
	const setNumber = useSetRecoilState(simcardState.number);
	useNuiEvent('SIMCARD', PhoneEvents.SET_NUMBER, setNumber);
	return usePhoneNumber();
};
