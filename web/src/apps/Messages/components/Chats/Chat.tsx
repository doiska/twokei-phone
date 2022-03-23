import React from 'react';

import { Message, MessageConversation } from '@typings/messages';

type Chat = {
	conversations: MessageConversation;
	messages: Message[];
};

const Chat: React.FC = () => {
	return <div />;
};

export default Chat;
