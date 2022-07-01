import PhotosService from '@apps/photo/photos.service';
import { onNetPromise } from '@lib/onNetPromise';

import { GalleryPhoto, PhotoEvents, PreDBGalleryPhoto } from '@typings/gallery';

// onNetPromise<string, GalleryPhoto>(PhotoEvents.UPLOAD_PHOTO, cb)

onNetPromise<void, GalleryPhoto[]>(PhotoEvents.FETCH_PHOTOS, (req, res) => {
	PhotosService.handleFetchPhotos(req, res).catch((e) => {
		res({ status: 'error', data: [] });
		console.error('Fetch photos error', e);
	});
});

onNetPromise<PreDBGalleryPhoto, GalleryPhoto>(
	PhotoEvents.SAVE_PHOTO,
	(req, res) => {
		PhotosService.handlePhotoSave(req, res).catch((e) => {
			res({ status: 'error' });
			console.error('Save photo error', e);
		});
	}
);

onNetPromise<GalleryPhoto, GalleryPhoto>(
	PhotoEvents.UPDATE_PHOTO,
	(req, res) => {
		PhotosService.handlePhotoSave(req, res).catch((e) => {
			res({ status: 'error' });
			console.error('Save photo error', e);
		});
	}
);

onNetPromise<GalleryPhoto, void>(PhotoEvents.DELETE_PHOTO, (req, res) => {
	PhotosService.handlePhotoDelete(req, res).catch((e) => {
		res({ status: 'error' });
		console.error('Delete photo error', e);
	});
});

// onNetPromise<string, GalleryPhoto>(PhotoEvents.DELETE_PHOTO, cb)
