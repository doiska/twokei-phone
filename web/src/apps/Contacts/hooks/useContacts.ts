import { ServerPromiseResp } from '@typings/common';
import { Contact, ContactEvents } from '@typings/contacts';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';
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
						buildRespObj<Contact[]>(BrowserContactsState)
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
    filteredByStart: selector({
        key: 'filteredByStart',
        get: ({ get }) => {
            const contacts: Contact[] = get(contactsState.filteredContacts);
            const contactsByStart = [] as unknown as { [key: string]: Contact[] };

            for(const contact of contacts) {
                const letter = contact.display.substring(0, 1).toUpperCase() ?? '#';

                const current = contactsByStart[`${letter}`] || [];
                contactsByStart[`${letter}`] = [...current, contact];
            }
            return contactsByStart;
        }
    })
};

export const useContacts = () => useRecoilState(contactsState.contacts);
export const useSetContacts = () => useSetRecoilState(contactsState.contacts);
export const useContactsValue = () => useRecoilValue(contactsState.contacts);

export const useFilteredContacts = () => useRecoilValue(contactsState.filteredContacts);
export const useFilteredContactsByInitial = () => useRecoilValue(contactsState.filteredByStart);

export const useContactFilterInput = () => useRecoilState(contactsState.filterInput);
export const useSetContactFilterInput = () => useSetRecoilState(contactsState.filterInput);
