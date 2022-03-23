import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import { useMessagesState } from '../hooks/state';
import { useMessageActions } from '../hooks/useMessageActions';
import { useMessageAPI } from '../hooks/useMessageAPI';
import useMessages from '../hooks/useMessages';
import { MainBody } from '../MessagesApp.styles';
import { findParticipants } from '../utils/helpers';
import Chat from './Chats/Chat';
import ChatInput from './Chats/ChatInput';
import ChatNavbar, { INavbar } from './Chats/ChatNavbar';

const MessagesConversation: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { fetchMessages } = useMessageAPI();
	const navigate = useNavigate();

	if (!id) {
		return <></>;
	}
	const { activeConversation, setActiveConversation, getConversationById } = useMessages();
	const { getLabelOrContact, getConversationSource } = useMessageActions();

	const { getContactByNumber, getContactsByNumber } = useContactActions();

	const [messages, setMessages] = useMessagesState();

	useEffect(() => fetchMessages(parseInt(id), 0), [id, fetchMessages]);
	const conversation = getConversationById(parseInt(id));

	if (!conversation) {
		return <></>;
	}

	const participants = findParticipants(conversation.conversationList, conversation.source);

	let NavbarProps: INavbar = {
		label: conversation.isGroupChat ? conversation.label : participants[0],
		groupChat: conversation.isGroupChat,
	};

	if (!participants && !conversation.isGroupChat) return <></>;

	if (!conversation.isGroupChat) {
		const contact = getContactByNumber(participants[0]);

		if (contact) {
			NavbarProps = {
				...NavbarProps,
				label: contact.display,
				avatar: contact.avatar,
				description: '',
			};
		}
	} else {
		const names = participants;
		const contacts = getContactsByNumber(participants);

		const description = names
			.map((participant) => contacts?.find((contact) => contact.number === participant)?.display ?? participant)
			.join(',');

		NavbarProps = {
			...NavbarProps,
			description: description,
		};
	}

	return (
		<div className="flex h-full w-full flex-col">
			<ChatNavbar {...NavbarProps} />
			<MainBody
				className="bg-gray-700"
				style={{
					backgroundImage:
						'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
				}}
			>
				<Chat />
				<ChatInput />
			</MainBody>
		</div>
	);
};

export default MessagesConversation;
