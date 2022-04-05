import React, { useEffect, useState } from 'react';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { useContactsValue } from '@apps/Contacts/hooks/useContacts';

type CreationBodyProps = {
	handleCheckConversation: (contact: Contact, state: boolean) => void;
};

type CreationContactItem = {
	contact: Contact;
	handleChecked: (contact: Contact, state: boolean) => void;
};

const CreationBody: React.FC<CreationBodyProps> = ({ handleCheckConversation }) => {
	const contacts = useContactsValue();

	const items = contacts.map((contact) => {
		console.log(`Creation body contact.id ${contact.id}`);
		return <ConversationContactItem key={contact.id} contact={contact} handleChecked={handleCheckConversation} />;
	});

	return <div className="flex flex-col gap-2 p-3">{items}</div>;
};

const ConversationContactItem: React.FC<CreationContactItem> = ({ contact, handleChecked }) => {
	const { number, display, avatar } = contact;

	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => handleChecked(contact, checked), [checked]);

	return (
		<div className="flex flex-row items-center justify-center gap-3" onClick={() => setChecked((curr) => !curr)}>
			<Avatar check={checked} childrenClassName="w-10">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					className="rounded-full"
					fallbackElement={<span className="text-lg">{display.slice(0, 1).toUpperCase()}</span>}
				/>
			</Avatar>
			<div className="flex h-full flex-1 flex-col text-black">
				<span className="text-md font-semibold">{display}</span>
				<span className="text-sm">{number}</span>
			</div>
		</div>
	);
};

export default CreationBody;
