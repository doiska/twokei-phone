import { useCallback } from 'react';

import { ServerPromiseResp } from '@typings/common';
import { Contact, ContactEvents, PreDBContact } from '@typings/contacts';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { useContactActions } from './useContactActions';

export const useContactsNUI = () => {
	const { addLocalContact, updateLocalContact, deleteLocalContact } = useContactActions();

	const addNewContact = useCallback(
		({ display, number, avatar }: PreDBContact) => {
			fetchNui<ServerPromiseResp<PreDBContact>>(
				ContactEvents.ADD_CONTACT,
				{
					display,
					number,
					avatar,
				},
				buildRespObj<PreDBContact>({ display, number, avatar })
			).then((serverResponse) => {
				if (serverResponse.status !== 'ok' || !serverResponse.data) {
					return;
				}

				addLocalContact(serverResponse.data as Contact);
			});
		},
		[addLocalContact]
	);

	const updateContact = useCallback(
		({ id, display, number, avatar }: Contact) => {
			fetchNui<ServerPromiseResp<Contact>>(
				ContactEvents.UPDATE_CONTACT,
				{
					display,
					number,
					avatar,
				},
				buildRespObj<Contact>({ id: id, display, number, avatar }, 'ok')
			).then((serverResponse) => {
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
			fetchNui<ServerPromiseResp<{ id: string }>>(
				ContactEvents.DELETE_CONTACT,
				{ id },
				buildRespObj<{ id: string }>({ id }, 'ok')
			).then((serverResponse) => {
				if (serverResponse.status !== 'ok') return;

				deleteLocalContact(id);
			});
		},
		[deleteLocalContact]
	);

	return { addNewContact, updateContact, deleteContact };
};
