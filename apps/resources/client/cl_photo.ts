import { PhotoEvents } from '@typings/gallery';
import { RegisterNUIProxy } from '@utils/NUI';

RegisterNUIProxy(PhotoEvents.SAVE_PHOTO);
RegisterNUIProxy(PhotoEvents.DELETE_PHOTO);
RegisterNUIProxy(PhotoEvents.FETCH_PHOTOS);
