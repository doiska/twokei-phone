import React from 'react';
import { MdAdd } from 'react-icons/md';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate } from 'react-router-dom';

import OptionIcon from '@ui/components/OptionIcon';

import { ContactCategory } from '../ContactsApp.styles';
import { useFilteredContactsByInitial } from '../hooks/useContacts';
import ContactListItem from './list/ContactListItem';
import SearchContacts from './list/SearchContacts';

const ContactsHome: React.FC = () => {
	const navigate = useNavigate();
	const filteredContacts = useFilteredContactsByInitial();
	const entries = Object.entries(filteredContacts);

	const contacts = entries.map(([category, contacts]) => (
		<ContactCategory key={category} title={category}>
			{contacts.map((props) => {
				console.log(props);
				return <ContactListItem key={`${category}-${props.id}`} {...props} />;
			})}
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
			<OptionIcon icon={<MdAdd />} childrenBackground="bg-zinc-700" onClick={() => navigate('/contacts/edit')} />
		</>
	);
};

export default ContactsHome;
