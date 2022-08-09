"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneEvents = void 0;
var PhoneEvents;
(function (PhoneEvents) {
    PhoneEvents["OPEN_PHONE"] = "twokei:phone:open";
    PhoneEvents["CLOSE_PHONE"] = "twokei:phone:close";
    PhoneEvents["OPEN_APP"] = "twokei:app:open";
    PhoneEvents["CLOSE_APP"] = "twokei:app:close";
    PhoneEvents["SET_NUMBER"] = "twokei:system:setNumber";
    PhoneEvents["SET_PLAYER_LOADED"] = "twokei:system:playerLoaded";
    PhoneEvents["SEND_CREDENTIALS"] = "twokei:system:sendCredentials";
    PhoneEvents["FETCH_CREDENTIALS"] = "twokei:system:fetchCredentials";
    PhoneEvents["SET_VISIBILITY"] = "twokei:system:setVisibility";
})(PhoneEvents = exports.PhoneEvents || (exports.PhoneEvents = {}));
