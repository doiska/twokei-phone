import React, { useState } from 'react';
import { IoMdPeople, IoMdPhonePortrait, IoMdImage } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import { ContactLimits } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import { formatNumber } from '@utils/format';

import useNavigation from '@os/hooks/useNavigation';

import useContacts from '../hooks/useContacts';
import { useContactsNUI } from '../hooks/useContactsNUI';
import ContactDetailsEditableItem from './details/ContactDetailsEditableItem';

const ContactEditOrCreate: React.FC = () => {
	const { goTo } = useNavigation();
	const { id } = useParams();

	const { getContact } = useContacts();
	const { addNewContact, updateContact } = useContactsNUI();

	const contact = id ? getContact(parseInt(id)) : undefined;

	const [name, setName] = useState(() => contact?.display || '');
	const [number, setNumber] = useState(() => contact?.number || '');
	const [avatar, setAvatar] = useState(() => contact?.avatar || '');

	const handleDisplayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.target.value;
		if (input.length >= ContactLimits.display) return;
		setName(e.target.value);
	};

	const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.target.value;
		if (input.length >= ContactLimits.number || isNaN(parseInt(input))) return;
		setNumber(e.target.value);
	};

	const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.target.value;
		if (input.length >= ContactLimits.avatar) return;
		setAvatar(e.target.value);
	};

	const handleContactUpdate = () => {
		if (!name || !number) return;

		if (contact) {
			console.log(`Updating contact`);
			updateContact({
				id: contact.id,
				display: name,
				number: number,
				avatar: avatar,
			});
		} else {
			console.log(`Creating contact`);
			addNewContact({
				display: name,
				number: number,
				avatar: avatar,
			});
		}

		goTo('/contacts');
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Avatar childrenClassName="w-32 my-3">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-5xl">{name.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<ContactDetailsEditableItem
				label={'Nome'}
				icon={<IoMdPeople />}
				type="text"
				value={name}
				onChange={handleDisplayChange}
				required={true}
			/>
			<ContactDetailsEditableItem
				label={'Telefone'}
				icon={<IoMdPhonePortrait />}
				type="text"
				value={formatNumber(number)}
				onChange={handleNumberChange}
				required={true}
			/>
			<ContactDetailsEditableItem
				label={'Avatar'}
				icon={<IoMdImage />}
				type="text"
				value={avatar}
				onChange={handleAvatarChange}
			/>
			<span className="flex-1" />
			<div className="flex w-full flex-row items-center justify-center gap-6">
				<span
					className="w-24 cursor-pointer rounded-lg bg-zinc-700 p-2 text-center"
					onClick={() => goTo('/contacts')}
				>
					Cancelar
				</span>
				<span
					className="w-24 cursor-pointer rounded-lg bg-slate-700 p-2 text-center"
					onClick={() => handleContactUpdate()}
				>
					Salvar
				</span>
			</div>
		</div>
	);
};

export default ContactEditOrCreate;
