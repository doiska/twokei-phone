import { useCallback } from 'react';

import { useRecoilValueLoadable } from 'recoil';

import { Contact } from '@typings/contacts';
import { Message, MessageConversation } from '@typings/messages';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import useContacts from '@apps/Contacts/hooks/useContacts';

import { messageState, useConversationId, useSetConversations, useSetMessages } from './messageState';

interface MessageActions {
	setLocalConversations: (conversation: MessageConversation) => void;
	removeLocalConversations: (conversationsId: number[]) => void;

	setLocalMessages: (message: Message) => void;
	removeLocalMessage: (messageId: number) => void;

	setMessageReadState: (conversationId: number, unreadCount: number) => void;

	getLabelOrContactDisplay: (conversation: MessageConversation) => string;
	getConversationSource: (conversationList: string) => Contact | undefined;
}

export const useMessageActions = (): MessageActions => {
	const { state: messageLoading } = useRecoilValueLoadable(messageState.messages);
	const { state: conversationLoading, contents: conversations } = useRecoilValueLoadable(messageState.conversations);

	const setConversation = useSetConversations();
	const setMessages = useSetMessages();

	const { getContactByNumber, getDisplayByNumber } = useContacts();

	const myPhoneNumber = usePhoneNumber();

	const conversationId = useConversationId();

	const setLocalConversations = useCallback(
		(conversation: MessageConversation) => {
			setConversation((curr) => [conversation, ...curr]);
		},
		[setConversation]
	);

	const removeLocalConversations = useCallback(
		(conversationsId: number[]) => {
			if (conversationLoading !== 'hasValue') return;

			if (!conversations.length) return;

			setConversation((curr) => [...curr].filter((conversation) => !conversationsId.includes(conversation.id)));
		},
		[setConversation, conversationLoading, conversations]
	);

	const setLocalMessages = useCallback(
		(messageDto: Message) => {
			const { id, message, author, conversationId, embed, is_embed } = messageDto;

			if (messageLoading !== 'hasValue') return;
			//TODO: double check it if (conversationId !== id) return;

			setMessages((current) => [
				...current,
				{
					id,
					message,
					author,
					conversationId,
					embed,
					is_embed,
					date: Date.now(),
				},
			]);
		},
		[setMessages, messageLoading, conversationId]
	);

	const removeLocalMessage = useCallback(
		(messageId: number) => {
			setMessages((curr) => [...curr].filter((message) => message.id === messageId));
		},
		[setMessages]
	);

	const setMessageReadState = useCallback(
		(conversationId: number, unreadCount: number) => {
			setConversation((curr) =>
				curr.map((message) => {
					if (message.id === conversationId) {
						return {
							...message,
							unreadCount: unreadCount,
						};
					}
					return message;
				})
			);
		},
		[setConversation]
	);

	const getLabelOrContactDisplay = useCallback(
		(conversation: MessageConversation): string => {
			const label = conversation.label;
			const source = conversation.source;
			const list = conversation.conversationList.split('+');

			if (conversation.isGroupChat) {
				return label;
			}

			console.log(`Source: `, source);

			for (const participant of list) {
				if (participant !== source) {
					console.log(`Participant: `, participant);
					return getDisplayByNumber(participant) ?? participant;
				}
			}
			return label;
		},
		[getContactByNumber]
	);

	//TODO: Rechecar essa função, não parece estar certa
	const getConversationSource = useCallback(
		(conversationList: string) => {
			const source = conversationList.split('+').filter((p) => p !== myPhoneNumber);
			return getContactByNumber(source[0]);
		},
		[getContactByNumber, myPhoneNumber]
	);

	return {
		setLocalConversations,
		removeLocalConversations,
		setLocalMessages,
		removeLocalMessage,
		setMessageReadState,
		getConversationSource,
		getLabelOrContactDisplay,
	};
};
