import React, { useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Contact } from '@typings/contacts';
import OptionIcon from '@ui/components/OptionIcon';
import useCheckedItems from '@ui/hooks/useCheckedItems';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useMessageAPI } from '@apps/Messages/hooks/messages/useMessageAPI';
import { MainBody, MainHeader } from '@apps/Messages/MessagesApp.styles';

import ConversationBody from './components/CreationBody';
import CreationNavbar from './components/CreationNavbar';

const CreateConversation: React.FC = () => {
	const navigate = useNavigate();

	const phone = usePhoneNumber();
	const { addConversation } = useMessageAPI();

	const { checked, addChecked, removeChecked } = useCheckedItems<Contact>();

	const handleCreateConversation = () => {
		if (checked.length > 0) {
			addConversation({
				conversationLabel: checked.length > 2 ? 'Group' : 'Chat',
				isGroupChat: checked.length > 2,
				participants: [phone ?? '0147-0147', ...checked.map((contact) => contact.number)],
			});

			navigate(`/messages`);
		} else {
			console.log('No contacts selected');
		}
	};

	const handleCheck = useCallback(
		(contact: Contact, state: boolean) => {
			console.log(contact.display, state);
			if (state) {
				addChecked([contact]);
			} else {
				removeChecked([contact]);
			}
		},
		[addChecked, removeChecked]
	);

	return (
		<>
			<MainHeader className="basis-[9%] flex-col">
				<CreationNavbar />
			</MainHeader>
			<MainBody className="bg-white">
				<ConversationBody handleCheckConversation={handleCheck} />
			</MainBody>
			<OptionIcon onClick={() => handleCreateConversation()} icon={<MdAdd />} />
		</>
	);
};

export default CreateConversation;
