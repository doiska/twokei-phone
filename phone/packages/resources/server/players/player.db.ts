import DBWrapper from 'db/wrapper';
import { ResultSetHeader } from 'mysql2';

export class PlayerDB {
	async fetchIdentifierByPhone(phone: string): Promise<string | null> {
		const result = await DBWrapper.fetch<string>(`SELECT identifier FROM users WHERE phone = ?`, [phone]);

		console.log(`[db] SELECT identifier FROM users WHERE phone = ${phone}`);
		console.log(`[db] ${result}`);

		return result;
	}

	async fetchPhoneByIdentifier(identifier: string): Promise<string | null> {
		const result = await DBWrapper.fetch<string>(`SELECT phone FROM users WHERE identifier = ?`, [identifier]);

		console.log(`[db] SELECT phone FROM users WHERE identifier = ${identifier}`);
		console.log(`[db] ${result}`);

		return result;
	}
}

export default new PlayerDB();
