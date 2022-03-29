import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import { useMessageAPI } from '../../hooks/messages/useMessageAPI';
import useMessages from '../../hooks/messages/useMessages';
import { MainBody, MainHeader } from '../../MessagesApp.styles';
import { findParticipants } from '../../utils/helpers';
import ChatContent from './components/view/ChatContent';
import ConversationListIconContext from './components/view/ChatContextMenut';
import ChatInput from './components/view/ChatInput';
import ChatNavbar from './components/view/ChatNavbar';

const ConversationView: React.FC = () => {
	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	const { sendMessage, fetchMessages } = useMessageAPI();
	const { activeConversation } = useMessages();
	const { getDisplayListByNumber } = useContactActions();

	const [participants, setParticipants] = useState<string[]>([]);

	const [loading, setLoading] = useState<boolean>(true);

	const { ContextMenu: MoreMenu, openMenu: openMoreMenu } = ConversationListIconContext(id);

	useEffect(() => {
		if (!activeConversation || !id) {
			setLoading(true);
			return;
		} else {
			setLoading(false);
		}

		if (!loading) {
			fetchMessages(parseInt(id), 0);

			const found = findParticipants(activeConversation.conversationList, activeConversation.source);
			const contacts = getDisplayListByNumber(found);

			setParticipants(contacts);
		}
	}, [id, fetchMessages, activeConversation]);

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
				<ChatNavbar participants={participants} openMenu={openMoreMenu} />
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
			<MoreMenu />
		</>
	);
};

export default ConversationView;
