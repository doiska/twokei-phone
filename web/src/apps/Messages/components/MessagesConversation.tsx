import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import { useMessagesState } from '../hooks/state';
import { useMessageActions } from '../hooks/useMessageActions';
import { useMessageAPI } from '../hooks/useMessageAPI';
import useMessages from '../hooks/useMessages';
import { MainBody } from '../MessagesApp.styles';
import { findParticipants } from '../utils/helpers';
import Chat from './Chats/Chat';
import ChatNavbar, { INavbar } from './Chats/ChatNavbar';

const MessagesConversation: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { fetchMessages } = useMessageAPI();

	if (!id) return <></>;

	const { activeConversation, setActiveConversation, getConversationById } = useMessages();
	const { getLabelOrContact, getConversationSource } = useMessageActions();

	const { getContactByNumber, getContactsByNumber } = useContactActions();

	const [messages, setMessages] = useMessagesState();

	useEffect(() => fetchMessages(parseInt(id), 0), [id, fetchMessages]);
	const conversation = getConversationById(parseInt(id));

	if (!conversation) {
		console.log('no conversation');
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
		<>
			<ChatNavbar {...NavbarProps} />
			<MainBody>
				<Chat />
			</MainBody>
		</>
	);
};

export default MessagesConversation;
