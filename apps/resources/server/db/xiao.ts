import { CallModel } from '@models/Call.model';
import { ContactModel } from '@models/Contact.model';
import { FiveUserModel } from '@models/FiveUserModel';
import { GalleryItemModel } from '@models/Gallery.model';
import {
	ConversationModel,
	ParticipantModel,
	MessageModel,
} from '@models/Messages.model';
import { TweetItemModel, TwitterProfileModel, TwitterActionModel } from '@models/Twitter.model';

import * as path from 'path';
import { DataSource } from 'typeorm';

export const XiaoDS = new DataSource({
	type: 'mariadb',
	database: 'twokei',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'twokei',
	logging: true,
	logger: 'advanced-console',
	entities: [
		FiveUserModel,
		TweetItemModel,
		TwitterActionModel,
		TwitterProfileModel,
		ContactModel,
		GalleryItemModel,
		ConversationModel,
		ParticipantModel,
		MessageModel,
		CallModel,
	],
});
