import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsCameraVideoFill } from 'react-icons/bs';
import { IoMdCall, IoMdMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { useMessageActions } from '@apps/Messages/hooks/messages/useMessageActions';
import useMessages from '@apps/Messages/hooks/messages/useMessages';
import useMessageProfile from '@apps/Messages/hooks/profiles/useMessageProfile';

type INavbar = {
	isGroupChat: boolean;
	participants: string[];
	openMenu: () => void;
};

const ChatNavbar: React.FC<INavbar> = ({ participants, openMenu }) => {
	const navigate = useNavigate();
	const { activeConversation } = useMessages();
	const { getAnyValidAvatar } = useMessageProfile();

	const [label, setLabel] = useState('');
	const [description, setDescription] = useState('');
	const [avatar, setAvatar] = useState<string | undefined>('');

	const goBack = () => navigate(-1);

	const { getLabelOrContactDisplay } = useMessageActions();

	useEffect(() => {
		if (activeConversation) {
			console.log(`ACTIVE CONVERSATION`, activeConversation);

			const display = getLabelOrContactDisplay(activeConversation);
			const validAvatar = getAnyValidAvatar(activeConversation);

			console.log(`DISPLAY: ${display}`);

			setLabel(display);
			setAvatar(validAvatar);

			setDescription(participants.join(', ') || '');
		}
	}, [participants, activeConversation]);

	console.log(`CHAT NAVBAR `, activeConversation?.isGroupChat, label, avatar, description);

	if (!activeConversation) return <></>;

	return (
		<>
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<Avatar childrenClassName="w-10" wrapperClassName="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-xl">{label.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="flex h-full max-h-[100%] w-full flex-col place-content-center">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="text-white">{label}</span>
				</div>
				<span className="text-sm font-light text-white">{description}</span>
			</div>
			<div className="flex flex-row items-center gap-3 text-xl">
				{!activeConversation?.isGroupChat && (
					<>
						<IoMdCall className="cursor-pointer" />
						<BsCameraVideoFill className="cursor-pointer" />
					</>
				)}
				<IoMdMore className="cursor-pointer text-2xl" onClick={() => openMenu()} />
			</div>
		</>
	);
};

export default ChatNavbar;
