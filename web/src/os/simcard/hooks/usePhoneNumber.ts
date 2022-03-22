import { useRecoilValue } from 'recoil';

import { simcardState } from './state';

export const usePhoneNumber = () => useRecoilValue(simcardState.number);
