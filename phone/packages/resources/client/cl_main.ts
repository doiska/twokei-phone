import { PhoneEvents } from '@typings/phone';
import { config } from 'cl_config';

declare global {
	var isPhoneOpen: boolean;
	var isPhoneDisabled: boolean;
	var isPlayerLoaded: boolean;
}

global.isPhoneOpen = false;
global.isPhoneDisabled = false;
global.isPlayerLoaded = false;

onNet(PhoneEvents.SET_PLAYER_LOADED, (state: boolean) => {
	global.isPlayerLoaded = state;

	if (!state) {
		//TODO: sendMessage UNLOAD_CHARACTER
	}
});

export const showPhone = async (): Promise<void> => {
	global.isPhoneOpen = true;

	// const time = getCurrentGameTime();

	emitNet(PhoneEvents.FETCH_CREDENTIALS);

	SetCursorLocation(0.9, 0.922);
	SetNuiFocus(true, true);
	SetNuiFocusKeepInput(true);
	emit('tkphone:disableControlActions', true);
};

export const hidePhone = async (): Promise<void> => {
	global.isPhoneOpen = false;

	SetCursorLocation(0.5, 0.5);
	SetNuiFocus(false, false);
	SetNuiFocusKeepInput(false);
	emit('tkphone:disableControlActions', false);
};

async function togglePhone(): Promise<void> {
	if (global.isPhoneOpen) {
		return hidePhone();
	}

	return showPhone();
}

RegisterCommand(
	config.phone.toggleCommand,
	async () => {
		console.log(`Toggle phone`);
		togglePhone();
	},
	false
);
