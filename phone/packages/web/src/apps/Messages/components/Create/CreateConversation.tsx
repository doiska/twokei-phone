import React, { useCallback, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Contact } from '@typings/contacts';
import useCheckedItems from '@ui/hooks/useCheckedItems';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useContactsValue } from '@apps/Contacts/hooks/useContacts';
import { useMessageAPI } from '@apps/Messages/hooks/useMessageAPI';
import { MainBody, MainHeader } from '@apps/Messages/MessagesApp.styles';

import OptionIcon from '../Shared/OptionIcon';
import ConversationBody from './components/CreationBody';
import CreationNavbar from './components/CreationNavbar';

const CreateConversation: React.FC = () => {
	const navigate = useNavigate();

	const phone = usePhoneNumber();
	const { addConversation } = useMessageAPI();

	const { checked, addChecked, removeChecked } = useCheckedItems<Contact>();

	const handleCreateConversation = () => {
		console.log('Create conversation');

		console.log(checked);

		if (checked.length > 0) {
			console.log(checked);

			console.log(checked.length);
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
