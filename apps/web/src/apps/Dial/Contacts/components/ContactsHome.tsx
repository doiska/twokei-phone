import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ContactCategory } from '../Contacts.styles';
import { useFilteredContactsByInitial } from '../hooks/contactsState';
import ContactListItem from './list/ContactListItem';
import SearchContacts from './list/SearchContacts';

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
			<SearchContacts />
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

export default ContactsHome;
