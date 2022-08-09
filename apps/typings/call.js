"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallEvents = exports.CallRejectReasons = void 0;
var CallRejectReasons;
(function (CallRejectReasons) {
    CallRejectReasons["Busy"] = "busy";
    CallRejectReasons["Unavailable"] = "unavailable";
    CallRejectReasons["Declined"] = "declined";
    CallRejectReasons["Unknown"] = "unknown";
})(CallRejectReasons = exports.CallRejectReasons || (exports.CallRejectReasons = {}));
var CallEvents;
(function (CallEvents) {
    /* DIALER */
    CallEvents["INITIALIZE_CALL"] = "tkphone:call:initialize";
    CallEvents["START_CALL"] = "tkphone:call:start";
    CallEvents["WAS_ACCEPTED"] = "tkphone:call:accepted";
    CallEvents["WAS_REJECTED"] = "tkphone:call:rejected";
    /* RECEIVER */
    CallEvents["ACCEPT_CALL"] = "tkphone:call:accept";
    CallEvents["REJECT_CALL"] = "tkphone:call:reject";
    /* SHARED */
    CallEvents["SHOW_MODAL"] = "tkphone:call:show";
    CallEvents["HANGUP_CALL"] = "tkphone:call:end";
    CallEvents["WAS_ENDED"] = "tkphone:call:ended";
    /* DATA */
    CallEvents["FETCH_CALLS"] = "tkphone:call:fetch";
    CallEvents["SET_INFO"] = "tkphone:call:setInfo";
    CallEvents["SAVE_CALL"] = "tkphone:call:save";
})(CallEvents = exports.CallEvents || (exports.CallEvents = {}));
