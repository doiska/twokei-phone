import React, { useCallback } from 'react';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import { Contact } from '@typings/contacts';
import { Message, MessageConversation } from '@typings/messages';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import usePhoneFormattedDate from '@os/hooks/usePhoneFormattedDate';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';
import { useContacts } from '@apps/Contacts/hooks/useContacts';

type IProps = {
	conversation: MessageConversation;
	isEditing: boolean;
	checked: boolean;
	messages: Message[] | undefined;
	handleToggle: (id: number) => void;
	handleClick: (conversation: MessageConversation) => void;
};

const ConversationListItem: React.FC<IProps> = ({
	conversation,
	messages,
	handleClick,
	isEditing,
	handleToggle,
	checked,
}) => {
	const contacts = useContacts();

	const latestMessage = messages?.[0];
	const formattedDate = usePhoneFormattedDate(latestMessage?.date ?? Date.now());

	const { getContactByNumber } = useContactActions();

	const contactDisplay = useCallback(
		(number: string): Contact | null => (contacts.length ? getContactByNumber(number) : null),
		[contacts, getContactByNumber]
	);

	const getContact = useCallback((): Contact | null | undefined => {
		const source = conversation.source;
		const conversationList = conversation.conversationList.split('+');

		if (conversation.isGroupChat) return null;

		for (const p of conversationList) {
			if (p !== source) {
				const contact = contactDisplay(p);
				return contact;
			}
		}
	}, [contactDisplay, conversation]);

	const getLabel = useCallback((): string => {
		const source = conversation.source;
		const conversationLabel = conversation.label;
		const conversationList = conversation.conversationList.split('+');

		if (conversation.isGroupChat) return conversationLabel;

		return getContact()?.display || conversationList.filter((p) => p !== source)[0];
	}, [conversation, getContact]);

	return (
		<div
			className="flex h-[10%] max-h-[10%] w-full cursor-pointer flex-row gap-4 p-1 shadow-sm"
			onClick={() => !isEditing && handleClick(conversation)}
		>
			<Avatar childrenClassName="w-12" wrapperClassName="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={getContact()?.avatar}
					fallbackElement={<span className="text-xl">{getLabel().slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>

			<div className="mb-1 flex h-full w-full flex-col place-content-center pb-1">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-medium text-black">{getLabel()}</span>
				</div>
				<span className="text-sm text-gray-500">{latestMessage && latestMessage.message}</span>
			</div>

			<span className="inline-flex items-center pr-3 text-slate-900">
				{latestMessage && (formattedDate.dayDifference >= 1 ? formattedDate.date : formattedDate.time)}
			</span>

			{isEditing && (
				<span
					className="inline-flex h-full cursor-pointer items-center pr-2 text-xl transition-all"
					onClick={() => handleToggle(conversation.id)}
				>
					{checked ? <GrCheckboxSelected /> : <GrCheckbox />}
				</span>
			)}
		</div>
	);
};

export default ConversationListItem;
