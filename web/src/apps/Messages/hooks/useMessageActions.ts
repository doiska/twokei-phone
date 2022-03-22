import { useCallback } from 'react';

import { Contact } from '@typings/contacts';
import { Message, MessageConversation } from '@typings/messages';
import { useRecoilValueLoadable } from 'recoil';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import { messageState, useConversationId, useSetConversations, useSetMessages } from './state';

interface MessageActions {
	setLocalConversations: (conversation: MessageConversation) => void;
	removeLocalConversations: (conversationsId: number[]) => void;

	setLocalMessages: (message: Message) => void;
	removeLocalMessage: (messageId: number) => void;

	setMessageReadState: (conversationId: number, unreadCount: number) => void;

	getLabelOrContact: (conversation: MessageConversation) => string;
	getConversationSource: (conversationList: string) => Contact | null;
}

export const useMessageActions = (): MessageActions => {
	const { state: messageLoading } = useRecoilValueLoadable(messageState.messages);
	const { state: conversationLoading, contents: conversations } = useRecoilValueLoadable(messageState.conversations);

	const setConversation = useSetConversations();
	const setMessages = useSetMessages();

	const { getContactByNumber } = useContactActions();

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
			if (conversationId !== id) return;

			setMessages((current) => [
				...current,
				{
					id,
					message,
					author,
					conversationId,
					embed,
					is_embed,
                    date: Date.now()
				},
			]);
		},
		[messageLoading, setMessages, conversationId]
	);

	const removeLocalMessage = useCallback(
		(messageId: number) => {
			setMessages((curr) => [...curr].filter((message) => message.id === messageId));
		},
		[setMessages]
	);

	const setMessageReadState = useCallback((conversationId: number, unreadCount: number) => {
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
	}, []);

	const getLabelOrContact = useCallback(
		(conversation: MessageConversation): string => {
			const label = conversation.label;
			const source = conversation.source;
			const list = conversation.conversationList.split('+');

			if (conversation.isGroupChat) return label;

			for (const participant of list) {
				if (participant !== source) {
					const contact = getContactByNumber(participant);
					return contact ? contact.display : participant;
				}
			}
			return label;
		},
		[getContactByNumber]
	);

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
		getLabelOrContact,
	};
};
