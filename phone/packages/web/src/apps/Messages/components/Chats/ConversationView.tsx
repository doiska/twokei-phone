import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '@ui/components/LoadingSpinner';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';

import useMessages from '../../hooks/messages/useMessages';
import { MainBody, MainHeader } from '../../MessagesApp.styles';
import { findParticipants } from '../../utils/helpers';
import ChatContent from './components/view/ChatContent';
import ConversationListIconContext from './components/view/ChatContextMenut';
import ChatInput from './components/view/ChatInput';
import ChatNavbar from './components/view/ChatNavbar';

const ConversationView: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { activeConversation, setActiveConversation } = useMessages();
	const { getDisplayListByNumber } = useContactActions();
	const [participants, setParticipants] = useState<string[]>([]);

	const { ContextMenu: MoreMenu, openMenu: openMoreMenu } = ConversationListIconContext(id);

	useEffect(() => {
		if (id) setActiveConversation(parseInt(id));
	}, [id, setActiveConversation]);

	useEffect(() => {
		if (activeConversation) {
			const found = findParticipants(activeConversation.conversationList, activeConversation.source);
			const contacts = getDisplayListByNumber(found);

			setParticipants(['Você', ...contacts]);
		}
	}, [id, activeConversation]);

	if (!activeConversation) return <LoadingSpinner />;

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
				<ChatInput />
			</MainBody>
			<MoreMenu />
		</>
	);
};

export default ConversationView;
