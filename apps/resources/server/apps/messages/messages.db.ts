import { XiaoDS } from '@db/xiao';
import {
	ConversationModel,
	ParticipantModel,
	MessageModel,
} from '@models/Messages.model';

import {
	CreateMessageDTO,
	MessageConversation,
	MessagesRequest,
	MessageConversationDTO,
} from '@typings/messages';

const MAX_MESSAGES_PER_CONVERSATION = 10;

export class MessageDB {
	async createConversation(
		conversation: MessageConversationDTO & { conversationList: string }
	): Promise<number> {
		const insertConversation = await XiaoDS.getRepository(
			ConversationModel
		).save({ ...conversation, label: conversation.label });

		const participants = conversation.participants;
		const participantModels = participants.map((participant) => ({
			conversation_id: insertConversation.id,
			participant: participant,
		}));

		await XiaoDS.getRepository(ParticipantModel).save(participantModels);

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
		return XiaoDS.getRepository(MessageModel).save({
			conversationId: conversationId,
			sourceIdentifier: sourceIdentifier,
			sourcePhoneNumber: sourcePhoneNumber,
			embed: embed || '',
			is_embed: is_embed || false,
			message: message || '',
		});
	}

	async getConversations(
		phoneNumber: string
	): Promise<MessageConversation[]> {
		const result = await XiaoDS.getRepository(ConversationModel)
			.createQueryBuilder('conversation')
			.innerJoin(
				'conversation.participants',
				'participant',
				'participant.participant = :phoneNumber',
				{ phoneNumber }
			)
			.getMany();

		console.log(`FOR PLAYER CONVERSATIONS ${JSON.stringify(result)}.`);

		return result as MessageConversation[];
	}

	async getConversation(
		conversationId: number
	): Promise<ConversationModel | null> {
		return XiaoDS.getRepository(ConversationModel).findOne({
			where: { id: conversationId },
		});
	}

	async getConversationIdByList(conversationList: string): Promise<number> {
		return XiaoDS.getRepository(ConversationModel)
			.findOne({
				where: { conversationList },
			})
			.then((result) => result.id);
	}

	async getMessages({ conversationId, page }: MessagesRequest) {
		const offset = page * 10;

		return XiaoDS.getRepository(ConversationModel).find({
			where: { id: conversationId },
			order: { id: 'DESC' },
			take: MAX_MESSAGES_PER_CONVERSATION,
			skip: offset,
		});
	}

	async addParticipantToConversation(
		conversationList: string,
		phoneNumber: string
	) {
		const conversationId = await this.getConversationIdByList(
			conversationList
		);

		return XiaoDS.getRepository(ParticipantModel)
			.save({
				conversationId,
				participant: phoneNumber,
			})
			.then((result) => result.id);
	}

	async doesConversationExists(conversationList: string): Promise<boolean> {
		const count = await XiaoDS.getRepository(ConversationModel).count({
			where: { conversationList: conversationList },
		});

		console.log(`COUNT OF CONVERSATION ${count}.`);

		return count > 0;
	}

	async doesConversationExistsForPlayer(
		conversationList: string,
		phoneNumber: string
	): Promise<boolean> {
		const count = await XiaoDS.getRepository(ConversationModel)
			.createQueryBuilder('conversation')
			.innerJoin(
				'conversation.participants',
				'participant',
				'participant.participant = :phoneNumber',
				{ phoneNumber }
			)
			.getCount();

		console.log(`FOR PLAYER CONVERSATION ${count}.`);

		return count > 0;
	}
}
