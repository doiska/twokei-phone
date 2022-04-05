import { useRecoilCallback } from 'recoil';

import { Contact } from '@typings/contacts';

import { contactsState, useSetContacts } from './useContacts';

interface IUseContactActions {
	getContact: (id: number) => Contact | null;
	getContactByNumber: (number: string) => Contact | null;
	getContactsByNumber: (number: string[]) => Contact[] | null;
	getDisplayByNumber: (number: string) => string | null;
	getDisplayListByNumber: (number: string[]) => string[];
	getPictureByNumber: (number: string) => string | null;
	addLocalContact: (newContact: Contact) => void;
	updateLocalContact: (newContact: Contact) => void;
	deleteLocalContact: (id: number) => void;
}

export const useContactActions = (): IUseContactActions => {
	const setContacts = useSetContacts();

	const getContact = useRecoilCallback<[number], Contact | null>(
		({ snapshot }) =>
			(id: number) => {
				const { state, contents } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				for (const contact of contents) {
					if (contact.id === id) return contact;
				}

				return null;
			},
		[]
	);

	const getDisplayByNumber = useRecoilCallback<[string], string>(
		({ snapshot }) =>
			(number: string) => {
				const { state, contents } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return number;

				const found = contents.find((contact: Contact) => contact.number === number);
				return found ? found.display : number;
			},
		[]
	);

	const getDisplayListByNumber = useRecoilCallback<[string[]], string[]>(({ snapshot }) => (number: string[]) => {
		const { state, contents } = snapshot.getLoadable(contactsState.contacts);

		if (state !== 'hasValue') return [];

		const newList = [...number];

		for (const contact of contents) {
			newList[number.indexOf(contact.number)] = contact.display;
		}
		return newList;
	});

	const getPictureByNumber = useRecoilCallback<[string], string | null>(
		({ snapshot }) =>
			(number: string) => {
				const { state, contents } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				const found = contents.find((contact) => contact.number === number);
				return found?.avatar ?? null;
			},
		[]
	);

	const getContactByNumber = useRecoilCallback<[string], Contact | null>(
		({ snapshot }) =>
			(number: string) => {
				const { state, contents } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				for (const contact of contents) {
					if (contact.number === number) return contact;
				}

				return null;
			},
		[]
	);

	const getContactsByNumber = useRecoilCallback<[string[]], Contact[]>(
		({ snapshot }) =>
			(number: string[]) => {
				const { state, contents } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return [];

				const found = [];

				for (const contact of contents) {
					if (number.indexOf(contact.number) !== -1) {
						found.push(contact);
					}
				}
				return found;
			},
		[]
	);

	const addLocalContact = useRecoilCallback<[Contact], void>(
		({ snapshot }) =>
			(newContact: Contact) => {
				const { state } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				setContacts((curContacts) => [...curContacts, newContact]);
			},
		[]
	);

	const deleteLocalContact = useRecoilCallback<[number], void>(
		({ snapshot }) =>
			(id: number) => {
				const { state } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				setContacts((curContacts) => [...curContacts].filter((contact) => contact.id !== id));
			},
		[]
	);

	const updateLocalContact = useRecoilCallback<[Contact], void>(
		({ snapshot }) =>
			(newContact: Contact) => {
				const { state } = snapshot.getLoadable(contactsState.contacts);

				if (state !== 'hasValue') return null;

				setContacts((curContacts) => {
					const targetContactIndex = curContacts.findIndex((contact) => contact.id === newContact.id);

					const newContacts = [...curContacts];
					newContacts[targetContactIndex] = newContact;
					return newContacts;
				});
			},
		[]
	);

	return {
		getContact,
		getContactByNumber,
		getContactsByNumber,
		getDisplayByNumber,
		getDisplayListByNumber,
		getPictureByNumber,
		addLocalContact,
		updateLocalContact,
		deleteLocalContact,
	};
};
