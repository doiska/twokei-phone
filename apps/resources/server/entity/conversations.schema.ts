import { DataTypes, Model } from 'sequelize';
import Xiao from '../db/xiao';
import ParticipantsSchema from './participants.schema';

import { MessageConversationDTO, MessageConversation } from '@typings/messages';

class ConversationsSchema extends Model<MessageConversation, MessageConversationDTO & { conversationList: string }> {
	declare id: number;
	declare label: string;
	declare avatar?: string;
	declare source: string;
	declare admins?: string[];
	declare conversationList: string;
	declare isGroupChat: boolean;
	declare unread?: number;
	declare unreadCount?: number;
	declare updatedAt?: number;
	declare createdAt?: number;
}

ConversationsSchema.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		label: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		source: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		conversationList: {
			field: 'conversation_list',
			type: DataTypes.STRING,
			allowNull: false,
		},
		isGroupChat: {
			field: 'is_group_chat',
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
			allowNull: true,
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		sequelize: Xiao,
		tableName: 'twokei_phone_conversations',
	}
);

ParticipantsSchema.belongsTo(ConversationsSchema, { foreignKey: 'conversation_id' });
ConversationsSchema.hasMany(ParticipantsSchema, { foreignKey: 'conversation_id' });

export default ConversationsSchema;
