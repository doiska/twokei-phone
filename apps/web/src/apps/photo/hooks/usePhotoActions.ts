import { useCallback } from 'react';

import { GalleryPhoto } from '@typings/gallery';

import { useGalleryPhotos, useSetGalleryPhotos } from '@apps/photo/hooks/state';

const usePhotoActions = () => {
	const [photos, setPhotos] = useGalleryPhotos();

	const addLocalPhoto = useCallback(
		(photo: GalleryPhoto) => {
			setPhotos((photos) => [...photos, photo]);
		},
		[setPhotos]
	);

	const removeLocalPhoto = useCallback(
		(photo: GalleryPhoto) => {
			setPhotos((photos) => photos.filter((p) => p.id !== photo.id));
		},
		[setPhotos]
	);

	return { photos, setPhotos, addLocalPhoto, removeLocalPhoto };
};

export default usePhotoActions;
