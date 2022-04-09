import { Contact, PreDBContact } from '@typings/contacts';
import DBWrapper from '../db/wrapper';
import { Tables } from '../server.db';

export class _ContactsWrapper {
	async fetchAllContacts(identifier: string) {
		const query = `SELECT * FROM ${Tables.CONTACTS} WHERE identifier = ? ORDER BY display ASC`;
		return await DBWrapper.fetch<Contact>(query, [identifier]);
	}

	async addContact(identifier: string, { display, number, avatar }: PreDBContact) {
		const query = `INSERT INTO ${Tables.CONTACTS} (identifier, display, number, avatar) VALUES (?, ?, ?, ?)`;
		const result = await DBWrapper.insert(query, [identifier, display, number, avatar]);

		return {
			id: result,
			display,
			number,
			avatar,
		};
	}

	async updateContact(identifier: string, contact: Contact) {
		console.log(contact);
		const query = `UPDATE ${Tables.CONTACTS} SET display = ?, number = ?, avatar = ? WHERE id = ?`;
		await DBWrapper.update(query, [contact.display, contact.number, contact.avatar, contact.id]);
	}

	async deleteContact(identifier: string, id: number) {
		const query = `DELETE FROM ${Tables.CONTACTS} WHERE id = ? AND identifier = ?`;
		await DBWrapper.remove(query, [id, identifier]);
	}
}

export default new _ContactsWrapper();
