import React from 'react';
import { useNavigate } from 'react-router-dom';
import { contactsState, useFilteredContacts } from '../hooks/useContacts';
import SearchContacts from './SearchContacts';

const ContactsPage: React.FC = () => {
	const filteredContacts = useFilteredContacts();
	const navigate = useNavigate();

	console.log(filteredContacts);

	const showInfo = (contactId: number) => {
		navigate(`/contacts/${contactId}`);
	};

	return (
		<>
			<SearchContacts />
			<ul className="my-2 flex h-full w-full flex-col gap-2">
				{filteredContacts.map(({ display, id, number, avatar }) => (
					<li key={id} className="mx-2 flex h-[6%] flex-row items-center gap-1">
						<div
							className={`avatar h-full w-auto basis-[10%] items-center justify-center rounded-full bg-neutral p-0.5`}
						>
							{avatar ? (
								<img className="rounded-full" src={avatar} />
							) : (
								<span className="text-xl">{display.slice(0, 1).toUpperCase()}</span>
							)}
						</div>
						{display}
						{number}
					</li>
				))}
			</ul>
		</>
	);
};

export default ContactsPage;
