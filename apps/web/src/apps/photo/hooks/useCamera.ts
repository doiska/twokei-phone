import { useCallback, useState } from 'react';

import { GalleryPhoto, PhotoTakeEvents } from '@typings/gallery';
import { useNuiCallback } from 'fivem-nui-lib';

import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';

interface IUseCamera {
	isLoading: boolean;
	isConcluded: boolean;
	takePhoto: () => void;
}

export const useCamera = (): IUseCamera => {
	const [isConcluded, setIsConcluded] = useState(false);
	const { addPhoto } = usePhotoAPI();

	const onPhotoTaken = useCallback(
		(photo: GalleryPhoto) => {
			addPhoto(photo);
			setIsConcluded(true);
			console.log(`ADD PHOTO: ${JSON.stringify(photo)}`);
		},
		[addPhoto]
	);

	const takePhoto = () => _takePhoto(undefined);

	const [_takePhoto, { loading }] = useNuiCallback<void, GalleryPhoto>(
		'CAMERA',
		PhotoTakeEvents.TAKE_PHOTO,
		onPhotoTaken
	);

	return {
		isLoading: loading,
		isConcluded,
		takePhoto,
	};
};
