import React, { useState } from 'react';
import { IoMdPeople, IoMdPhonePortrait, IoMdImage } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactLimits } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { useContactActions } from '../hooks/useContactActions';
import { useContactsNUI } from '../hooks/useContactsNUI';
import ContactDetailsEditableItem from './details/ContactDetailsEditableItem';

const ContactDetailsEdit: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { getContact } = useContactActions();
	const { updateContact } = useContactsNUI();

	const contact = id ? getContact(parseInt(id)) : undefined;

	const [name, setName] = useState(() => contact?.display || '');
	const [number, setNumber] = useState(() => contact?.number || '');
	const [avatar, setAvatar] = useState(() => contact?.avatar || '');

	const handleDisplayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.currentTarget.value;
		if (input.length >= ContactLimits.display) return;
		setName(e.target.value);
	};

	const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.currentTarget.value;
		if (input.length >= ContactLimits.number) return;
		setNumber(e.target.value);
	};

	const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.currentTarget.value;
		if (input.length >= ContactLimits.avatar) return;
		setAvatar(e.target.value);
	};

	const handleContactUpdate = () => contact && updateContact({ id: contact.id, display: name, number, avatar });

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
			/>
			<ContactDetailsEditableItem
				label={'Telefone'}
				icon={<IoMdPhonePortrait />}
				type="text"
				value={number}
				onChange={handleNumberChange}
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
					onClick={() => navigate('/contacts/' + id)}
				>
					Cancelar
				</span>
				<span
					className="w-24 cursor-pointer rounded-lg bg-slate-700 p-2 text-center"
					onClick={() => {
						handleContactUpdate();
						navigate('/contacts/' + id);
					}}
				>
					Salvar
				</span>
			</div>
		</div>
	);
};

export default ContactDetailsEdit;
