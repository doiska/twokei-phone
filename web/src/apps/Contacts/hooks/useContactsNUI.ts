import { useCallback } from 'react';

import { ServerPromiseResp } from '@typings/common';
import { Contact, ContactEvents, PreDBContact } from '@typings/contacts';
import fetchNui from '@utils/fetchNui';

import { useContactActions } from './useContactActions';

export const useContactsNUI = () => {
	const { addLocalContact, updateLocalContact, deleteLocalContact } = useContactActions();

	const addNewContact = useCallback(
		({ display, number, avatar }: PreDBContact) => {
			fetchNui<ServerPromiseResp<Contact>>(ContactEvents.ADD_CONTACT, {
				display,
				number,
				avatar,
			}).then((serverResponse) => {
				if (serverResponse.status !== 'ok' || !serverResponse.data) {
					return;
				}

				addLocalContact(serverResponse.data);
				//TODO: snackbar
			});
		},
		[addLocalContact]
	);

	const updateContact = useCallback(
		({ id, display, number, avatar }: Contact) => {
			fetchNui<ServerPromiseResp<Contact>>(ContactEvents.UPDATE_CONTACT, {
				display,
				number,
				avatar,
			}).then((serverResponse) => {
				if (serverResponse.status !== 'ok') return;

				updateLocalContact({
					id,
					display,
					number,
					avatar,
				});
			});
		},
		[updateLocalContact]
	);

	const deleteContact = useCallback(
		({ id }) => {
			fetchNui<ServerPromiseResp>(ContactEvents.DELETE_CONTACT, { id }).then((serverResponse) => {
				if (serverResponse.status !== 'ok') return;

				deleteLocalContact(id);
			});
		},
		[deleteLocalContact]
	);

	return { addNewContact, updateContact, deleteContact };
};
