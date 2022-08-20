import { ControlEvents } from '@typings/control';
import { GalleryPhoto, PhotoEvents, PhotoTakeEvents, PreDBGalleryPhoto } from '@typings/gallery';
import { PhoneEvents } from '@typings/phone';

import { animationService } from '@animation/animation.controller';
import { Delay } from '@utils/misc';
import { emitNetPromise, RegisterNUICallback, RegisterNUIProxy, sendNUIEvent } from '@utils/NUI';

RegisterNUIProxy(PhotoEvents.SAVE_PHOTO);
RegisterNUIProxy(PhotoEvents.UPDATE_PHOTO);
RegisterNUIProxy(PhotoEvents.DELETE_PHOTO);
RegisterNUIProxy(PhotoEvents.FETCH_PHOTOS);

const expo = global.exports;
let inCameraMode = false;

const openPhone = () => {
	SetNuiFocus(true, true);
	sendNUIEvent('PHONE', PhoneEvents.SET_VISIBILITY, true);
};

const closePhone = () => {
	SetNuiFocus(false, false);
	sendNUIEvent('PHONE', PhoneEvents.SET_VISIBILITY, false);
};

const toggleFrontCam = (active: boolean) => Citizen.invokeNative('0x2491A93618B7D838', active);

const showHelpText = () => {
	BeginTextCommandDisplayHelp('THREESETRINGS');
	AddTextComponentString('Tirar foto: ~INPUT_CELLPHONE_SELECT~');
	AddTextComponentString('Alterar direção ~INPUT_PHONE~');
	AddTextComponentString('Sair modo camera: ~INPUT_CELLPHONE_CANCEL~');
	EndTextCommandDisplayHelp(0, true, false, -1);
};

RegisterNUICallback<void>('CAMERA', PhotoTakeEvents.TAKE_PHOTO, async (_, callback) => {
	emit(ControlEvents.ENABLE_ACTIONS, false);

	animationService.setCameraOpen(true);

	let frontCam = false;
	CreateMobilePhone(1);
	CellCamActivate(true, true);

	closePhone();

	SetNuiFocus(false, false);

	inCameraMode = true;

	while (inCameraMode) {
		await Delay(0);

		if (IsControlJustPressed(0, 27)) {
			frontCam = !frontCam;
			toggleFrontCam(frontCam);
		} else if (IsControlJustPressed(1, 176)) {
			const response = await handlePhotoKeyPress();
			callback({ status: 'success', data: response });
			break;
		} else if (IsControlJustPressed(1, 194)) {
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
	emit(ControlEvents.ENABLE_ACTIONS, true);
	animationService.setCameraOpen(false);
});

const handlePhotoKeyPress = async () => {
	await Delay(0);

	setTimeout(() => {
		DestroyMobilePhone();
		CellCamActivate(false, false);
		openPhone();
		emit(ControlEvents.ENABLE_ACTIONS, true);
	}, 200);

	const response = await takePhoto();
	inCameraMode = false;
	return response;
};

const handleExitKeyPress = async () => {
	ClearHelp(true);
	DestroyMobilePhone();
	CellCamActivate(false, false);
	openPhone();

	emit(ControlEvents.ENABLE_ACTIONS, true);

	inCameraMode = false;
};

const takePhoto = (): Promise<{ image: string } | undefined> =>
	new Promise((resolve, reject) => {
		expo['screenshot-basic'].requestScreenshotUpload(
			'https://api.imgur.com/3/image',
			'imgur',
			{
				headers: {
					authorization: `Client-ID 33546e53319682e`,
					'content-type': 'multipart/form-data',
				},
			},
			async (data: string) => {
				try {
					const parsed = JSON.parse(data);
					resolve({ image: parsed.data.link });
				} catch (e) {
					reject(e.message);
				}
			}
		);
	});
