import React from 'react';
import { MdAdd } from 'react-icons/md';
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

	return (
		<>
			<div className="flex flex-col gap-2">
				<SearchContacts />
				{entries.length === 0 && <span className="text-center">Você não possui contatos</span>}
				{entries.map(([key, contacts]) => {
					return (
						<ContactCategory key={key} title={key}>
							{contacts.map((props) => {
								console.log(props);

								return <ContactListItem key={`${key}-${props.id}`} {...props} />;
							})}
						</ContactCategory>
					);
				})}
			</div>
			<OptionIcon icon={<MdAdd />} childrenBackground="bg-zinc-700" onClick={() => navigate('/contacts/edit')} />
		</>
	);
};

export default ContactsHome;
