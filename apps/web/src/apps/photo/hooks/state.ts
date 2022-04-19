import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { GalleryPhoto, PhotoEvents } from '@typings/gallery';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { GalleryMockData } from '@apps/photo/gallery/Gallery.mock';

export const photoState = {
	photos: atom<GalleryPhoto[]>({
		key: 'galleryPhotos',
		default: selector({
			key: 'defaultGalleryPhtoso',
			get: async () => {
				try {
					const response = await fetchNui<ServerPromiseResp<GalleryPhoto[]>>(
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

export const useGalleryPhotos = () => useRecoilState(photoState.photos);
export const useSetGalleryPhotos = () => useSetRecoilState(photoState.photos);
export const useGalleryPhotosValue = () => useRecoilValue(photoState.photos);
