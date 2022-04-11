import { Contact, ContactDeleteDTO, ContactErrors, ContactEvents, PreDBContact } from '@typings/contacts';
import PlayerService from '../../players/player.service';
import { PromiseEventResponse, PromiseRequest } from '../../lib/promise.types';
import ContactsDBWrapper, { _ContactsWrapper } from './contacts.db';
import Service from '@common/service';

class _ContactService extends Service {
	private readonly contactsDBWrapper: _ContactsWrapper;

	constructor() {
		super('Contacts');
		this.contactsDBWrapper = ContactsDBWrapper;
		console.info(`Contacts service started`);
	}

	async fetchAllContacts(req: PromiseRequest<void>, resp: PromiseEventResponse<Contact[]>): Promise<void> {
		const identifier = PlayerService.getIdentifierByPlayer(req.source);

		try {
			const contacts = await this.contactsDBWrapper.fetchAllContacts(identifier);

			resp({ status: 'ok', data: contacts });
		} catch (e) {
			console.error(e);
			resp({ status: 'error', errorMsg: ContactErrors.FETCH_FAILED });
		}
	}

	async handleContactAdd(req: PromiseRequest<PreDBContact>, resp: PromiseEventResponse<Contact>): Promise<void> {
		const identifier = PlayerService.getIdentifierByPlayer(req.source);

		try {
			//TODO: filter url;

			const contact = await this.contactsDBWrapper.addContact(identifier, req.data);
			resp({ status: 'ok', data: contact });
		} catch (e) {
			console.error(e);
			resp({ status: 'error', errorMsg: ContactErrors.INSERT_FAILED });
		}
	}

	async handleContactUpdate(req: PromiseRequest<Contact>, resp: PromiseEventResponse<void>): Promise<void> {
		const identifier = PlayerService.getIdentifierByPlayer(req.source);

		try {
			const url = req.data.avatar; //TODO: check if url is valid

			if (url == null) {
				return resp({ status: 'error', errorMsg: 'ERROR_INVALID_URL' });
			}

			await this.contactsDBWrapper.updateContact(identifier, req.data);
			resp({ status: 'ok' });
		} catch (e) {
			console.error(e);
			resp({ status: 'error', errorMsg: ContactErrors.UPDATE_FAILED });
		}
	}

	async handleContactDelete(req: PromiseRequest<ContactDeleteDTO>, resp: PromiseEventResponse<void>): Promise<void> {
		const identifier = PlayerService.getIdentifierByPlayer(req.source);

		try {
			await this.contactsDBWrapper.deleteContact(identifier, req.data.id);
			resp({ status: 'ok' });
		} catch (e) {
			console.error(ContactErrors.DELETE_FAILED, e);
			resp({ status: 'error', errorMsg: ContactErrors.DELETE_FAILED });
		}
	}
}

const ContactService = new _ContactService();
export default ContactService;
