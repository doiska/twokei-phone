import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { Message, MessageConversation, MessageEvents } from '@typings/messages';
import { useNuiEvent } from 'fivem-nui-react-lib';

import { useActiveConversation } from './messageState';
import { useMessageActions } from './useMessageActions';
import { useMessageNotifications } from './useMessageNotifications';

export const useMessagesService = () => {
	const { setLocalMessages, setLocalConversations } = useMessageActions();
	const { setNotification } = useMessageNotifications();
	const { pathname } = useLocation();

	const activeConversation = useActiveConversation();

	const handleMessageBroadcast = ({ conversationName, conversationId, message }: any) => {
		if (pathname.includes(`/messages/conversation/${conversationId}`)) return;

		setNotification({ conversationName, conversationId, message });
	};

	const handleSetMessages = useCallback(
		(messageDto: Message) => {
			if (messageDto.conversationId !== activeConversation?.id) return;

			setLocalMessages(messageDto);
		},
		[setLocalMessages, activeConversation]
	);

	const handleAddConversation = useCallback(
		(conversation: MessageConversation) => {
			setLocalConversations({
				id: conversation.id,
				label: conversation.label,
				source: conversation.source,
				conversationList: conversation.conversationList,
				isGroupChat: conversation.isGroupChat,
				unread: 0,
			});
		},
		[setLocalConversations]
	);

	useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_BROADCAST, handleMessageBroadcast);
	useNuiEvent('MESSAGES', MessageEvents.SEND_MESSAGE_SUCCESS, handleSetMessages);
	useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS, handleAddConversation);
};
