import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import { useMessageAPI } from '../../hooks/useMessageAPI';
import useMessages from '../../hooks/useMessages';
import { MainBody, MainHeader } from '../../MessagesApp.styles';
import { findParticipants } from '../../utils/helpers';
import ChatContent from './components/ChatContent';
import ChatInput from './components/ChatInput';
import ChatNavbar from './components/ChatNavbar';

const MessagesConversationChat: React.FC = () => {
	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	const { sendMessage, fetchMessages } = useMessageAPI();
	const { activeConversation } = useMessages();
	const { getDisplayListByNumber } = useContactActions();

	const [participants, setParticipants] = useState<string[]>([]);

	useEffect(() => {
		if (!activeConversation || !id) {
			navigate('/');
			return;
		}

		fetchMessages(parseInt(id), 0);

		const found = findParticipants(activeConversation.conversationList, activeConversation.source);
		const contacts = getDisplayListByNumber(found);

		setParticipants(contacts);
	}, [id, fetchMessages]);

	const handleSendMessage = (content: string) => {
		if (activeConversation) {
			sendMessage({
				conversationId: activeConversation.id,
				conversationList: activeConversation.conversationList,
				message: content,
			});
		}
	};

	return (
		<>
			<MainHeader className="h-[8%] basis-[8%] flex-row items-center gap-2 p-1.5">
				<ChatNavbar participants={participants} />
			</MainHeader>
			<MainBody
				className="h-[92%] bg-gray-700"
				style={{
					backgroundImage:
						'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
				}}
			>
				<ChatContent />
				<ChatInput handleSubmit={handleSendMessage} />
			</MainBody>
		</>
	);
};

export default MessagesConversationChat;
