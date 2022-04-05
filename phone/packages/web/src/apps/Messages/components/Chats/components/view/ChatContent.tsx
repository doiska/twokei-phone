import React, { useEffect, useMemo, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate } from 'react-router-dom';

import { Message } from '@typings/messages';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useActiveConversation, useMessagesState } from '@apps/Messages/hooks/messages/messageState';

import ChatText from './ChatText';

const ChatContent: React.FC = () => {
	const phone = usePhoneNumber();
	const [messages, setMessages] = useMessagesState();
	const activeConversation = useActiveConversation();

	const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);

	useEffect(() => {
		setFilteredMessages(() => {
			return [...messages].sort((x, y) => (x.date && y.date ? x.date - y.date : -1));
		});
	}, [messages, setMessages, activeConversation]);

	const text = useMemo(() => {
		return filteredMessages.map((message) => {
			console.log(phone, message.author);

			return (
				<ChatText
					key={`${message.id}-${message.conversationId}`}
					position={`${message.author === phone ? 'right' : 'left'}`}
					message={message}
				/>
			);
		});
	}, [filteredMessages]);

	return (
		<ScrollContainer className={`flex-1 cursor-grab select-none snap-y overflow-y-scroll p-2`} horizontal={false}>
			<ul className="flex h-full flex-col gap-2 px-2 transition-all duration-500">{text}</ul>
		</ScrollContainer>
	);
};

export default ChatContent;
