import { useCallback } from 'react';

import { ServerPromiseResp } from '@typings/common';
import { Message, MessageConversation, MessageEvents, PreDBMessage, PreDBMessageConversation } from '@typings/messages';
import fetchNui from '@utils/fetchNui';
import { useRecoilValueLoadable } from 'recoil';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { MockServerResp } from '../utils/constants';
import { messageState, useSetMessages } from './state';
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
	const { setLocalMessages, removeLocalMessage, setLocalConversations, removeLocalConversations, setMessageReadState } =
		useMessageActions();

	const { state: messageConversationState, contents: messageConversationContents } = useRecoilValueLoadable<
		MessageConversation[]
	>(messageState.conversations);

	const setMessages = useSetMessages();
	const phoneNumber = usePhoneNumber();

	const sendMessage = useCallback(
		({ conversationId, message, sourcePhoneNumber, conversationList }: PreDBMessage) => {
			fetchNui<ServerPromiseResp<Message>>(MessageEvents.SEND_MESSAGE, {
				conversationId,
				conversationList,
				message,
				sourcePhoneNumber,
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

	const sendEmbeddedMessage = useCallback(
		({ conversationId, embed, sourcePhoneNumber, conversationList }: PreDBMessage) => {
			fetchNui<ServerPromiseResp<Message>, PreDBMessage>(MessageEvents.SEND_MESSAGE, {
				conversationId,
				embed: JSON.stringify(embed),
				is_embed: true,
				sourcePhoneNumber,
				conversationList,
				targetPhoneNumber: phoneNumber ?? '',
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
			fetchNui<ServerPromiseResp<any>>(MessageEvents.DELETE_MESSAGE, message).then((resp) => {
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
			fetchNui<ServerPromiseResp<void>>(MessageEvents.SET_READ_MESSAGE, {}, { status: 'ok' }).then((resp) => {
				if (resp.status !== 'ok') {
					//TODO: error
					return;
				}

				console.log(`Updating ${conversationId} read state for messages`);
				setMessageReadState(conversationId, 0);
			});
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

				const { id, source, conversationList, label, isGroupChat } = resp.data;

				setLocalConversations({
					source: source,
					id: id,
					conversationList: conversationList,
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
			fetchNui<ServerPromiseResp<void>>(MessageEvents.DELETE_MESSAGE_CONVERSATION, {
				conversationIds: conversationIds,
			}).then((resp) => {
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
				console.log(`Mock data`, MockServerResp);
				console.log(`Response `, resp);
				if (resp.status !== 'ok') return;

				setMessages(resp.data ?? []);
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
