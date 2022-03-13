import React from 'react';
import { Contact } from '@typings/contacts';
import { TiContacts } from 'react-icons/ti';
import { MdAddIcCall } from 'react-icons/md';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ContactListItem: React.FC<Contact & { id: any }> = ({ id, display, number, avatar }) => {
	const navigate = useNavigate();
	const showInfo = (contactId: number) => navigate(`/contacts/${contactId}`);

	return (
		<li key={id} className="flex h-[7%] flex-row gap-2 rounded-xl bg-zinc-800 p-2">
			<div className={`avatar basis-[10%] items-center justify-center rounded-full bg-zinc-900`}>
				{avatar ? (
					<img className="rounded-full" src={avatar} />
				) : (
					<span className="text-lg">{display.slice(0, 1).toUpperCase()}</span>
				)}
			</div>
			<div className="flex flex-1 flex-col">
				<span className="text-sm">{display}</span>
				<span className="text-xs">{number}</span>
			</div>
			<div className="mr-3 flex flex-row gap-2 text-lg">
				<button onClick={() => showInfo(id)}>
					<TiContacts />
				</button>
				<button>
					<MdAddIcCall />
				</button>
				<button>
					<AiOutlineUserDelete />
				</button>
			</div>
		</li>
	);
};

export default ContactListItem;
