import { ServerPromiseResp } from '@typings/common';

export interface PromiseRequest<T = any> {
	data: T;
	source: number;
	identifier: string;
}

export type PromiseEventResponse<T> = (returnData: ServerPromiseResp<T>) => void;

export type PromiseCB<T, P> = (req: PromiseRequest<T>, resp: PromiseEventResponse<P>) => void;
