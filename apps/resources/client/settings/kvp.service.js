"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _KvpService {
    setKvp(key, value) {
        SetResourceKvp(key, value);
    }
    setKvpFloat(key, value) {
        SetResourceKvpFloat(key, value);
    }
    setKvpInt(key, value) {
        SetResourceKvpInt(key, value);
    }
    getKvpString(key) {
        return GetResourceKvpString(key);
    }
    getKvpInt(key) {
        return GetResourceKvpInt(key);
    }
    getKvpFloat(key) {
        return GetResourceKvpFloat(key);
    }
}
const KvpService = new _KvpService();
exports.default = KvpService;
