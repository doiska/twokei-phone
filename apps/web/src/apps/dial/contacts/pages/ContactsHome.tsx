import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';


import { ContactListItem } from 'apps/dial/contacts/components/list/ContactListItem';
import { SearchContacts } from 'apps/dial/contacts/components/list/SearchContacts';
import { useFilteredContactsByInitial } from 'apps/dial/contacts/hooks/contactsState';

import { ContactCategory } from "@apps/dial/contacts/components/ContactCategory";

const ContactsHome: React.FC = () => {
	const filteredContacts = useFilteredContactsByInitial();

	const contacts = Object.entries(filteredContacts).map(([category, contacts]) => (
		<ContactCategory key={category} title={category}>
			{contacts.map((props) => (
				<ContactListItem key={`${category}-${props.id}`} {...props} />
			))}
		</ContactCategory>
	));

	return (
		<>
			<SearchContacts/>
			<ScrollContainer
				draggingClassName="cursor-grab"
				className="h-phone-body select-none snap-y overflow-y-scroll"
				horizontal={false}
			>
				{contacts}
			</ScrollContainer>
		</>
	);
};

export { ContactsHome };
