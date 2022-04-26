import PhotoSchema from '@entity/gallery/photo.schema';
import { PromiseEventResponse, PromiseRequest } from '@lib/promise.types';
import { GalleryPhoto, PreDBGalleryPhoto } from '@typings/gallery';

export class _PhotoDB {
	async fetchPhotos(identifier: string) {
		const result = await PhotoSchema.findAll({
			where: {
				identifier: identifier,
			},
			raw: true,
		});

		return result;
	}

	async savePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		const result = await PhotoSchema.create(
			{
				identifier: identifier,
				category: photo.category,
				image: photo.image,
			},
			{ raw: true }
		);

		return result.toJSON();
	}

	async updatePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		const result = await PhotoSchema.update(
			{
				category: photo.category,
				image: photo.image,
			},
			{
				where: {
					id: photo.id,
					identifier: identifier,
				},
			}
		);

		return result;
	}

	async deletePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		const result = await PhotoSchema.destroy({
			where: {
				id: photo.id,
				identifier: identifier,
			},
		});
		return result;
	}
}

export default _PhotoDB;
