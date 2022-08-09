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
exports.CallService = void 0;
const call_1 = require("@typings/call");
const NUI_1 = require("@utils/NUI");
class CallService {
    //TODO: sounds
    constructor() {
        this.currentPending = null;
        this.current = 0;
    }
    static sendCallEvent(event, data) {
        return (0, NUI_1.sendNUIEvent)('CALL', event, data);
    }
    static sendDialerAction(event, data) {
        return (0, NUI_1.sendNUIEvent)('DIAL', event, data);
    }
    isInCall() {
        return this.current !== 0;
    }
    isCurrentCall(target) {
        console.log(`[CallService] isCurrentCall: ${this.current} === ${target}`);
        return this.current === target;
    }
    isInPendingCall() {
        return !!this.currentPending;
    }
    isCurrentPendingCall(target) {
        return this.currentPending === target;
    }
    toggleModal(show) {
        CallService.sendCallEvent(call_1.CallEvents.SHOW_MODAL, show);
    }
    handleCallStart(dialer, receiver, isDialer, isUnavailable) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInCall() || this.currentPending) {
                console.log(`[CallService] handleCallStart: already in call.`, this.isInCall(), this.currentPending);
                return emitNet(call_1.CallEvents.WAS_REJECTED, { dialer: dialer }, call_1.CallRejectReasons.Busy);
            }
            this.currentPending = dialer;
            this.toggleModal(true);
            console.log(`[CallService] handleCallStart: ${dialer} -> ${receiver}`);
            CallService.sendCallEvent(call_1.CallEvents.SET_INFO, {
                dialer: dialer,
                receiver: receiver,
                isDialer: isDialer,
                isUnavailable: false,
                isAccepted: false,
            });
        });
    }
    handleCallAccepted(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[CallService] ChannelId ${data.channelId}`);
            this.current = data.channelId;
            this.currentPending = null;
            //TODO: add to voice
            console.log(`[CallService] handleCallAccepted: ${data.dialer} -> ${data.receiver}`);
            CallService.sendCallEvent(call_1.CallEvents.SET_INFO, data);
        });
    }
    handleCallRejected(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInCall() || !this.isCurrentPendingCall(receiver)) {
                console.log(`[CallService] handleCallRejected: not in call.`);
                return;
            }
            console.log(`[CallService] handleCallRejected: ${receiver}`);
            this.currentPending = null;
            this.toggleModal(false);
            CallService.sendCallEvent(call_1.CallEvents.SET_INFO, null);
        });
    }
    handleCallEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[CallService] handleCallEnd`);
            this.current = 0;
            this.currentPending = null;
            this.toggleModal(false);
            CallService.sendCallEvent(call_1.CallEvents.SET_INFO, null);
        });
    }
}
exports.CallService = CallService;
