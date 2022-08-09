"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.deepMergeObjects = void 0;
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
exports.isObject = isObject;
function deepMergeObjects(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                deepMergeObjects(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMergeObjects(target, ...sources);
}
exports.deepMergeObjects = deepMergeObjects;
