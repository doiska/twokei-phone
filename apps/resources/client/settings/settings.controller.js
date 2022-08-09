"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NUI_1 = require("../utils/NUI");
const settings_1 = require("@typings/settings");
const kvp_service_1 = __importDefault(require("./kvp.service"));
(0, NUI_1.RegisterNUIEvent)(settings_1.SettingsEvents.NUI_SETTINGS_UPDATE, (cfg) => {
    kvp_service_1.default.setKvp(settings_1.KvpItems.TK_NOTIFICATION, cfg.notificationSound.value);
    kvp_service_1.default.setKvp(settings_1.KvpItems.TK_RINGTONE, cfg.ringtoneSound.value);
});
