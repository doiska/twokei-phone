import { useCallback } from 'react';

import { GalleryPhoto } from '@typings/gallery';

import { useGalleryPhotos } from '@apps/photo/hooks/state';

const usePhotoActions = () => {
	const [photos, setPhotos] = useGalleryPhotos();

	const addLocalPhoto = useCallback(
		(photo: GalleryPhoto) => {
			setPhotos((photos) => [...photos, photo]);
		},
		[setPhotos]
	);

	const updateLocalPhoto = useCallback(
		(photo: GalleryPhoto) => {
			setPhotos((photos) => photos.map((p) => (p.id === photo.id ? photo : p)));
		},
		[setPhotos]
	);

	const removeLocalPhoto = useCallback(
		(photo: GalleryPhoto) => {
			setPhotos((photos) => photos.filter((p) => p.id !== photo.id));
		},
		[setPhotos]
	);

	const getLatestPhoto = useCallback(() => {
		return photos[photos.length - 1];
	}, [photos]);

	return { photos, setPhotos, addLocalPhoto, updateLocalPhoto, getLatestPhoto, removeLocalPhoto };
};

export default usePhotoActions;
