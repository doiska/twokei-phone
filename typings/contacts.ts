export type Alerts =
    | 'CONTACT_ADD_SUCCESS' | 'CONTACT_ADD_FAILED'
    | 'CONTACT_UPDATE_SUCCESS' | 'CONTACT_UPDATE_FAILED'
    | 'CONTACT_DELETE_SUCCESS' | 'CONTACT_DELETE_FAILED';


export interface PreDBContact {
    display: string;
    number: string;
    avatar?: string;
}
export interface Contact extends PreDBContact {
    id: number;
}

export enum ContactLimits {
    number = 15,
    avatar = 255,
    display = 100
}

export enum ContactEvents {
    ADD_CONTACT = 'tkphone:contacts:addContact',
    GET_CONTACTS = 'tkphone:contacts:getContacts',
    UPDATE_CONTACT = 'tkphone:contacts:updateContact',
    DELETE_CONTACT = 'tkphone:contacts:deleteContact',
}