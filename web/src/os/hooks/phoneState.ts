import { atom } from 'recoil';

export const phoneState = {
	visibility: atom<boolean>({
		key: 'phoneVisibility',
		default: true,
	}),
	phoneDisabled: atom<boolean>({
		key: 'phoneDisabled',
		default: false,
	}),
};

export default phoneState;
