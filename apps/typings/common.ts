export interface ServerPromiseResp<T = undefined> {
	errorMsg?: string;
	status: 'ok' | 'error' | undefined;
	data?: T;
}

export interface Profile {
	id?: number;
	identifier?: string;
	name?: string;
	username: string;
	avatar?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type ProfileDTO = {
	name?: string;
	username: string;
	avatar?: string;
}

export enum GENERIC_EVENTS {
	FETCH_USER_LOCATION = 'tkphone:core:fetch-user-location',
}
