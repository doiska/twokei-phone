import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { Message, MessageConversation } from '@typings/messages';

import ChatText from './ChatText';

type Chat = {
	conversations: MessageConversation;
	messages: Message[];
};

const Chat: React.FC = () => {
	return (
		<ScrollContainer className="scroll-container flex h-[87%] basis-[87%] flex-col gap-1 p-1">
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="right" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
			<ChatText position="left" text="Welcome MessageConversation" />
		</ScrollContainer>
	);
};

export default Chat;
