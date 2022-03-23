import React, { useEffect } from 'react';

import { MessageConversation } from '@typings/messages';

import {
	useCheckedConversations,
	useFilteredConversationsValue,
	useFilterValueState,
	useIsEditing,
	useMessagesState,
} from '@apps/Messages/hooks/state';
import { useMessageAPI } from '@apps/Messages/hooks/useMessageAPI';
import useMessages from '@apps/Messages/hooks/useMessages';

import ListItem from './List/ListItem';

const ConversationList: React.FC = () => {
	const [isEditing, setEditing] = useIsEditing();
	const [checkedConversation, setCheckedConversation] = useCheckedConversations();

	const { conversations, goToConversation } = useMessages();

	const { setMessageRead } = useMessageAPI();

	const filteredConversations = useFilteredConversationsValue();

	const [searchValue, setSearchValue] = useFilterValueState();

	if (!conversations) return <p>Sem conversas.</p>;

	const { fetchMessages } = useMessageAPI();
	const [messages, setMessages] = useMessagesState();

	useEffect(() => fetchMessages(-1, 0), [fetchMessages]);

	const handleClick = (conversation: MessageConversation) => {
		setMessageRead(conversation.id);
		goToConversation(conversation.id);
	};

	const toggleEdit = () => setEditing((prev) => !prev);

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
		<div className="mt-1.5 flex w-full flex-col">
			{[...filteredConversations]
				.sort((a, b) => {
					return b.updatedAt && a.updatedAt ? b.updatedAt - a.updatedAt : 0;
				})
				.map((conversation) => {
					return (
						<ListItem
							key={conversation.id}
							conversation={conversation}
							checked={checkedConversation}
							isEditing={isEditing}
							handleClick={handleClick}
							handleToggle={handleToggleConversation}
							latestMessage={messages.filter((p) => p.id === conversation.id)?.[0]}
						/>
					);
				})}
		</div>
	);
};

export default ConversationList;
