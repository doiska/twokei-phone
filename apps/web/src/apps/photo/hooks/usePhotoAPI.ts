import { useCallback } from 'react';

import { ServerPromiseResp } from '@typings/common';
import { GalleryPhoto, PhotoEvents, PreDBGalleryPhoto } from '@typings/gallery';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { GalleryMockData } from '@apps/photo/gallery/Gallery.mock';
import usePhotoActions from '@apps/photo/hooks/usePhotoActions';

//TODO: add update photo

const usePhotoAPI = () => {
	const { photos, setPhotos, addLocalPhoto, updateLocalPhoto, removeLocalPhoto } = usePhotoActions();

	const fetchPhotos = useCallback(() => {
		fetchNui<ServerPromiseResp<GalleryPhoto[]>>(
			PhotoEvents.FETCH_PHOTOS,
			undefined,
			buildRespObj(GalleryMockData, 'ok')
		).then((response) => {
			setPhotos(response.data ?? []);
		});
	}, []);

	const addPhoto = useCallback(
		(photo: PreDBGalleryPhoto | GalleryPhoto) => {
			fetchNui<ServerPromiseResp<GalleryPhoto>>(
				PhotoEvents.SAVE_PHOTO,
				photo,
				buildRespObj(
					{
						id: photo.id ?? Math.random(),
						...photo,
					},
					'ok'
				)
			).then((response) => {
				console.log('addPhoto response', response);
				if (response.status === 'ok' && response.data) addLocalPhoto(response.data);
			});
		},
		[addLocalPhoto]
	);

	const updatePhoto = useCallback(
		(photo: GalleryPhoto) => {
			fetchNui<ServerPromiseResp<GalleryPhoto>>(PhotoEvents.UPDATE_PHOTO, photo).then((response) => {
				if (response.status === 'ok') updateLocalPhoto(photo);
			});
		},
		[updateLocalPhoto]
	);

	const removePhoto = useCallback(
		(photo: GalleryPhoto) => {
			fetchNui<ServerPromiseResp<GalleryPhoto>>(PhotoEvents.DELETE_PHOTO, photo).then((response) => {
				if (response.status === 'ok') removeLocalPhoto(photo);
			});
		},
		[removeLocalPhoto]
	);

	return {
		photos,
		fetchPhotos,
		addPhoto,
		updatePhoto,
		removePhoto,
	};
};

export default usePhotoAPI;
