import { Contact, ContactDeleteDTO, ContactErrors, ContactEvents, PreDBContact } from '@typings/contacts';
import { onNetPromise } from 'lib/onNetPromise';
import ContactService from './contacts.service';

console.log(`Loaded Contacts Controller.`);

onNetPromise<void, Contact[]>(ContactEvents.GET_CONTACTS, (req, resp) => {
	console.log(`Received event GET_CONTACTS`, req);
	ContactService.fetchAllContacts(req, resp).catch((e) => {
		console.error(`Failed to fetch contacts: ${req.source} due`, e);
		resp({ status: 'error', errorMsg: ContactErrors.FETCH_FAILED });
	});
});

onNetPromise<PreDBContact, Contact>(ContactEvents.ADD_CONTACT, (req, resp) => {
	ContactService.handleContactAdd(req, resp).catch((e) => {
		console.error(`Failed to add contact: ${req.source} due`, e);
		resp({ status: 'error', errorMsg: ContactErrors.INSERT_FAILED });
	});
});

onNetPromise<Contact, void>(ContactEvents.UPDATE_CONTACT, (req, resp) => {
	ContactService.handleContactUpdate(req, resp).catch((e) => {
		console.error(`Failed to update contact: ${req.source} due`, e);
		resp({ status: 'error', errorMsg: ContactErrors.UPDATE_FAILED });
	});
});

onNetPromise<ContactDeleteDTO, void>(ContactEvents.DELETE_CONTACT, (req, resp) => {
	ContactService.handleContactDelete(req, resp).catch((e) => {
		console.error(`Failed to delete contact: ${req.source} due`, e);
		resp({ status: 'error', errorMsg: ContactErrors.DELETE_FAILED });
	});
});
