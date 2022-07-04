import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RingsLoader } from '@ui/components/LoadingSpinner';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import useContacts from '@apps/dial/contacts/hooks/useContacts';
import ChatContent from '@apps/messages/components/chats/components/view/ChatContent';
import ChatContextMenu from '@apps/messages/components/chats/components/view/ChatContextMenu';
import ChatInput from '@apps/messages/components/chats/components/view/ChatInput';
import ChatNavbar from '@apps/messages/components/chats/components/view/ChatNavbar';
import { useMessagesState } from '@apps/messages/hooks/messages/messageState';
import { useMessageAPI } from '@apps/messages/hooks/messages/useMessageAPI';
import useMessages from '@apps/messages/hooks/messages/useMessages';
import { MainHeader, MainBody } from '@apps/messages/Messages.styles';
import { findParticipants } from '@apps/messages/utils/helpers';

const ConversationView: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const userPhone = usePhoneNumber();

	const { fetchMessages } = useMessageAPI();
	const { activeConversation, setActiveConversation } = useMessages();

	const { getDisplayListByNumber } = useContacts();

	const [messages, setMessages] = useMessagesState();
	const [shownParticipants, setShownParticipants] = useState<string[]>([]);

	const { ContextMenu: MoreMenu, openMenu: openMoreMenu } = ChatContextMenu(id);

	useEffect(() => {
		if (id) {
			//TODO: pay attention to this one
			setMessages([]);
			fetchMessages(parseInt(id), 0);
		}
	}, [id, fetchMessages]);

	useEffect(() => {
		if (id) setActiveConversation(parseInt(id));
	}, [id, setActiveConversation]);

	useEffect(() => {
		if (activeConversation) {
			const found = findParticipants(activeConversation.conversationList, userPhone);
			const contacts = getDisplayListByNumber(found);

			if (contacts.join(', ').length > 25) {
				setShownParticipants(['Clique para ver mais detalhes.']);
			} else {
				setShownParticipants([`Você`, ...contacts]);
			}
		}
	}, [id, activeConversation]);

	if (!activeConversation || !id) return <RingsLoader color="white" />;

	return (
		<>
			<MainHeader className="h-[8%] basis-[8%] flex-row items-center gap-2 p-1.5">
				<ChatNavbar
					isGroupChat={activeConversation.isGroupChat ?? false}
					participants={shownParticipants}
					openMenu={openMoreMenu}
				/>
			</MainHeader>
			<MainBody
				className="h-[92%] bg-gray-700"
				style={{
					backgroundImage:
						'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
				}}
			>
				<ChatContent messages={messages} activeMessage={activeConversation} />
				<ChatInput />
			</MainBody>
			<MoreMenu />
		</>
	);
};

export default ConversationView;
