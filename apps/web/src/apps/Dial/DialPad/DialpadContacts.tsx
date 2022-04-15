import React, { useContext, useEffect, useState } from 'react';
import { IoAddOutline, IoArrowForward, IoCallOutline } from 'react-icons/io5';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import { filterContactDisplay } from '@utils/format';

import { useCall } from '@os/call/hooks/useCall';
import { useDebouce } from '@os/hooks/useDebouce';

import { DialInputContext } from '@apps/Dial/Call/context/InputContext';
import { useContactsValue } from '@apps/Dial/Contacts/hooks/contactsState';

const DialpadContacts: React.FC = () => {
	const contacts = useContactsValue();
	const ctx = useContext(DialInputContext);
	const { initializeCall } = useCall();

	const [shownContacts, setShownContacts] = useState<Contact[]>([]);

	const debounced = useDebouce<string | undefined>(ctx?.val, 400);

	if (!ctx) return null;

	useEffect(() => {
		if (debounced) {
			const found = contacts.filter((c) => c.number.includes(debounced)).slice(0, 3);
			if (found.length === 0) {
				setShownContacts([
					{
						id: -1,
						display: 'Desconhecido',
						number: ctx.val,
					},
				]);
			} else {
				setShownContacts(found);
			}
		} else {
			setShownContacts(() => contacts.slice(0, 3));
		}
	}, [debounced]);

	const show = shownContacts.map(({ id, number, display, avatar }) => {
		return (
			<div
				key={`${id}-${number}`}
				className="flex flex-row items-center gap-2 rounded px-4 py-1 transition-all hover:bg-white hover:bg-opacity-20"
				onClick={() => ctx.setVal(number)}
			>
				<Avatar childrenClassName="w-10" wrapperClassName="my-0 h-full items-center gap-0 text-center">
					<ImageWithDefaultComponentFallback
						loadedImage={avatar}
						fallbackElement={<span className="text-xl">{display.slice(0, 1).toUpperCase()}</span>}
						className="rounded-full"
					/>
				</Avatar>
				<div className="flex flex-1 flex-col">
					<span className="text-lg">{filterContactDisplay(display)}</span>
					<span className="text-md">{number}</span>
				</div>
				<div className="flex flex-row gap-4">
					<IoCallOutline
						onClick={() => {
							console.log(`Initialize call ${initializeCall}`);
							initializeCall(ctx.val);
						}}
						size={25}
					/>
					{id === -1 ? <IoAddOutline size={25} /> : <IoArrowForward size={25} />}
				</div>
			</div>
		);
	});

	return (
		<div className="flex basis-[45%] flex-col items-center justify-center gap-2 py-2">
			<span className="rounded-full bg-white bg-opacity-5 p-0.5 px-3">Acesso rápido</span>
			<div className="flex w-[93%] flex-1 flex-col justify-center gap-2 rounded-md bg-white bg-opacity-5">
				{show}
			</div>
		</div>
	);
};

export default DialpadContacts;
