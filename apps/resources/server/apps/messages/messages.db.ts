import {
	CreateMessageDTO,
	Message,
	MessageConversation,
	MessagesRequest,
	MessageConversationDTO,
} from '@typings/messages';
import ConversationsSchema from '@entity/conversations.schema';
import MessagesSchema from '@entity/messages.schema';
import ParticipantsSchema from '@entity/participants.schema';

const MAX_MESSAGES_PER_CONVERSATION = 10;

export class MessageDB {
	async createConversation(conversation: MessageConversationDTO & { conversationList: string }): Promise<number> {
		const insertConversation = await ConversationsSchema.create({ ...conversation, label: conversation.label });

		const participants = conversation.participants;

		ParticipantsSchema.bulkCreate(
			participants.map((p) => ({
				participant: p,
				conversation_id: insertConversation.id,
			}))
		);

		return insertConversation.id;
	}

	async createMessage({
		sourceIdentifier,
		sourcePhoneNumber,
		conversationId,
		embed,
		is_embed,
		message,
	}: CreateMessageDTO) {
		return MessagesSchema.create({
			conversationId: conversationId,
			sourceIdentifier: sourceIdentifier,
			sourcePhoneNumber: sourcePhoneNumber,
			embed: embed || '',
			is_embed: is_embed || false,
			message: message || '',
		});
	}

	async getConversations(phoneNumber: string): Promise<MessageConversation[]> {
		return ConversationsSchema.findAll({
			include: [
				{
					model: ParticipantsSchema,
					where: { participant: phoneNumber },
				},
			],
			raw: true,
			nest: true,
		});
	}

	async getConversation(conversationId: number): Promise<MessageConversation> {
		return ConversationsSchema.findOne({
			where: { id: conversationId },
		});
	}

	async getConversationIdByList(conversationList: string): Promise<number> {
		const result = await ConversationsSchema.findOne({ where: { conversationList: conversationList } });
		return result.id;
	}

	async getMessages({ conversationId, page }: MessagesRequest) {
		const offset = page * 10;

		const result = await ConversationsSchema.findAll({
			where: { id: conversationId },
			order: [['conversation_id', 'DESC']],
			limit: MAX_MESSAGES_PER_CONVERSATION,
			offset: offset,
		});

		return result;
	}

	async addParticipantToConversation(conversationList: string, phoneNumber: string) {
		const conversationId = await this.getConversationIdByList(conversationList);

		await ParticipantsSchema.create({
			conversation_id: conversationId,
			participant: phoneNumber,
		});

		return conversationId;
	}

	async doesConversationExists(conversationList: string): Promise<boolean> {
		const count = await ConversationsSchema.count({
			include: [{ model: ParticipantsSchema }],
			where: { conversationList: conversationList },
		});

		console.log(`FOR CONVERSATION ${count}.`);

		return count > 0;
	}

	async doesConversationExistsForPlayer(conversationList: string, phoneNumber: string): Promise<boolean> {
		const count = await ConversationsSchema.count({
			include: [
				{
					model: ParticipantsSchema,
					where: { participant: phoneNumber },
				},
			],
			where: {
				conversationList: conversationList,
			},
		});

		console.log(`FOR PLAYER CONVERSATION ${count}.`);

		return count > 0;
	}
}
