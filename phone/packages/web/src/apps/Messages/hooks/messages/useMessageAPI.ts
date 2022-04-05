import { useCallback } from 'react';

import { useRecoilValueLoadable } from 'recoil';

import { ServerPromiseResp } from '@typings/common';
import { Message, MessageConversation, MessageEvents, PreDBMessage, PreDBMessageConversation } from '@typings/messages';
import fetchNui from '@utils/fetchNui';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { MockServerResp } from '../../utils/constants';
import { messageState, useSetMessages } from './messageState';
import { useMessageActions } from './useMessageActions';

type UseMessageAPI = {
	sendMessage: ({ conversationId, message, sourcePhoneNumber }: PreDBMessage) => void;
	sendEmbeddedMessage: ({ conversationId, embed }: PreDBMessage) => void;
	removeMessage: (message: Message) => void;

	addConversation: (conversation: PreDBMessageConversation) => void;
	removeConversation: (conversationIds: number[]) => void;

	fetchMessages: (conversationId: number, page: number) => void;
	setMessageRead: (conversationId: number) => void;
};

export const useMessageAPI = (): UseMessageAPI => {
	const {
		setLocalMessages,
		removeLocalMessage,
		setLocalConversations,
		removeLocalConversations,
		setMessageReadState,
	} = useMessageActions();

	const { state: messageConversationState, contents: messageConversationContents } = useRecoilValueLoadable<
		MessageConversation[]
	>(messageState.conversations);

	const setMessages = useSetMessages();
	const phoneNumber = usePhoneNumber();

	const sendMessage = useCallback(
		({ conversationId, message, sourcePhoneNumber, conversationList }: PreDBMessage) => {
			fetchNui<ServerPromiseResp<Message>>(
				MessageEvents.SEND_MESSAGE,
				{
					conversationId,
					conversationList,
					message,
					sourcePhoneNumber,
				},
				{
					status: 'ok',
					data: {
						id: Math.floor(Math.random() * 100),
						message,
						conversationId,
						conversationList,
						sourcePhoneNumber,
					},
				}
			).then((resp) => {
				if (resp.status !== 'ok' || !resp.data) {
					console.error(`Could not send ${resp.status} message`);
					//TODO: alert error
					return;
				}

				console.log(`Updating local messages`);
				setLocalMessages(resp.data);
			});
		},
		[setLocalMessages, phoneNumber]
	);

	const sendEmbeddedMessage = useCallback(
		({ conversationId, embed, sourcePhoneNumber, conversationList }: PreDBMessage) => {
			fetchNui<ServerPromiseResp<Message>, PreDBMessage>(MessageEvents.SEND_MESSAGE, {
				conversationId,
				embed: JSON.stringify(embed),
				is_embed: true,
				sourcePhoneNumber,
				conversationList,
			}).then((resp) => {
				if (resp.status !== 'ok' || !resp.data) {
					//TODO: alert error
					return;
				}

				setLocalMessages(resp.data);
			});
		},
		[setLocalMessages, phoneNumber]
	);

	const removeMessage = useCallback(
		(message: Message) => {
			fetchNui<ServerPromiseResp>(MessageEvents.DELETE_MESSAGE, message).then((resp) => {
				if (resp.status !== 'ok') {
					//TODO: error
					return;
				}

				removeLocalMessage(message.id);
			});
		},
		[removeLocalMessage]
	);

	const setMessageRead = useCallback(
		(conversationId: number) => {
			fetchNui<ServerPromiseResp<void>>(MessageEvents.SET_READ_MESSAGE, undefined, { status: 'ok' }).then(
				(resp) => {
					if (resp.status !== 'ok') {
						//TODO: error
						return;
					}

					console.log(`Updating ${conversationId} read state for messages`);
					setMessageReadState(conversationId, 0);
				}
			);
		},
		[setMessageReadState]
	);

	const addConversation = useCallback(
		(conversation: PreDBMessageConversation) => {
			fetchNui<ServerPromiseResp<MessageConversation>, PreDBMessageConversation>(
				MessageEvents.CREATE_MESSAGE_CONVERSATION,
				{
					conversationLabel: conversation.conversationLabel,
					participants: conversation.participants,
					isGroupChat: conversation.isGroupChat,
				},
				{
					status: 'ok',
					data: {
						id: Math.floor(Math.random() * 1000),
						conversationList: conversation.participants.join('+'),
						isGroupChat: conversation.isGroupChat,
						admins: [conversation.participants[0]],
						label: 'Conversation label',
						source: conversation.participants[0],
					},
				}
			).then((resp) => {
				if (resp.status !== 'ok' || !resp.data) return;

				if (resp.errorMsg === 'MESSAGES.STATUS.MESSAGE_CONVERSATION_DUPLICATED') {
					//TODO: error
					return;
				}

				const doesConversationExist = messageConversationContents.find(
					(c: MessageConversation) => c.conversationList === resp.data?.conversationList
				);

				if (doesConversationExist) {
					//TODO: error
					return;
				}

				const { id, source, conversationList, label, isGroupChat, admins } = resp.data;

				setLocalConversations({
					source: source,
					id: id,
					conversationList: conversationList,
					admins: admins,
					label: label,
					isGroupChat: isGroupChat,
					unread: 0,
					unreadCount: 0,
				});
			});
		},
		[setLocalConversations, messageConversationContents, messageConversationState]
	);

	const removeConversation = useCallback(
		(conversationIds: number[]) => {
			fetchNui<ServerPromiseResp<void>>(
				MessageEvents.DELETE_MESSAGE_CONVERSATION,
				{
					conversationIds: conversationIds,
				},
				{ status: 'ok' }
			).then((resp) => {
				if (resp.status !== 'ok') {
					return;
				}

				removeLocalConversations(conversationIds);
			});
		},
		[removeLocalConversations]
	);

	const fetchMessages = useCallback(
		(conversationId: number, page: number) => {
			fetchNui<ServerPromiseResp<Message[]>>(
				MessageEvents.FETCH_MESSAGES,
				{
					conversationId,
					page,
				},
				MockServerResp
			).then((resp) => {
				if (resp.status !== 'ok') return;

				let content = resp.data;

				console.log(`ConversationId ${conversationId}`);

				if (conversationId !== -1 && content) {
					content = content.filter((c) => c.conversationId === conversationId);
					console.log(`Filtered messages`, content);
				}

				console.log(`Messages fetched: `, content);
				setMessages(content ?? []);
			});
		},
		[setMessages]
	);

	return {
		sendMessage,
		sendEmbeddedMessage,
		removeMessage,
		addConversation,
		removeConversation,
		fetchMessages,
		setMessageRead,
	};
};
