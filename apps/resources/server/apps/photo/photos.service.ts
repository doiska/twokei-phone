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
				return res({ status: 'ok' });
			}

			console.log(`PhotoService.handlePhotoSave post result`, result);

			res({ status: 'ok', data: result });
		} catch (e) {
			console.error(`Bugo ${e}`, e.message, e);
			res({ status: 'error' });
		}
	}

	async handleFetchPhotos(req: PromiseRequest<void>, res: PromiseEventResponse<GalleryPhoto[]>) {
		try {
			const identifier = PlayerService.getIdentifierByPlayer(req.source);
			const photos = await this.photoDB.fetchPhotos(identifier);
			console.log(`PhotoService.handleFetchPhotos`, photos);

			res({ status: 'ok', data: photos });
		} catch (e) {
			console.error(`Bugo ${e}`, e.message, e);
			res({ status: 'error' });
		}
	}

	async handlePhotoDelete(req: PromiseRequest<PreDBGalleryPhoto>, res: PromiseEventResponse<void>) {
		try {
			if (!req.data) {
				console.error(`No object found in request`);
				return res({ status: 'error' });
			}

			const identifier = PlayerService.getIdentifierByPlayer(req.source);

			const result = await this.photoDB.deletePhoto(identifier, req.data);
			console.log(`PhotoService.handlePhotoDelete`, result);

			if (!result) {
				console.log(`No result found`);
				return res({ status: 'error' });
			}

			res({ status: 'ok' });
		} catch (e) {
			console.error(`Bugo ${e}`, e.message, e);
			res({ status: 'error' });
		}
	}
}

const PhotoService = new _PhotoService();

export default PhotoService;
