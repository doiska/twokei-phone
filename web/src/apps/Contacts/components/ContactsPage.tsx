import React from 'react';

import { ContactCategory } from '../ContactsApp.styles';
import { useFilteredContactsByInitial } from '../hooks/useContacts';
import ContactListItem from './list/ContactListItem';
import SearchContacts from './list/SearchContacts';

const ContactsPage: React.FC = () => {
	const filteredContacts = useFilteredContactsByInitial();

	return (
		<div className="flex flex-col gap-2">
			<SearchContacts />
			{Object.entries(filteredContacts).map(([key, contacts]) => {
				return (
					<ContactCategory key={key} title={key}>
						{contacts.map((props) => (
							<ContactListItem key={`${key}-${props.id}`} {...props} />
						))}
					</ContactCategory>
				);
			})}
		</div>
	);
};

export default ContactsPage;
