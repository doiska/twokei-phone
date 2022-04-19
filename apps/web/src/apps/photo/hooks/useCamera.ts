import { useCallback, useState } from 'react';

import { GalleryCategory, GalleryPhoto, PhotoEvents, PhotoTakeEvents } from '@typings/gallery';
import { useNuiCallback, useNuiEvent } from 'fivem-nui-react-lib';

import { useGalleryCategories } from '@apps/photo/hooks/state';
import { usePhotoActions } from '@apps/photo/hooks/usePhotoActions';

interface IUseCamera {
	categories: GalleryCategory[];
	isLoading: boolean;
	takePhoto: () => void;
}

export const useCamera = (): IUseCamera => {
	const [isUploading, setUploading] = useState(false);
	const { addPhoto } = usePhotoActions();
	const [categories, setCategories] = useGalleryCategories();

	const onPhotoTaken = useCallback(
		(photo: GalleryPhoto, cat = -1) => {
			setUploading(false);
			addPhoto(photo, cat);
		},
		[setCategories]
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
		categories,
		isLoading: isUploading,
		takePhoto,
	};
};
