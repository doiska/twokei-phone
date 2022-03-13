import { ServerPromiseResp } from '@typings/common';
import { Contact, ContactEvents } from '@typings/contacts';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/misc';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BrowserContactsState } from '../constants';

export const contactsState = {
	contacts: atom<Contact[]>({
		key: 'contactsList',
		default: selector({
			key: 'contactsListDefault',
			get: async () => {
				console.log(`Contacts`, BrowserContactsState);
				try {
					const resp = await fetchNui<ServerPromiseResp<Contact[]>>(
						ContactEvents.GET_CONTACTS,
						undefined,
						buildRespObj(BrowserContactsState)
					);
					return resp.data ?? [];
				} catch (error) {
					console.error(error);
					return [];
				}
			},
		}),
	}),
	filterInput: atom<string>({
		key: 'filterInput',
		default: '',
	}),
	filteredContacts: selector({
		key: 'fitleredContacts',
		get: ({ get }) => {
			const filterInputVal: string = get(contactsState.filterInput);
			const contacts: Contact[] = get(contactsState.contacts);

			if (!filterInputVal) return contacts;

			const regExp = new RegExp(filterInputVal, 'gi');

			return contacts.filter((contact) => contact.display.match(regExp) || contact.number.match(regExp));
		},
	}),
};

export const useContacts = () => useRecoilState(contactsState.contacts);
export const useSetContacts = () => useSetRecoilState(contactsState.contacts);
export const useContactsValue = () => useRecoilValue(contactsState.contacts);

export const useFilteredContacts = () => useRecoilValue(contactsState.filteredContacts);

export const useContactFilterInput = () => useRecoilState(contactsState.filterInput);
export const useSetContactFilterInput = () => useSetRecoilState(contactsState.filterInput);
