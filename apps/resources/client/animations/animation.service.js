"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationService = exports.AnimationState = void 0;
const misc_1 = require("../utils/misc");
var AnimationState;
(function (AnimationState) {
    AnimationState[AnimationState["NONE"] = 0] = "NONE";
    AnimationState[AnimationState["ON_CALL"] = 1] = "ON_CALL";
    AnimationState[AnimationState["ON_CAMERA"] = 2] = "ON_CAMERA";
    AnimationState[AnimationState["PHONE_OPEN"] = 3] = "PHONE_OPEN";
})(AnimationState = exports.AnimationState || (exports.AnimationState = {}));
class AnimationService {
    constructor() {
        this.playCallOnFeetAnim = (playerId) => this.playAnimation(playerId, 'cellphone@', 'cellphone_text_in', 8.0);
        this.playCallInVehicleAnim = (playerId) => this.playAnimation(playerId, 'anim@cellphone@in_car@ps', 'cellphone_text_in', 7.0);
        this.playOpenOnFeetAnimation = (playerId) => this.playAnimation(playerId, 'cellphone@', 'cellphone_text_in', 8.0);
        this.playOpenOnVehicleAnimation = (playerId) => this.playAnimation(playerId, 'anim@cellphone@in_car@ps', 'cellphone_text_in', 7.0);
    }
    createAnimationInterval() {
        this.animationInterval = setInterval(() => {
            const playerId = PlayerPedId();
            if (this.animationState === AnimationState.ON_CALL) {
                this.handleCallAnimation(playerId);
            }
            else if (this.animationState === AnimationState.PHONE_OPEN) {
                this.handlePhoneAnimation(playerId);
            }
        }, 250);
    }
    openPhone() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.animationState !== AnimationState.ON_CALL) {
                this.setPhoneState(AnimationState.PHONE_OPEN, true);
            }
        });
    }
    setCameraOpen(state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setPhoneState(AnimationState.ON_CAMERA, state);
        });
    }
    setPhoneState(state, stateValue) {
        this.animationState = state;
        if (this.animationState !== AnimationState.ON_CALL && this.animationState !== AnimationState.PHONE_OPEN) {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            }
        }
        else if (!this.animationInterval) {
            this.createAnimationInterval();
        }
    }
    handleCallAnimation(playerId) {
        IsPedInAnyVehicle(playerId, true) ? this.playCallInVehicleAnim(playerId) : this.playCallOnFeetAnim(playerId);
    }
    handlePhoneAnimation(playerId) {
        IsPedInAnyVehicle(playerId, true)
            ? this.playOpenOnVehicleAnimation(playerId)
            : this.playOpenOnFeetAnimation(playerId);
    }
    loadAnimDict(dict) {
        return __awaiter(this, void 0, void 0, function* () {
            RequestAnimDict(dict);
            while (!HasAnimDictLoaded(dict)) {
                yield (0, misc_1.Delay)(100);
            }
        });
    }
    playAnimation(playerId, dict, anim, speed) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadAnimDict(dict);
            if (!IsEntityPlayingAnim(playerId, dict, anim, 3)) {
                SetCurrentPedWeapon(playerId, 0xa2719263, true);
                TaskPlayAnim(playerId, dict, anim, speed, -1, -1, 50, 0, false, false, false);
            }
        });
    }
}
exports.AnimationService = AnimationService;
