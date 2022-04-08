import React, { useEffect } from 'react';
import { IoMdCall, IoIosChatboxes, IoIosCamera } from 'react-icons/io';
import { IoLogoWhatsapp, IoPencil, IoRemoveCircleOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import usePromptMenu from '@ui/hooks/usePromptMenu';

import useContacts from '../hooks/useContacts';
import { useContactsNUI } from '../hooks/useContactsNUI';

const ContactsDetails: React.FC = () => {
	const navigate = useNavigate();

	const { deleteContact } = useContactsNUI();
	const { getContact } = useContacts();

	const { id } = useParams();
	const contact = getContact(parseInt(id ?? ''));

	const goBack = () => navigate('/contacts');

	useEffect(() => {
		if (!id || !contact) goBack();
	}, []);

	if (!id || !contact) return <></>;

	const { display, avatar, number } = contact;

	const handleContactDelete = () => {
		deleteContact({ id: contact.id });
		goBack();
	};

	const { ContextMenu: PromptMenu, openMenu } = usePromptMenu(() => handleContactDelete());

	return (
		<>
			{contact && (
				<div className="flex h-full w-full flex-col gap-3">
					<div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-zinc-800 p-4">
						<Avatar childrenClassName="w-20">
							<ImageWithDefaultComponentFallback
								loadedImage={avatar}
								fallbackElement={<span className="text-lg">{display.slice(0, 1).toUpperCase()}</span>}
								className="rounded-full"
							/>
						</Avatar>
						<span className="text-md md:text-lg">{display}</span>
						<span className="md:text-md text-sm text-gray-300">{number}</span>
						<div className="flex w-1/2 flex-row justify-around gap-2 p-2 text-white">
							<span className="rounded-full bg-green-600 p-2">
								<IoMdCall />
							</span>
							<span className="rounded-full bg-blue-400 p-2">
								<IoIosChatboxes />
							</span>
							<span className="rounded-full bg-slate-600 p-2">
								<IoIosCamera />
							</span>
						</div>
					</div>

					<div className="flex w-2/3 content-center items-center place-self-center rounded-full bg-zinc-700 py-2 text-center text-sm first-letter:items-center">
						<span className="inline-flex basis-[90%] items-center px-3">WhatsApp</span>
						<IoLogoWhatsapp className="justify-self-end text-lg text-green-400" />
					</div>

					<div className="w-1/2 items-center place-self-center rounded-full bg-zinc-700 py-2 text-center text-sm">
						<span>Histórico</span>
					</div>

					<div className="flex-1" />

					<div className="flex flex-row justify-around p-3">
						<div
							className="flex cursor-pointer flex-col items-center"
							onClick={() => navigate('/contacts/edit/' + id)}
						>
							<IoPencil className="text-xl" />
							<span className="text-sm">Editar</span>
						</div>
						<div className="flex cursor-pointer flex-col items-center">
							<IoShareSocialOutline className="text-xl" onClick={() => navigate('share')} />
							<span className="text-sm">Compartilhar</span>
						</div>
						<div className="flex cursor-pointer flex-col items-center" onClick={() => openMenu()}>
							<IoRemoveCircleOutline className="text-xl" />
							<span className="text-sm">Excluir</span>
						</div>
					</div>
				</div>
			)}
			<PromptMenu />
		</>
	);
};

export default ContactsDetails;
