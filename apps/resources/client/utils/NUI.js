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
exports.verifyArgumentType = exports.emitNetTyped = exports.onNetTyped = exports.onPhoneEvent = exports.RegisterNUIProxy = exports.isPlayerLoaded = exports.RegisterNUICallback = exports.RegisterNUIEvent = exports.emitNetPromise = exports.sendNUIEvent = void 0;
const sendNUIEvent = (app, event, data = {}) => SendNUIMessage({
    app,
    event,
    data,
});
exports.sendNUIEvent = sendNUIEvent;
const emitNetPromise = (event, ...data) => {
    return new Promise((resolve, reject) => {
        let timedOut = false;
        const NET_PROMISE_TIMEOUT = 15000;
        setTimeout(() => {
            timedOut = true;
            reject(`${event} timed out after ${NET_PROMISE_TIMEOUT}ms`);
        }, NET_PROMISE_TIMEOUT);
        const uniqueId = Math.random().toString(36).substring(2);
        const eventName = `${event}:${uniqueId}`;
        emitNet(event, eventName, ...data);
        const listener = (data) => {
            removeEventListener(event, listener);
            if (!timedOut) {
                resolve(data);
            }
        };
        onNet(eventName, listener);
    });
};
exports.emitNetPromise = emitNetPromise;
const RegisterNUIEvent = (event, callback) => {
    RegisterNuiCallbackType(event);
    on(`__cfx_nui:${event}`, (data) => callback(data));
};
exports.RegisterNUIEvent = RegisterNUIEvent;
const RegisterNUICallback = (app = 'NUI', event, callback) => {
    console.log(`[NUI-CALLBACK] RegisterNUICallback ${event}`);
    RegisterNuiCallbackType(event);
    on(`__cfx_nui:${event}`, (...data) => {
        callback(data, (response) => {
            var _a;
            console.log(`[NUI-CALLBACK] (${response.status || 'NO STATUS'}) ${event} response: ${JSON.stringify(response)}`);
            if (response.status) {
                (0, exports.sendNUIEvent)(app, `${event}:${response.status}`, (_a = response.data) !== null && _a !== void 0 ? _a : {});
            }
        });
    });
};
exports.RegisterNUICallback = RegisterNUICallback;
const isPlayerLoaded = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            if (global.isPlayerLoaded)
                resolve(id);
        }, 50);
    }).then((id) => clearInterval(id));
});
exports.isPlayerLoaded = isPlayerLoaded;
const RegisterNUIProxy = (event) => {
    console.log(`[PROXY] Registering ${event} as NUIProxy.`);
    RegisterNuiCallbackType(event);
    on(`__cfx_nui:${event}`, (data, cb) => __awaiter(void 0, void 0, void 0, function* () {
        if (!global.isPlayerLoaded) {
            console.log(`Player not loaded, awaiting`);
            yield (0, exports.isPlayerLoaded)();
        }
        try {
            console.log(`Proxied ${event} with data: ${JSON.stringify(data)}`);
            const res = yield (0, exports.emitNetPromise)(event, data);
            cb(res);
        }
        catch (e) {
            cb({ status: 'error' });
        }
    }));
};
exports.RegisterNUIProxy = RegisterNUIProxy;
const onPhoneEvent = (event, cb) => onNet(event, cb);
exports.onPhoneEvent = onPhoneEvent;
const onNetTyped = (event, cb) => onNet(event, cb);
exports.onNetTyped = onNetTyped;
const emitNetTyped = (event, data, source) => {
    if (source) {
        return emitNet(event, data, source);
    }
    emitNet(event, data);
};
exports.emitNetTyped = emitNetTyped;
const verifyArgumentType = (exportName, args, types) => {
    if (!types.includes(typeof args)) {
        throw new TypeError(`${exportName}: Expected type ${types.join(' or ')} but got ${typeof args}`);
    }
};
exports.verifyArgumentType = verifyArgumentType;
