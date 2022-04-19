import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { GalleryCategory, PhotoEvents } from '@typings/gallery';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { GalleryMockData } from '@apps/photo/gallery/Gallery.mock';

export const photoState = {
	categories: atom<GalleryCategory[]>({
		key: 'galleryCategories',
		default: selector({
			key: 'defaultGalleryCategories',
			get: async () => {
				try {
					const response = await fetchNui<ServerPromiseResp<GalleryCategory[]>>(
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
};

export const useGalleryCategories = () => useRecoilState(photoState.categories);
export const useSetGalleryCategories = () => useSetRecoilState(photoState.categories);
export const useGalleryCategoriesValue = () => useRecoilValue(photoState.categories);
