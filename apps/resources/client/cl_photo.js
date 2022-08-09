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
const control_1 = require("@typings/control");
const gallery_1 = require("@typings/gallery");
const phone_1 = require("@typings/phone");
const misc_1 = require("@utils/misc");
const NUI_1 = require("@utils/NUI");
const animation_controller_1 = require("@animation/animation.controller");
(0, NUI_1.RegisterNUIProxy)(gallery_1.PhotoEvents.SAVE_PHOTO);
(0, NUI_1.RegisterNUIProxy)(gallery_1.PhotoEvents.UPDATE_PHOTO);
(0, NUI_1.RegisterNUIProxy)(gallery_1.PhotoEvents.DELETE_PHOTO);
(0, NUI_1.RegisterNUIProxy)(gallery_1.PhotoEvents.FETCH_PHOTOS);
const expo = global.exports;
let inCameraMode = false;
const openPhone = () => {
    SetNuiFocus(true, true);
    (0, NUI_1.sendNUIEvent)('PHONE', phone_1.PhoneEvents.SET_VISIBILITY, true);
};
const closePhone = () => {
    SetNuiFocus(false, false);
    (0, NUI_1.sendNUIEvent)('PHONE', phone_1.PhoneEvents.SET_VISIBILITY, false);
};
const toggleFrontCam = (active) => Citizen.invokeNative('0x2491A93618B7D838', active);
const showHelpText = () => {
    BeginTextCommandDisplayHelp('THREESETRINGS');
    AddTextComponentString('Tirar foto: ~INPUT_CELLPHONE_SELECT~');
    AddTextComponentString('Alterar direção ~INPUT_PHONE~');
    AddTextComponentString('Sair modo camera: ~INPUT_CELLPHONE_CANCEL~');
    EndTextCommandDisplayHelp(0, true, false, -1);
};
(0, NUI_1.RegisterNUICallback)('CAMERA', gallery_1.PhotoTakeEvents.TAKE_PHOTO, (_, callback) => __awaiter(void 0, void 0, void 0, function* () {
    emit(control_1.ControlEvents.ENABLE_ACTIONS, false);
    animation_controller_1.animationService.setCameraOpen(true);
    let frontCam = false;
    CreateMobilePhone(1);
    CellCamActivate(true, true);
    closePhone();
    SetNuiFocus(false, false);
    inCameraMode = true;
    while (inCameraMode) {
        yield (0, misc_1.Delay)(0);
        if (IsControlJustPressed(0, 27)) {
            frontCam = !frontCam;
            toggleFrontCam(frontCam);
        }
        else if (IsControlJustPressed(1, 176)) {
            const response = yield handlePhotoKeyPress();
            callback({ status: 'success', data: response });
            break;
        }
        else if (IsControlJustPressed(1, 194)) {
            handleExitKeyPress();
            callback({ status: 'failed' });
            break;
        }
        HideHudComponentThisFrame(1);
        HideHudComponentThisFrame(2);
        HideHudComponentThisFrame(3);
        HideHudComponentThisFrame(4);
        HideHudComponentThisFrame(6);
        HideHudComponentThisFrame(7);
        HideHudComponentThisFrame(8);
        HideHudComponentThisFrame(9);
        HideHudComponentThisFrame(13);
        HideHudComponentThisFrame(17);
        HideHudComponentThisFrame(20);
        showHelpText();
    }
    ClearHelp(true);
    emit(control_1.ControlEvents.ENABLE_ACTIONS, true);
    animation_controller_1.animationService.setCameraOpen(false);
}));
const handlePhotoKeyPress = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, misc_1.Delay)(0);
    setTimeout(() => {
        DestroyMobilePhone();
        CellCamActivate(false, false);
        openPhone();
        emit(control_1.ControlEvents.ENABLE_ACTIONS, true);
    }, 200);
    const response = yield takePhoto();
    inCameraMode = false;
    return response;
});
const handleExitKeyPress = () => __awaiter(void 0, void 0, void 0, function* () {
    ClearHelp(true);
    DestroyMobilePhone();
    CellCamActivate(false, false);
    openPhone();
    emit(control_1.ControlEvents.ENABLE_ACTIONS, true);
    inCameraMode = false;
});
const takePhoto = () => new Promise((resolve, reject) => {
    expo['screenshot-basic'].requestScreenshotUpload('https://api.imgur.com/3/image', 'imgur', {
        headers: {
            authorization: `Client-ID 33546e53319682e`,
            'content-type': 'multipart/form-data',
        },
    }, (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parsed = JSON.parse(data);
            resolve({ image: parsed.data.link });
        }
        catch (e) {
            reject(e.message);
        }
    }));
});
