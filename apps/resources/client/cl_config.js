"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const deepMergeObject_1 = require("@shared/utils/deepMergeObject");
const config_default_json_1 = __importDefault(require("../../config.default.json"));
exports.config = (() => {
    const resourceName = GetCurrentResourceName();
    const config = JSON.parse(LoadResourceFile(resourceName, 'config.json'));
    return (0, deepMergeObject_1.deepMergeObjects)({}, config_default_json_1.default, config);
})();
