export type Alerts =
	| 'CONTACT_ADD_SUCCESS'
	| 'CONTACT_ADD_FAILED'
	| 'CONTACT_UPDATE_SUCCESS'
	| 'CONTACT_UPDATE_FAILED'
	| 'CONTACT_DELETE_SUCCESS'
	| 'CONTACT_DELETE_FAILED';

export interface PreDBContact {
	display: string;
	number: string;
	avatar?: string;
}

export interface Contact extends PreDBContact {
	id: number;
}

export interface ContactDeleteDTO {
	id: number;
}

export enum ContactLimits {
	number = 9,
	avatar = 255,
	display = 35,
}

export enum ContactEvents {
	ADD_CONTACT = 'tkphone:contacts:addContact',
	GET_CONTACTS = 'tkphone:contacts:getContacts',
	UPDATE_CONTACT = 'tkphone:contacts:updateContact',
	DELETE_CONTACT = 'tkphone:contacts:deleteContact',
}

export enum ContactErrors {
	INVALID_ID = 'CONTACT_ERROR_INVALID_ID',
	INVALID_NUMBER = 'CONTACT_ERROR_INVALID_NUMBER',
	INVALID_DISPLAY = 'CONTACT_ERROR_INVALID_DISPLAY',
	INVALID_URL = 'CONTACT_ERROR_INVALID_URL',

	FETCH_FAILED = 'CONTACT_ERROR_FETCH_FAILED',
	INSERT_FAILED = 'CONTACT_ERROR_INSERT_FAILED',
	UPDATE_FAILED = 'CONTACT_ERROR_UPDATE_FAILED',
	DELETE_FAILED = 'CONTACT_ERROR_DELETE_FAILED',
}
