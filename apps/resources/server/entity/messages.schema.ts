import { DataTypes, Model } from 'sequelize';
import Xiao from '../db/xiao';
import { CreateMessageDTO } from '@typings/messages';

type MessageDTO = CreateMessageDTO & {
	id: number;
	updatedAt: Date;
	createdAt: Date;
};

class MessagesSchema extends Model<MessageDTO, CreateMessageDTO> {
	declare id: number;
	declare conversation_id: number;
	declare isRead: boolean;

	declare message: string;
	declare sourceIdentifier: string;
	declare sourcePhoneNumber: string;

	declare embed?: string;
	declare is_embed?: boolean;

	declare createdAt: Date;
	declare updatedAt: Date;
}

MessagesSchema.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		conversationId: {
			field: 'conversation_id',
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		// isRead: {
		//     field: 'is_read',
		// 	type: DataTypes.BOOLEAN,
		// 	allowNull: false,
		// },
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sourceIdentifier: {
			field: 'source_identifier',
			type: DataTypes.STRING,
			allowNull: false,
		},
		sourcePhoneNumber: {
			field: 'source_phone_number',
			type: DataTypes.STRING,
			allowNull: false,
		},
		embed: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		is_embed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
			allowNull: true,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		sequelize: Xiao,
		tableName: 'twokei_phone_messages',
	}
);

export default MessagesSchema;
