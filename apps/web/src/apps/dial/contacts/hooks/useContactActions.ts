import { useRecoilCallback } from 'recoil';

import { Contact } from '@typings/contacts';

import { contactsState, useSetContacts } from './contactsState';

interface IUseContactActions {
	addLocalContact: (newContact: Contact) => void;
	updateLocalContact: (newContact: Contact) => void;
	deleteLocalContact: (id: number) => void;
}

export const useContactActions = (): IUseContactActions => {
	const setContacts = useSetContacts();

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
		addLocalContact,
		updateLocalContact,
		deleteLocalContact,
	};
};
