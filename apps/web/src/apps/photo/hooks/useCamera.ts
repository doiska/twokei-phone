import { useCallback, useState } from 'react';

import { GalleryPhoto, PhotoEvents, PhotoTakeEvents } from '@typings/gallery';
import { useNuiCallback, useNuiEvent } from 'fivem-nui-react-lib';

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
		onPhotoTaken,
		onPhotoError
	);

	const takePhoto = () => _takePhoto(undefined, { timeout: 60 * 1000 });

	useNuiEvent('CAMERA', PhotoEvents.UPLOAD_PHOTO, () => setUploading(true));
	useNuiEvent('CAMERA', PhotoEvents.LEAVE_CAMERA, () => setUploading(false));

	return {
		isLoading: isUploading,
		takePhoto,
	};
};
