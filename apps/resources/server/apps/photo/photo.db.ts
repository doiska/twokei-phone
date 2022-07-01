import { XiaoDS } from '@db/xiao';
import { GalleryItemModel } from '@models/Gallery.model';

import { PreDBGalleryPhoto } from '@typings/gallery';

export class _PhotoDB {
	async fetchPhotos(identifier: string) {
		return XiaoDS.getRepository(GalleryItemModel).find({
			where: {
				identifier,
			},
		});
	}

	async savePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		return XiaoDS.getRepository(GalleryItemModel).save(photo);
	}

	async updatePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		return XiaoDS.getRepository(GalleryItemModel).update(
			{ identifier, id: photo.id },
			photo
		);
	}

	async deletePhoto(identifier: string, photo: PreDBGalleryPhoto) {
		return XiaoDS.getRepository(GalleryItemModel).delete({
			identifier,
			...photo,
		});
	}
}

export default _PhotoDB;
