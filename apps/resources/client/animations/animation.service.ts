import { Delay } from 'utils/misc';

export enum AnimationState {
	NONE,
	ON_CALL,
	ON_CAMERA,
	PHONE_OPEN,
}

export class AnimationService {
	private animationInterval: NodeJS.Timeout;
	private animationState: AnimationState;

	createAnimationInterval() {
		this.animationInterval = setInterval(() => {
			const playerId = PlayerPedId();

			if (this.animationState === AnimationState.ON_CALL) {
				this.handleCallAnimation(playerId);
			} else if (this.animationState === AnimationState.PHONE_OPEN) {
				this.handlePhoneAnimation(playerId);
			}
		}, 250);
	}

	async openPhone(): Promise<void> {
		if (this.animationState !== AnimationState.ON_CALL) {
			this.setPhoneState(AnimationState.PHONE_OPEN, true);
		}
	}

	private setPhoneState(state: AnimationState, stateValue: boolean) {
		this.animationState = state;

		if (this.animationState !== AnimationState.ON_CALL && this.animationState !== AnimationState.PHONE_OPEN) {
			if (this.animationInterval) {
				clearInterval(this.animationInterval);
				this.animationInterval = null;
			}
		} else if (!this.animationInterval) {
			this.createAnimationInterval();
		}
	}

	private handleCallAnimation(playerId: number) {
		IsPedInAnyVehicle(playerId, true) ? this.playCallInVehicleAnim(playerId) : this.playCallOnFeetAnim(playerId);
	}

	private handlePhoneAnimation(playerId: number) {
		IsPedInAnyVehicle(playerId, true)
			? this.playOpenOnVehicleAnimation(playerId)
			: this.playOpenOnFeetAnimation(playerId);
	}

	private async loadAnimDict(dict: any) {
		RequestAnimDict(dict);

		while (!HasAnimDictLoaded(dict)) {
			await Delay(100);
		}
	}

	private async playAnimation(playerId: number, dict: any, anim: any, speed: number) {
		await this.loadAnimDict(dict);

		if (!IsEntityPlayingAnim(playerId, dict, anim, 3)) {
			SetCurrentPedWeapon(playerId, 0xa2719263, true);
			TaskPlayAnim(playerId, dict, anim, speed, -1, -1, 50, 0, false, false, false);
		}
	}

	private playCallOnFeetAnim = (playerId: number) =>
		this.playAnimation(playerId, 'cellphone@', 'cellphone_text_in', 8.0);

	private playCallInVehicleAnim = (playerId: number) =>
		this.playAnimation(playerId, 'anim@cellphone@in_car@ps', 'cellphone_text_in', 7.0);

	private playOpenOnFeetAnimation = (playerId: number) =>
		this.playAnimation(playerId, 'cellphone@', 'cellphone_text_in', 8.0);

	private playOpenOnVehicleAnimation = (playerId: number) =>
		this.playAnimation(playerId, 'anim@cellphone@in_car@ps', 'cellphone_text_in', 7.0);
}
