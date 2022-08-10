import { FiveUserModel } from '@models/FiveUserModel';

import { XiaoDS } from 'db/xiao';
import PlayerDb from 'players/player.db';
import { config } from 'server';

export async function findOrGeneratePhoneNumber(
	identifier: string
): Promise<string> {
	console.log(`Config`, typeof config, config.database.players_table);

	const phone_number = await PlayerDb.fetchPhoneByIdentifier(identifier);

	if (phone_number) {
		console.log(`Phone number found`, phone_number);
		return phone_number;
	}

	const phone = await generateUniquePhoneNumber();

	console.log(`Phone generated ${phone}`);

	await XiaoDS.getRepository(FiveUserModel).save({
		identifier,
		phoneNumber: phone,
	});

	return phone;
}

const genNumber = (length: number): string => {
	const add = 1;
	const max = 11;

	if (length > max) {
		return genNumber(max) + genNumber(length - max);
	}

	const num = Math.floor(Math.random() * Math.pow(10, length + add));

	const str = '' + num;

	return str.substring(add);
};

const generateUsNumber = (): string => {
	const raw = genNumber(10);
	return raw.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export async function generateUniquePhoneNumber(): Promise<string> {
	const phoneNumber = generateUsNumber();

	const response = await XiaoDS.getRepository(FiveUserModel).findOne({
		where: { phoneNumber },
	});

	if (response) return generateUniquePhoneNumber();

	return phoneNumber;
}
