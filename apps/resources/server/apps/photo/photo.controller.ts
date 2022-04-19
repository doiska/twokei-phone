import { GalleryPhoto, PhotoEvents, PreDBGalleryPhoto } from '@typings/gallery';
import { onNetPromise } from '@lib/onNetPromise';
import PhotosService from '@apps/photo/photos.service';

// onNetPromise<string, GalleryPhoto>(PhotoEvents.UPLOAD_PHOTO, cb)
onNetPromise<void, void>(PhotoEvents.FETCH_PHOTOS, () => {
	PhotosService.handleFetch();
});
onNetPromise<PreDBGalleryPhoto, GalleryPhoto>(PhotoEvents.SAVE_PHOTO, (req, res) => {
	PhotosService.handlePhotoSave(req, res).catch(() => {
		res({ status: 'error' });
	});
});
// onNetPromise<string, GalleryPhoto>(PhotoEvents.DELETE_PHOTO, cb)
