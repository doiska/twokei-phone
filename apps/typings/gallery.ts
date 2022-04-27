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
	TAKE_PHOTO_FAILED = 'tkphone:photo:take:failed',
}

export enum PhotoEvents {
	FETCH_PHOTOS = 'tkphone:photo:fetch',
	SAVE_PHOTO = 'tkphone:photo:new',
	UPDATE_PHOTO = 'tkphone:photo:update',
	DELETE_PHOTO = 'tkphone:photo:delete',
	UPLOAD_PHOTO = 'tkphone:photo:upload',
	LEAVE_CAMERA = 'tkphone:photo:leave',
}
