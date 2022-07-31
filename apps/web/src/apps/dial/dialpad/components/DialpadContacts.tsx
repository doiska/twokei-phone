import React, { useContext, useEffect, useState } from 'react';
import { IoAddOutline, IoArrowForward, IoCallOutline } from 'react-icons/io5';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { useCall } from '@os/call/hooks/useCall';
import { useDebounce } from '@os/hooks/useDebounce';

import { useContactsValue } from '@apps/dial/contacts/hooks/contactsState';
import { DialpadContactIcon, DialpadContactItem } from '@apps/dial/dialpad/components/DialpadContactItem';
import { DialInputContext } from '@apps/dial/dialpad/hooks/InputContext';

const DialpadContacts: React.FC = () => {
	const contacts = useContactsValue();
	const ctx = useContext(DialInputContext);

	const { initializeCall } = useCall();

	const [shownContacts, setShownContacts] = useState<Contact[]>([]);

	const debounced = useDebounce<string | undefined>(ctx?.val, 400);

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

	const items = shownContacts.map((c) => (
		<DialpadContactItem key={c.id} {...c} setVal={ctx.setVal}>
			<DialpadContactIcon
				Icon={<IoCallOutline/>}
				onClick={() => {
					ctx.setVal(c.number);
					initializeCall(c.number);
				}}
			/>
			{c.id === -1 ? (
				<DialpadContactIcon Icon={<IoAddOutline/>}/>
			) : (
				<DialpadContactIcon Icon={<IoArrowForward/>}/>
			)}
		</DialpadContactItem>
	));

	return (
		<div className="flex basis-[45%] flex-col items-center justify-center gap-3 py-2">
			<span className="rounded-full bg-white bg-opacity-5 p-0.5 px-3">Acesso rápido</span>
			<div className="flex w-[93%] flex-1 flex-col justify-center gap-2 rounded-md border-2 border-white border-opacity-5 bg-white bg-opacity-10">
				{items}
			</div>
		</div>
	);
};

export default DialpadContacts;
