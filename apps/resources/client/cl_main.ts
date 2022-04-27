import { ControlEvents } from '@typings/control';
import { PhoneEvents } from '@typings/phone';
import { animationService } from './animations/animation.controller';
import { config } from './cl_config';
import { sendNUIEvent } from './utils/NUI';

declare global {
	var isPhoneOpen: boolean;
	var isPhoneDisabled: boolean;
	var isPlayerLoaded: boolean;
}

global.isPhoneOpen = false;
global.isPhoneDisabled = false;
global.isPlayerLoaded = false;

onNet(PhoneEvents.SET_PLAYER_LOADED, (state: boolean) => {
	console.log(`Player loaded`);

	global.isPlayerLoaded = state;

	// global.isPlayerLoaded = data.state;

	// if (!state) {
	// 	//TODO: sendMessage UNLOAD_CHARACTER
	// }
});

onNet(PhoneEvents.SEND_CREDENTIALS, (number: string) => {
	console.log(`SEND_CREDENTIALS: ${number}`);
	sendNUIEvent('SIMCARD', PhoneEvents.SET_NUMBER, number);
});

export const showPhone = async (): Promise<void> => {
	global.isPhoneOpen = true;

	// const time = getCurrentGameTime();

	emitNet(PhoneEvents.FETCH_CREDENTIALS);

	SetCursorLocation(0.9, 0.922);
	SetNuiFocus(true, true);
	SetNuiFocusKeepInput(true);
	animationService.openPhone();

	emit(ControlEvents.ENABLE_ACTIONS, true);
};

export const hidePhone = async (): Promise<void> => {
	global.isPhoneOpen = false;

	SetCursorLocation(0.5, 0.5);
	SetNuiFocus(false, false);
	SetNuiFocusKeepInput(false);
	emit(ControlEvents.ENABLE_ACTIONS, false);
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
