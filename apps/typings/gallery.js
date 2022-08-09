"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoEvents = exports.PhotoTakeEvents = exports.CameraResponse = void 0;
var CameraResponse;
(function (CameraResponse) {
    CameraResponse["GENERIC"] = "CAMERA.FAILED_TAKE_PHOTO";
    CameraResponse["INVALID_HOST"] = "CAMERA.INVALID_HOST";
})(CameraResponse = exports.CameraResponse || (exports.CameraResponse = {}));
var PhotoTakeEvents;
(function (PhotoTakeEvents) {
    PhotoTakeEvents["TAKE_PHOTO"] = "tkphone:photo:take";
    PhotoTakeEvents["TAKE_PHOTO_SUCCESS"] = "tkphone:photo:take:success";
    PhotoTakeEvents["TAKE_PHOTO_FAILED"] = "tkphone:photo:take:failed";
    PhotoTakeEvents["FORCE_LEAVE_CAMERA"] = "tkphone:photo:leave";
})(PhotoTakeEvents = exports.PhotoTakeEvents || (exports.PhotoTakeEvents = {}));
var PhotoEvents;
(function (PhotoEvents) {
    PhotoEvents["FETCH_PHOTOS"] = "tkphone:photo:fetch";
    PhotoEvents["SAVE_PHOTO"] = "tkphone:photo:new";
    PhotoEvents["UPDATE_PHOTO"] = "tkphone:photo:update";
    PhotoEvents["DELETE_PHOTO"] = "tkphone:photo:delete";
    PhotoEvents["UPLOAD_PHOTO"] = "tkphone:photo:upload";
})(PhotoEvents = exports.PhotoEvents || (exports.PhotoEvents = {}));
