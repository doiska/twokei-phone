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
const call_1 = require("@typings/call");
const cl_calls_service_1 = require("./cl_calls.service");
const NUI_1 = require("@utils/NUI");
const callService = new cl_calls_service_1.CallService();
(0, NUI_1.RegisterNUIEvent)(call_1.CallEvents.INITIALIZE_CALL, (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, NUI_1.emitNetPromise)(call_1.CallEvents.INITIALIZE_CALL, data);
        if (res.status !== 'ok') {
            console.error(`Not ok`, res.errorMsg);
            return;
        }
        console.log(`[CALL] Initialized call with data: ${JSON.stringify(data)}`);
    }
    catch (e) {
        console.error(`CLIENT -> SERVER_ERROR`, e);
    }
}));
(0, NUI_1.RegisterNUIEvent)(call_1.CallEvents.ACCEPT_CALL, (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[CALL] Accepting call with data: ${JSON.stringify(data)}`);
    (0, NUI_1.emitNetTyped)(call_1.CallEvents.ACCEPT_CALL, data);
}));
(0, NUI_1.RegisterNUIEvent)(call_1.CallEvents.REJECT_CALL, (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[CALL] Rejecting call with data: ${JSON.stringify(data)}`);
    (0, NUI_1.emitNetTyped)(call_1.CallEvents.REJECT_CALL, data);
}));
(0, NUI_1.RegisterNUIEvent)(call_1.CallEvents.HANGUP_CALL, (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, NUI_1.emitNetPromise)(call_1.CallEvents.HANGUP_CALL, data);
        if (res.status !== 'ok')
            return console.error(`CLIENT -> SERVER_ERROR`, res.errorMsg);
    }
    catch (e) {
        console.error(`CLIENT -> SERVER_ERROR`, e);
    }
}));
(0, NUI_1.onNetTyped)(call_1.CallEvents.START_CALL, ({ dialer, isDialer, receiver, isUnavailable }) => {
    callService.handleCallStart(dialer, receiver, isDialer, isUnavailable);
});
(0, NUI_1.onNetTyped)(call_1.CallEvents.WAS_ACCEPTED, (data) => callService.handleCallAccepted(data));
onNet(call_1.CallEvents.WAS_REJECTED, (current) => {
    callService.handleCallRejected(current.receiver);
    cl_calls_service_1.CallService.sendDialerAction(call_1.CallEvents.WAS_REJECTED, current);
});
onNet(call_1.CallEvents.WAS_ENDED, (dialer, current) => {
    if (callService.isInCall() && !callService.isCurrentCall(dialer)) {
        console.log(`[CALL] Ending call with data: ${JSON.stringify(current)}`);
        return;
    }
    callService.handleCallEnd();
    if (current) {
        cl_calls_service_1.CallService.sendDialerAction(call_1.CallEvents.WAS_ENDED, current);
    }
});
