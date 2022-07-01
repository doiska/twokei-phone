import { XiaoDS } from '@db/xiao';

import { Contact, PreDBContact } from '@typings/contacts';

import { ContactModel } from 'models/Contact.model';

export class _ContactsWrapper {
	async fetchAllContacts(identifier: string) {
		return XiaoDS.getRepository(ContactModel).find({
			where: {
				identifier: identifier,
			},
		});
	}

	async addContact(identifier: string, contact: PreDBContact) {
		return XiaoDS.getRepository(ContactModel).save({
			identifier,
			...contact,
		});
	}

	async updateContact(identifier: string, contact: Contact) {
		return XiaoDS.getRepository(ContactModel).update(
			{
				id: contact.id,
				identifier: identifier,
			},
			{
				display: contact.display,
				number: contact.number,
				avatar: contact.avatar,
			}
		);
	}

	async deleteContact(identifier: string, id: number) {
		return XiaoDS.getRepository(ContactModel).delete({
			id,
			identifier,
		});
	}
}

export default new _ContactsWrapper();
