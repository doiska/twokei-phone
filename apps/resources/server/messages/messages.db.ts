import {
	CreateMessageDTO,
	Message,
	MessageConversation,
	MessagesRequest,
	PreDBMessageConversation,
} from '@typings/messages';
import DBWrapper from 'db/wrapper';

const MESSAGES_TABLE = 'twokei_phone_messages';
const CONVERSATIONS_TABLE = 'twokei_phone_conversations';
const CONVERSATION_PARTICIPANTS_TABLE = 'twokei_phone_conversation_participants';
const MAX_MESSAGES_PER_CONVERSATION = 10;

export class MessageDB {
	async createConversation({
		source,
		conversationLabel,
		conversationList,
		participants,
		isGroupChat,
	}: PreDBMessageConversation & { conversationList: string }) {
		const conversationId = await DBWrapper.insert(
			`INSERT INTO ${CONVERSATIONS_TABLE} (label, source, is_group_chat, conversation_list) VALUES (?, ?, ?, ?)`,
			[conversationLabel, source, isGroupChat, conversationList]
		);

		for (const participant of participants) {
			await DBWrapper.insert(
				`INSERT INTO ${CONVERSATION_PARTICIPANTS_TABLE} (conversation_id, participant) VALUES (?, ?)`,
				[conversationId, participant]
			);
		}

		return conversationId;
	}

	async createMessage({
		sourceIdentifier,
		sourcePhoneNumber,
		converstationId,
		embed,
		is_embed,
		message,
	}: CreateMessageDTO) {
		const id = await DBWrapper.insert(
			`INSERT INTO ${MESSAGES_TABLE} (conversation_id, source, source_phone_number, message, is_embed, embed) 
            VALUES (?, ?, ?, ?, ?, ?)`,
			[converstationId, sourceIdentifier, sourcePhoneNumber, message || '', is_embed || false, embed || '']
		);

		return id;
	}

	async getConversations(phoneNumber: string): Promise<MessageConversation[]> {
		//TODO: ${CONVERSATIONS_TABLE}.unread_count as unreadCount,

		const query = `SELECT 
            ${CONVERSATIONS_TABLE}.id,
            ${CONVERSATIONS_TABLE}.label,
            ${CONVERSATIONS_TABLE}.is_group_chat as isGroupChat, 
            ${CONVERSATIONS_TABLE}.conversation_list as conversationList,
            ${CONVERSATIONS_TABLE}.source as source
            FROM ${CONVERSATIONS_TABLE}
            INNER JOIN ${CONVERSATION_PARTICIPANTS_TABLE} ON ${CONVERSATION_PARTICIPANTS_TABLE}.conversation_id = ${CONVERSATIONS_TABLE}.id
            WHERE ${CONVERSATION_PARTICIPANTS_TABLE}.participant = ?
        `;

		return await DBWrapper.fetch<MessageConversation>(query, [phoneNumber]);
	}

	async getConversation(conversationId: number): Promise<MessageConversation> {
		const [conversation] = await DBWrapper.fetch<MessageConversation>(
			`SELECT * FROM ${CONVERSATIONS_TABLE} WHERE id = ? LIMIT 1`,
			[conversationId]
		);
		return conversation;
	}

	async getConversationIdByList(conversationList: string): Promise<number> {
		const query = `SELECT id FROM ${CONVERSATIONS_TABLE} WHERE conversation_list = ?`;

		const [results] = await DBWrapper.fetch<MessageConversation>(query);

		return results.id;
	}

	async getMessages({ conversationId, page }: MessagesRequest) {
		const offset = page * 10;

		const query = `SELECT * FROM ${MESSAGES_TABLE} WHERE conversation_id = ? ORDER BY conversation_id DESC LIMIT ? OFFSET ?`;
		const results = await DBWrapper.fetch<Message>(query, [
			conversationId,
			MAX_MESSAGES_PER_CONVERSATION.toString(),
			offset.toString(),
		]);

		return results;
	}

	async addParticipantToConversation(conversationList: string, phoneNumber: string) {
		const conversationId = await this.getConversationIdByList(conversationList);

		await DBWrapper.insert(
			`INSERT INTO ${CONVERSATION_PARTICIPANTS_TABLE} (conversation_id, participant) VALUES (?, ?)`,
			[conversationId, phoneNumber]
		);

		return conversationId;
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
