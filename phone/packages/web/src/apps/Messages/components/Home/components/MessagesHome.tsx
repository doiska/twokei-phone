import React, { useEffect } from 'react';

import { MessageConversation } from '@typings/messages';

import {
	useCheckedConversations,
	useFilteredConversationsValue,
	useIsEditing,
	useMessagesValue,
} from '@apps/Messages/hooks/messages/messageState';
import { useMessageAPI } from '@apps/Messages/hooks/messages/useMessageAPI';
import useMessages from '@apps/Messages/hooks/messages/useMessages';

import ConversationListItem from './ConversationListItem';

const ConversationList: React.FC = () => {
	const [isEditing] = useIsEditing();
	const [checkedConversation, setCheckedConversation] = useCheckedConversations();

	const { conversations, goToConversation } = useMessages();

	const { setMessageRead } = useMessageAPI();

	const filteredConversations = useFilteredConversationsValue();

	if (!conversations) return <p>Sem conversas.</p>;

	const { fetchMessages } = useMessageAPI();
	const messages = useMessagesValue();

	useEffect(() => fetchMessages(-1, 0), []);

	const handleClick = (conversation: MessageConversation) => {
		setMessageRead(conversation.id);
		goToConversation(conversation.id);
	};

	const handleToggleConversation = (conversationId: number) => {
		const currentIndex = checkedConversation.indexOf(conversationId);
		const newChecked = [...checkedConversation];

		if (currentIndex === -1) {
			newChecked.push(conversationId);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setCheckedConversation(newChecked);
	};

	return (
		<div className="flex h-full w-full flex-col py-1.5">
			{[...filteredConversations].map((conversation) => {
				return (
					<ConversationListItem
						key={conversation.id}
						conversation={conversation}
						checked={checkedConversation.includes(conversation.id)}
						isEditing={isEditing}
						handleClick={handleClick}
						handleToggle={handleToggleConversation}
						messages={messages.filter((message) => message.conversationId === conversation.id)}
					/>
				);
			})}
		</div>
	);
};

export default ConversationList;
