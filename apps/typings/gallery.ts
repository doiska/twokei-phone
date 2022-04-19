export interface GalleryCategory {
	id: number;
	name: string;
	photos: GalleryPhoto[];
}

export interface GalleryPhoto {
	id: number;
	image: string;
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
	LEAVE_CAMERA = 'tkphone:photo:leave',
	UPLOAD_PHOTO = 'tkphone:photo:upload',
	FETCH_PHOTOS = 'tkphone:photo:fetch',
	DELETE_PHOTO = 'tkphone:photo:delete',
}
