import { useCallback } from 'react';

import { ServerPromiseResp } from '@typings/common';
import { GalleryCategory, GalleryPhoto, PhotoEvents } from '@typings/gallery';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { GalleryMockData } from '@apps/photo/gallery/Gallery.mock';
import { useSetGalleryCategories } from '@apps/photo/hooks/state';

export const usePhotoActions = () => {
	const setGalleries = useSetGalleryCategories();

	const fetchCategories = useCallback(async (categoryId: number) => {
		try {
			const response = await fetchNui<ServerPromiseResp<GalleryCategory[]>>(
				PhotoEvents.FETCH_PHOTOS,
				{ categoryId: categoryId },
				buildRespObj(GalleryMockData)
			);

			if (response.status === 'ok' && response.data) {
				setGalleries(response.data);
			}
		} catch (error) {
			return [];
		}
	}, []);

	const addPhoto = useCallback(
		(photo: GalleryPhoto, categoryId = -1) => {
			setGalleries((categories) => {
				const newCategories = categories.map((category) => {
					if (category.id === categoryId) {
						return {
							...category,
							photos: [...category.photos, photo],
						};
					}

					return category;
				});

				return newCategories;
			});
		},
		[setGalleries]
	);

	const deletePhoto = useCallback(
		(imgUrl: string, categoryId = -1) => {
			setGalleries((galleries) => {
				return galleries.map((category) => {
					if (category.id === categoryId) {
						return {
							...category,
							photos: category.photos.filter((photo) => photo.image !== imgUrl),
						};
					}
					return category;
				});
			});
		},
		[setGalleries]
	);

	return { fetchCategories, addPhoto, deletePhoto };
};
