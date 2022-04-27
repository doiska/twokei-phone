import { ControlEvents } from '@typings/control';

let disableKeys = false;
let time = disableKeys ? 0 : 1000;

console.log('[TKPhone] Disabled keys', disableKeys);

setInterval(() => {
	if (disableKeys) {
		DisableControlAction(0, 0, true); // Next Camera
		DisableControlAction(0, 1, true); // Look Left/Right
		DisableControlAction(0, 2, true); // Look up/Down
		DisableControlAction(0, 16, true); // Next Weapon
		DisableControlAction(0, 17, true); // Select Previous Weapon
		DisableControlAction(0, 22, true); // Jump
		DisableControlAction(0, 24, true); // Attack
		DisableControlAction(0, 25, true); // Aim
		DisableControlAction(0, 26, true); // Look Behind
		DisableControlAction(0, 36, true); // Input Duck/Sneak
		DisableControlAction(0, 37, true); // Weapon Wheel
		DisableControlAction(0, 44, true); // Cover
		DisableControlAction(0, 47, true); // Detonate
		DisableControlAction(0, 55, true); // Dive
		DisableControlAction(0, 75, true); // Exit Vehicle
		DisableControlAction(0, 76, true); // Vehicle Handbrake
		DisableControlAction(0, 81, true); // Next Radio (Vehicle)
		DisableControlAction(0, 82, true); // Previous Radio (Vehicle)
		DisableControlAction(0, 91, true); // Passenger Aim (Vehicle)
		DisableControlAction(0, 92, true); // Passenger Attack (Vehicle)
		DisableControlAction(0, 99, true); // Select Next Weapon (Vehicle)
		DisableControlAction(0, 106, true); // Control Override (Vehicle)
		DisableControlAction(0, 114, true); // Fly Attack (Flying)
		DisableControlAction(0, 115, true); // Next Weapon (Flying)
		DisableControlAction(0, 121, true); // Fly Camera (Flying)
		DisableControlAction(0, 122, true); // Control OVerride (Flying)
		DisableControlAction(0, 135, true); // Control OVerride (Sub)
		DisableControlAction(0, 140, true); // Melee attack light
		DisableControlAction(0, 200, true); // Pause Menu
		DisableControlAction(0, 245, true); // Chat
	}
}, 0);

// let pauseStatus = false;

// setInterval(() => {
// 	let isPauseOpen = IsPauseMenuActive();
// 	pauseStatus = isPauseOpen;

// }, 500);

AddEventHandler(ControlEvents.ENABLE_ACTIONS, (status: boolean) => {
	console.log(`[TKPhone] Disable control actions`, status);
	disableKeys = status;
});
