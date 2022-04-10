import {
	CreateMessageDTO,
	Message,
	MessageConversation,
	MessagesRequest,
	MessageConversationDTO,
} from '@typings/messages';
import DBWrapper from '../db/wrapper';
import ConversationsSchema from '../entity/conversations.schema';
import ParticipantsSchema from '../entity/participants.schema';

const MESSAGES_TABLE = 'twokei_phone_messages';
const CONVERSATIONS_TABLE = 'twokei_phone_conversations';
const CONVERSATION_PARTICIPANTS_TABLE = 'twokei_phone_conversation_participants';
const MAX_MESSAGES_PER_CONVERSATION = 10;

export class MessageDB {
	async createConversation(conversation: MessageConversationDTO & { conversationList: string }) {
		const insertConversation = await ConversationsSchema.create({
			...conversation,
		});

		const participants = conversation.participants;

		await ParticipantsSchema.bulkCreate(
			participants.map((p) => ({
				participant: p,
				conversation_id: insertConversation.id,
			}))
		);
	}

	async createMessage({
		sourceIdentifier,
		sourcePhoneNumber,
		conversationId,
		embed,
		is_embed,
		message,
	}: CreateMessageDTO) {
		const id = await DBWrapper.insert(
			`INSERT INTO ${MESSAGES_TABLE} (conversation_id, source, source_phone_number, message, is_embed, embed) 
            VALUES (?, ?, ?, ?, ?, ?)`,
			[conversationId, sourceIdentifier, sourcePhoneNumber, message || '', is_embed || false, embed || '']
		);

		return id;
	}

	async getConversations(phoneNumber: string): Promise<MessageConversation[]> {
		const res = await ConversationsSchema.findAll({
			include: [
				{
					model: ParticipantsSchema,
					where: { participant: phoneNumber },
				},
			],
			raw: true,
			nest: true,
		});

		return res;
	}

	async getConversation(conversationId: number): Promise<MessageConversation> {
		return ConversationsSchema.findOne({
			where: {
				id: conversationId,
			},
		});
	}

	async getConversationIdByList(conversationList: string): Promise<number> {
		const result = await ConversationsSchema.findOne({ where: { conversationList: conversationList } });
		return result.id;
	}

	async getMessages({ conversationId, page }: MessagesRequest) {
		const offset = page * 10;

		const result = await ConversationsSchema.findAll({
			where: {
				id: conversationId,
			},
			order: [['conversation_id', 'DESC']],
			limit: MAX_MESSAGES_PER_CONVERSATION,
			offset: offset,
		});

		return result;
	}

	async addParticipantToConversation(conversationList: string, phoneNumber: string) {
		const conversationId = await this.getConversationIdByList(conversationList);

		const res = await ParticipantsSchema.create({
			conversation_id: conversationId,
			participant: phoneNumber,
		});

		return res;
	}

	async doesConversationExists(conversationList: string): Promise<boolean> {
		const query = `SELECT COUNT(*) as count 
            FROM ${CONVERSATIONS_TABLE} 
            INNER JOIN ${CONVERSATION_PARTICIPANTS_TABLE} 
            ON ${CONVERSATIONS_TABLE}.id = ${CONVERSATION_PARTICIPANTS_TABLE}.conversation_id 
            WHERE conversation_list = ?`;

		console.log(`RAW QUERY RESULT doesConversationExists`);
		const [res] = await DBWrapper._rawQuery(query, [conversationList]);

		console.log(JSON.stringify(res));

		const result = <any>res;
		return result?.[0].count > 0;
	}

	async doesConversationExistsForPlayer(conversationList: string, phoneNumber: string): Promise<boolean> {
		const query = `SELECT COUNT(*) as count 
            FROM ${CONVERSATIONS_TABLE} 
            INNER JOIN ${CONVERSATION_PARTICIPANTS_TABLE} 
            ON ${CONVERSATIONS_TABLE}.id = ${CONVERSATION_PARTICIPANTS_TABLE}.conversation_id 
            WHERE conversation_list = ? AND participant = ?`;

		console.log(`RAW QUERY RESULT doesConversationExistsForPlayer`);

		const [res] = await DBWrapper._rawQuery(query, [conversationList, phoneNumber]);
		console.log(JSON.stringify(res));

		const result = <any>res;

		return result?.[0].count > 0;
	}
}
