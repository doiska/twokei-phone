import React from 'react';
import { MdMessage, MdCall, MdEditNote } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

const ContactListItem: React.FC<Contact> = ({ id, display, number, avatar }) => {
	const navigate = useNavigate();
	const showInfo = (contactId: number) => navigate(`/contacts/${contactId}`);

	return (
		<div key={id} className="flex h-[7%] flex-row gap-2 rounded-xl bg-zinc-800 p-2">
			<Avatar width="w-10">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					className="rounded-full"
					fallbackElement={<span className="text-lg">{display.slice(0, 1).toUpperCase()}</span>}
				/>
			</Avatar>
			<div className="flex h-full flex-1 flex-col">
				<span className="text-sm">{display}</span>
				<span className="text-xs">{number}</span>
			</div>
			<div className="mr-3 flex flex-row gap-2 text-lg">
				<button>
					<MdMessage />
				</button>
				<button>
					<MdCall />
				</button>
				<button>
					<MdEditNote onClick={() => showInfo(id)} />
				</button>
			</div>
		</div>
	);
};

export default ContactListItem;
