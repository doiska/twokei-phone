import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactLimits } from '@typings/contacts';

import { useContactActions } from '../hooks/useContactActions';
import { useContactsNUI } from '../hooks/useContactsNUI';

const ContactDetailsEdit: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { getContact } = useContactActions();
	const { addNewContact, updateContact, deleteContact } = useContactsNUI();

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

	const handleContactAdd = () => addNewContact({ display: name, number, avatar });
	const handleContactUpdate = () => updateContact({ id: contact!.id, display: name, number, avatar });
	const handleContactDelete = () => deleteContact({ id: contact!.id });

	return <div />;
};

export default ContactDetailsEdit;
