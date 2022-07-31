import React from 'react';
import { MdMessage, MdCall, MdEditNote } from 'react-icons/md';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import useNavigation from '@os/hooks/useNavigation';

const ContactListItem: React.FC<Contact> = ({ id, display, number, avatar }) => {
	const { goTo } = useNavigation();

	const showInfo = (contactId: number) => goTo(`/contacts/view/${contactId}`);

	return (
		<div key={id} className="flex h-[7%] flex-row gap-2 rounded-xl bg-zinc-800 p-2">
			<Avatar childrenClassName="w-10">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					className="rounded-full"
					fallbackElement={<span className="text-lg">{display.slice(0, 1).toUpperCase()}</span>}
				/>
			</Avatar>
			<div className="flex h-full flex-1 flex-col">
				<span className="text-sm">{display.substring(0, 40)}</span>
				<span className="text-xs">{number}</span>
			</div>
			<div className="mr-3 flex flex-row gap-2 text-lg">
				<button>
					<MdMessage/>
				</button>
				<button>
					<MdCall/>
				</button>
				<button>
					<MdEditNote onClick={() => showInfo(id)}/>
				</button>
			</div>
		</div>
	);
};

export { ContactListItem };
