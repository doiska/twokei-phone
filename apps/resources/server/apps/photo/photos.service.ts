import { PromiseEventResponse, PromiseRequest } from '@lib/promise.types';
import { GalleryPhoto, PreDBGalleryPhoto } from '@typings/gallery';
import PhotoDB from './photo.db';
import PlayerService from 'players/player.service';

class _PhotoService {
	private readonly photoDB;

	constructor() {
		this.photoDB = new PhotoDB();
		console.debug('PhotoService initialized');
	}

	async handlePhotoSave(req: PromiseRequest<PreDBGalleryPhoto>, res: PromiseEventResponse<GalleryPhoto>) {
		try {
			if (!req.data) {
				console.error(`No object found in request`);
				return res({ status: 'error' });
			}

			const identifier = PlayerService.getIdentifierByPlayer(req.source);

			const result = await this.photoDB.savePhoto(identifier, req.data);
			console.log(`PhotoService.handlePhotoSave`, result);

			if (!result) {
				console.log(`No result found`);
				return res({ status: 'error' });
			}

			res({ status: 'ok', data: result });
		} catch (e) {
			console.error(`Bugo ${e}`, e.message, e);
			res({ status: 'error' });
		}
	}

	async handleFetch() {
		console.log(`Handle fetch`);
		// this.photoDB.fetchPhotos();
	}
}

const PhotoService = new _PhotoService();

export default PhotoService;
