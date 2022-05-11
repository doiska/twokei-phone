import React, { useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import { Contact } from '@typings/contacts';
import { OptionIcon, OptionIconHolder } from '@ui/components/OptionIcon';
import useCheckedItems from '@ui/hooks/useCheckedItems';

import useNavigation from '@os/hooks/useNavigation';
import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useMessageAPI } from '@apps/messages/hooks/messages/useMessageAPI';
import { MainBody, MainHeader } from '@apps/messages/Messages.styles';

import ConversationBody from './components/CreationBody';
import CreationNavbar from './components/CreationNavbar';

const CreateConversation: React.FC = () => {
	const { goTo } = useNavigation();

	const phone = usePhoneNumber();
	const { addConversation } = useMessageAPI();

	const { checked, addChecked, removeChecked } = useCheckedItems<Contact>();

	const isValid = checked.length > 0;
	const isGroup = checked.length > 1;

	const handleCreateConversation = () => {
		if (!phone) {
			console.log(`Tried to create conversation without a phone number.`);
			goTo('/');
			return;
		}

		if (isValid) {
			addConversation({
				label: isGroup ? 'Group' : 'Chat',
				isGroupChat: checked.length > 1,
				participants: [
					phone,
					...checked.map((contact) => contact.number),
				],
				source: phone,
			});

			goTo(`/messages`);
		} else {
			//TODO: no contacts selected
		}
	};

	const handleCheck = useCallback(
		(contact: Contact, state: boolean) => {
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
				<CreationNavbar isGroup={isGroup} />
			</MainHeader>
			<MainBody className="bg-white">
				<ConversationBody handleCheckConversation={handleCheck} />{' '}
			</MainBody>
			<OptionIconHolder>
				<OptionIcon
					className="bg-whatsapp-light-green"
					onClick={() => handleCreateConversation()}
					icon={<MdAdd />}
				/>
			</OptionIconHolder>
		</>
	);
};

export default CreateConversation;
