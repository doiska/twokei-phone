import DBWrapper from '../db/wrapper';

export class PlayerDB {
	async fetchIdentifierByPhone(phone: string): Promise<string | null> {
		const [{ identifier }] = await DBWrapper.fetch<{ identifier: string }>(
			`SELECT identifier FROM users WHERE phone = ?`,
			[phone]
		);

		return identifier;
	}

	async fetchPhoneByIdentifier(identifier: string): Promise<string | null> {
		const [{ phone }] = await DBWrapper.fetch<{ phone: string }>(`SELECT phone FROM users WHERE identifier = ?`, [
			identifier,
		]);

		return phone;
	}
}

export default new PlayerDB();
