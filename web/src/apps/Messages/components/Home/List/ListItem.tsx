import React, { useCallback } from 'react';

import { Contact } from '@typings/contacts';
import { Message, MessageConversation } from '@typings/messages';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import dayjs from 'dayjs';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';
import { useContacts } from '@apps/Contacts/hooks/useContacts';

type IProps = {
	conversation: MessageConversation;
	isEditing: boolean;
	checked: number[];
	latestMessage: Message;
	handleToggle: (id: number) => void;
	handleClick: (conversation: MessageConversation) => void;
};

const ListItem: React.FC<IProps> = ({ conversation, latestMessage, handleClick }) => {
	const contacts = useContacts();

	const { getContactByNumber } = useContactActions();

	const contactDisplay = useCallback(
		(number: string): Contact | null => {
			return contacts.length ? getContactByNumber(number) : null;
		},
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

	const getDate = useCallback((): { date: string; time: string; between: number } => {
		const now = dayjs(Date.now());
		const from = dayjs(latestMessage.date);
		const date = from.format('DD/MM/YYYY');
		const hour = from.format('HH:mm');

		return {
			date: date,
			time: hour,
			between: now.diff(from, 'day'),
		};
	}, [latestMessage]);

	return (
		<div
			className="flex h-[10%] max-h-[10%] w-full cursor-pointer flex-row gap-4 p-1 shadow-sm"
			onClick={() => handleClick(conversation)}
		>
			<Avatar width="w-12" className="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={getContact()?.avatar}
					fallbackElement={<span className="text-xl">{getLabel().slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="mb-1 flex h-full max-h-[100%] w-full flex-col place-content-center pb-1">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-medium text-black">{getLabel()}</span>
					<div className="">
						<span className="pr-3 text-slate-900">
							{latestMessage && (getDate().between > 1 ? getDate().date : getDate().time)}
						</span>
					</div>
				</div>
				<span className="text-sm text-gray-500">{latestMessage && latestMessage.message}</span>
			</div>
		</div>
	);
};

export default ListItem;
