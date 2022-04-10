import { DataTypes, Model, Optional } from 'sequelize';
import { ConversationParticipant } from '@typings/messages';
import Xiao from '../db/xiao';

type ConversationParticipantOptional = Optional<ConversationParticipant, 'id'>;

class ParticipantsSchema extends Model<ConversationParticipant, ConversationParticipantOptional> {
	declare conversation_id: number;
	declare participant: string;
	declare unread_count: number;
}

ParticipantsSchema.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		conversation_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		participant: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		unread_count: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		sequelize: Xiao,
		tableName: 'twokei_phone_conversation_participants',
	}
);

export default ParticipantsSchema;
