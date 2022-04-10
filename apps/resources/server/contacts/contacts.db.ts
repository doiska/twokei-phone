import { Contact, PreDBContact } from '@typings/contacts';
import DBWrapper from '../db/wrapper';
import ContactSchema from '../entity/contact.schema';
import { Tables } from '../server.db';

export class _ContactsWrapper {
	async fetchAllContacts(identifier: string) {
		const result = await ContactSchema.findAll({
			where: {
				identifier: identifier,
			},
		});

		return result;
	}

	async addContact(identifier: string, { display, number, avatar }: PreDBContact) {
		const result = await ContactSchema.create({
			identifier: identifier,
			display: display,
			number: number,
			avatar: avatar,
		});

		return {
			id: result.id,
			display,
			number,
			avatar,
		};
	}

	async updateContact(identifier: string, contact: Contact) {
		await ContactSchema.update(
			{
				identifier: identifier,
				display: contact.display,
				number: contact.number,
				avatar: contact.avatar,
			},
			{
				where: {
					id: contact.id,
					identifier: identifier,
				},
			}
		);
	}

	async deleteContact(identifier: string, id: number) {
		await ContactSchema.destroy({
			where: {
				identifier: identifier,
				id: id,
			},
		});
	}
}

export default new _ContactsWrapper();
