"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const Delay = (ms) => new Promise((res) => setTimeout(res, ms));
exports.Delay = Delay;
