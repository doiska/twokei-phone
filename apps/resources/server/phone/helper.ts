import DBWrapper from '../db/wrapper';
import { config } from '../server';

export async function findOrGeneratePhoneNumber(identifier: string): Promise<string> {
	console.log(`Config`, typeof config, config.database.players_table);

	const [{ phone_number }] = await DBWrapper.fetch<{ phone_number: string }>(
		`SELECT phone_number FROM ${config.database.players_table} WHERE identifier = ?`,
		[identifier]
	);

	if (phone_number) {
		console.log(`Phone number found`, phone_number);
		return phone_number;
	}

	const phone = await generateUniquePhoneNumber();

	console.log(`Phone generated ${phone}`);

	const result = await DBWrapper.insert(
		`INSERT INTO ${config.database.players_table} (identifier, phone_number) VALUES (?, ?)`,
		[identifier, phone]
	);

	console.log(result);

	return phone;
}

const genNumber = (lenght: number): string => {
	const add = 1;
	const max = 11;

	if (lenght > max) {
		return genNumber(max) + genNumber(lenght - max);
	}

	const num = Math.floor(Math.random() * Math.pow(10, lenght + add));

	const str = '' + num;

	return str.substring(add);
};

const generateUsNumber = (): string => {
	const raw = genNumber(10);
	return raw.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export async function generateUniquePhoneNumber(): Promise<string> {
	const phoneNumber = generateUsNumber();

	const [response] = await DBWrapper.fetch<string>(
		`SELECT * FROM ${config.database.players_table} WHERE phone_number = ?`,
		[phoneNumber]
	);

	if (response) return generateUniquePhoneNumber();

	return phoneNumber;
}
