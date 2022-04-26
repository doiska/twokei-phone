import { PhotoEvents, PhotoTakeEvents } from '@typings/gallery';
import { RegisterNUICallback, RegisterNUIProxy } from '@utils/NUI';

RegisterNUIProxy(PhotoEvents.SAVE_PHOTO);
RegisterNUIProxy(PhotoEvents.UPDATE_PHOTO);
RegisterNUIProxy(PhotoEvents.DELETE_PHOTO);
RegisterNUIProxy(PhotoEvents.FETCH_PHOTOS);

const expo = global.exports;

RegisterNUICallback<void>(PhotoTakeEvents.TAKE_PHOTO, async (_, callback) => {
	const photo = await takePhoto();
	console.log(photo);

	callback(photo);
});

const takePhoto = () =>
	new Promise((res, reject) => {
		expo['screenshot-basic'].requestScreenshotUpload(
			'https://api.imgur.com/3/image',
			'imgur',
			{
				headers: {
					authorization: `Client-ID 33546e53319682e`,
					'content-type': 'multipart/form-data',
				},
			},
			(data: unknown) => console.log(JSON.parse(data as string).data.link)
		);
	});
