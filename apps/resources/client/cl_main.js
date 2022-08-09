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
exports.hidePhone = exports.showPhone = void 0;
const control_1 = require("@typings/control");
const phone_1 = require("@typings/phone");
const animation_controller_1 = require("./animations/animation.controller");
const cl_config_1 = require("./cl_config");
const NUI_1 = require("./utils/NUI");
global.isPhoneOpen = false;
global.isPhoneDisabled = false;
global.isPlayerLoaded = false;
onNet(phone_1.PhoneEvents.SET_PLAYER_LOADED, (state) => {
    console.log(`Player loaded`);
    global.isPlayerLoaded = state;
    // global.isPlayerLoaded = data.state;
    // if (!state) {
    // 	//TODO: sendMessage UNLOAD_CHARACTER
    // }
});
onNet(phone_1.PhoneEvents.SEND_CREDENTIALS, (number) => {
    console.log(`SEND_CREDENTIALS: ${number}`);
    (0, NUI_1.sendNUIEvent)('SIMCARD', phone_1.PhoneEvents.SET_NUMBER, number);
});
const showPhone = () => __awaiter(void 0, void 0, void 0, function* () {
    global.isPhoneOpen = true;
    // const time = getCurrentGameTime();
    emitNet(phone_1.PhoneEvents.FETCH_CREDENTIALS);
    SetCursorLocation(0.9, 0.922);
    SetNuiFocus(true, true);
    SetNuiFocusKeepInput(true);
    yield animation_controller_1.animationService.openPhone();
    emit(control_1.ControlEvents.ENABLE_ACTIONS, true);
});
exports.showPhone = showPhone;
const hidePhone = () => __awaiter(void 0, void 0, void 0, function* () {
    global.isPhoneOpen = false;
    SetCursorLocation(0.5, 0.5);
    SetNuiFocus(false, false);
    SetNuiFocusKeepInput(false);
    emit(control_1.ControlEvents.ENABLE_ACTIONS, false);
});
exports.hidePhone = hidePhone;
function togglePhone() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global.isPhoneOpen) {
            return (0, exports.hidePhone)();
        }
        return (0, exports.showPhone)();
    });
}
RegisterCommand(cl_config_1.config.phone.toggleCommand, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Toggle phone`);
    togglePhone();
}), false);
