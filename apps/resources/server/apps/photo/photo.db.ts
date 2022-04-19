import PhotoSchema from '@entity/gallery/photo.schema';
import { PromiseEventResponse, PromiseRequest } from '@lib/promise.types';
import { GalleryPhoto, PreDBGalleryPhoto } from '@typings/gallery';

export class _PhotoDB {
	async savePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		const result = await PhotoSchema.create({
			category: photo.category,
			image: photo.image,
		}).catch(console.error);

		return result;
	}

	//TODO: get photos by identifier then filter by category

	async fetchPhotos(identifier: string) {
		const result = await PhotoSchema.findAll({
			where: {
				identifier: identifier,
			},
		});
	}
}

export default _PhotoDB;
