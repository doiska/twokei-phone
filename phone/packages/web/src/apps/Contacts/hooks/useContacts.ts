import { useCallback } from 'react';

import { useRecoilValueLoadable } from 'recoil';

import { Contact } from '@typings/contacts';

import { contactsState } from './contactsState';

interface UseContacts {
	contacts: Contact[];
	getContact: (id: number) => Contact | undefined;
	getContactByNumber: (number: string) => Contact | undefined;
	getContactsByNumber: (number: string[]) => Contact[];

	getDisplayByNumber: (number: string) => string | undefined;
	getDisplayListByNumber: (number: string[]) => string[];
	getAvatarByNumber: (number: string) => string | undefined;
}

const useContacts = (): UseContacts => {
	const { state: contactsLoading, contents: contacts } = useRecoilValueLoadable<Contact[]>(contactsState.contacts);

	const getContact = useCallback(
		(id: number | string) => {
			if (contactsLoading !== 'hasValue' || !contacts.length) return;

			for (const contact of contacts) {
				if (contact.id === id) return contact;
			}
			return;
		},
		[contacts, contactsLoading]
	);

	const getContactByNumber = useCallback(
		(number: string) => {
			if (contactsLoading !== 'hasValue' || !contacts.length) return;

			console.log(number);

			for (const contact of contacts) {
				console.log(`USE CONTACTS`);
				console.log(number, contact.number);
				console.log(typeof number, typeof contact.number);
				if (contact.number === number) {
					console.log(`FOUND: `, contact);
					return contact;
				}
			}
			return;
		},
		[contacts, contactsLoading]
	);

	const getContactsByNumber = useCallback(
		(number: string[]) => {
			const found = [];

			if (contactsLoading !== 'hasValue' || !contacts.length) return [];

			for (const contact of contacts) {
				if (number.indexOf(contact.number) !== -1) {
					found.push(contact);
				}
			}
			return found;
		},
		[contacts, contactsLoading]
	);

	const getDisplayByNumber = useCallback(
		(number: string) => getContactByNumber(number)?.display,
		[contacts, getContactByNumber]
	);

	const getDisplayListByNumber = useCallback(
		(number: string[]) => {
			if (contactsLoading !== 'hasValue' || !contacts.length) return [];

			const newList = [...number];

			for (const contact of contacts) {
				if (contact) newList[number.indexOf(contact.number)] = contact.display;
			}
			return newList;
		},
		[contacts, contactsLoading]
	);

	const getAvatarByNumber = useCallback((number: string) => getContactByNumber(number)?.avatar, [getContactByNumber]);

	return {
		contacts,
		getContact,
		getContactByNumber,
		getContactsByNumber,
		getDisplayByNumber,
		getDisplayListByNumber,
		getAvatarByNumber,
	};
};

export default useContacts;
