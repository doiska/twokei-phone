import { useCallback, useState } from 'react';

import useNuiEvent from '@common/hooks/useNuiEvent';
import { GalleryPhoto, PhotoEvents, PhotoTakeEvents } from '@typings/gallery';
import { useNuiCallback } from 'fivem-nui-lib';

import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';

interface IUseCamera {
	isLoading: boolean;
	takePhoto: () => void;
}

export const useCamera = (): IUseCamera => {
	const [isUploading, setUploading] = useState(false);

	const { addPhoto } = usePhotoAPI();

	const onPhotoTaken = useCallback(
		(photo: GalleryPhoto) => {
			setUploading(false);
			console.log(`ADD PHOTO: ${JSON.stringify(photo)}`);
			addPhoto(photo);
		},
		[addPhoto]
	);

	const onPhotoError = useCallback((error: unknown) => {
		setUploading(false);
		console.error(error);
	}, []);

	const [_takePhoto] = useNuiCallback<void, GalleryPhoto>(
		'CAMERA',
		PhotoTakeEvents.TAKE_PHOTO,
		(data) => {
			console.log(`TAKE PHOTO: ${JSON.stringify(data)}`);
			onPhotoTaken(data);
		},
		(err) => {
			console.error(err);
			onPhotoError(err);
		}
	);

	const takePhoto = () => _takePhoto(undefined, { timeout: 60 * 1000 });

	useNuiEvent('CAMERA', PhotoEvents.UPLOAD_PHOTO, () => setUploading(true));
	useNuiEvent('CAMERA', PhotoEvents.LEAVE_CAMERA, () => setUploading(false));

	return {
		isLoading: isUploading,
		takePhoto,
	};
};
