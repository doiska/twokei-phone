import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { GalleryPhoto, PhotoEvents } from '@typings/gallery';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { GalleryMockData } from '@apps/photo/Photo.mock';

export const photoState = {
	photos: atom<GalleryPhoto[]>({
		key: 'galleryPhotos',
		default: selector({
			key: 'defaultGalleryPhtoso',
			get: async () => {
				try {
					const response = await fetchNui<
						ServerPromiseResp<GalleryPhoto[]>
					>(
						PhotoEvents.FETCH_PHOTOS,
						undefined,
						buildRespObj(GalleryMockData)
					);
					return response.data ?? [];
				} catch (error) {
					return [];
				}
			},
		}),
	}),
	categoryFilterValue: atom<string>({
		key: 'categoryFilter',
		default: '',
	}),
	filteredPhotos: selector<GalleryPhoto[]>({
		key: 'defaultFilteredPhotos',
		get: ({ get }) => {
			const search: string = get(photoState.categoryFilterValue);
			const photos: GalleryPhoto[] = get(photoState.photos);

			if (!search) return photos;

			return photos.filter(
				({ category }) =>
					category &&
					category.toLowerCase().includes(search.toLowerCase())
			);
		},
	}),
};

export const useGalleryPhotos = () => useRecoilState(photoState.photos);
export const useSetGalleryPhotos = () => useSetRecoilState(photoState.photos);
export const useGalleryPhotosValue = () => useRecoilValue(photoState.photos);

export const usePhotoCategoryFilter = () =>
	useRecoilState(photoState.categoryFilterValue);
export const useFilteredPhotos = () =>
	useRecoilValue(photoState.filteredPhotos);
