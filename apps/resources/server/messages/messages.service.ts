import { MessageConversation, MessageEvents, MessageConversationDTO } from '@typings/messages';
import { PromiseEventResponse, PromiseRequest } from 'lib/promise.types';
import PlayerService from '../players/player.service';
import { emitNetTyped } from '../utils/fivem';
import { MessageDB } from './messages.db';
import { createConversationHash } from './messages.utils';

class _MessageService {
	private readonly MessageDB: MessageDB;

	constructor() {
		this.MessageDB = new MessageDB();
		console.log(`MessageService started.`);
	}

	async createConversation(
		req: PromiseRequest<MessageConversationDTO>,
		resp: PromiseEventResponse<MessageConversation>
	) {
		const playerNumber = PlayerService.getPlayer(req.source).phoneNumber;
		const { conversationLabel, participants, isGroupChat } = req.data;

		console.log(`Current Participants ${participants}`);

		const hashedList = createConversationHash(participants);
		console.log(`Hashed Participants ${hashedList}`);

		const doesConversationExists = await this.MessageDB.doesConversationExists(hashedList);

		if (doesConversationExists) {
			console.debug(`Conversation already exists.`);

			const playerHasConversation = await this.MessageDB.doesConversationExistsForPlayer(
				hashedList,
				playerNumber
			);

			if (playerHasConversation) {
				console.debug(`Player already has this conversation.`);
				return resp({ status: 'error', errorMsg: 'MESSAGES_CONVERSATION_DUPLICATE' });
			}

			const conversationId = await this.MessageDB.addParticipantToConversation(hashedList, playerNumber);

			const response = {
				id: conversationId,
				label: conversationLabel,
				conversationList: hashedList,
				isGroupChat,
			};

			return resp({ status: 'ok', data: { ...response, source: playerNumber } });
		}

		console.debug(`Creating new conversation.`);

		try {
			const conversationId = await this.MessageDB.createConversation({
				source: playerNumber,
				conversationLabel,
				conversationList: hashedList,
				participants,
				isGroupChat,
			});

			const response = {
				id: conversationId,
				label: conversationLabel,
				conversationList: hashedList,
				isGroupChat,
			};

			resp({ status: 'ok', data: { ...response, source: playerNumber } });

			for (const participant of participants) {
				if (participant !== playerNumber) {
					const identifier = await PlayerService.getIdentifierByPhone(participant);
					const player = PlayerService.getPlayerByIdentifier(identifier);

					if (player) {
						emitNetTyped<MessageConversation>(
							MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS,
							{
								...response,
								source: playerNumber, //TODO: checar por que usa-se o participant como source aqui
							},
							player.source
						);
					}
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	async fetchMessageConversation(req: PromiseRequest<void>, resp: PromiseEventResponse<MessageConversation[]>) {
		const phoneNumber = PlayerService.getPlayer(req.source).phoneNumber;

		console.log(`Received fetchMessageConversation request from ${phoneNumber}`);

		try {
			const conversations = await this.MessageDB.getConversations(phoneNumber);
			resp({ status: 'ok', data: conversations });
		} catch (e) {
			resp({ status: 'error', errorMsg: e.message });
		}
	}
}

const MessageService = new _MessageService();

export default MessageService;
