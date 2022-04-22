export interface PreDBGalleryPhoto {
	id?: number;
	category?: string;
	image: string;
}

export interface GalleryPhoto extends PreDBGalleryPhoto {
	id: number;
}

export enum CameraResponse {
	GENERIC = 'CAMERA.FAILED_TAKE_PHOTO',
	INVALID_HOST = 'CAMERA.INVALID_HOST',
}

export enum PhotoTakeEvents {
	TAKE_PHOTO = 'tkphone:photo:take',
	TAKE_PHOTO_SUCCESS = 'tkphone:photo:take:success',
	TAKE_PHOTO_ENDED = 'tkphone:photo:take:ended',
}

export enum PhotoEvents {
	SAVE_PHOTO = 'tkphone:photo:new',
	FETCH_PHOTOS = 'tkphone:photo:fetch',
	UPLOAD_PHOTO = 'tkphone:photo:upload',
	LEAVE_CAMERA = 'tkphone:photo:leave',
	DELETE_PHOTO = 'tkphone:photo:delete',
}
