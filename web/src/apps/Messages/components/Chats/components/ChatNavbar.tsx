import React, { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsCameraVideoFill } from 'react-icons/bs';
import { IoMdCall, IoMdMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useContactActions } from '@apps/Contacts/hooks/useContactActions';
import { useMessageActions } from '@apps/Messages/hooks/useMessageActions';
import useMessages from '@apps/Messages/hooks/useMessages';
import { findParticipants } from '@apps/Messages/utils/helpers';

type INavbar = {
	participants: string[];
};

const ChatNavbar: React.FC<INavbar> = ({ participants }) => {
	const phone = usePhoneNumber();

	const { activeConversation } = useMessages();

	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	const { getLabelOrContactDisplay } = useMessageActions();
	const { getContactByNumber, getDisplayByNumber } = useContactActions();

	if (!activeConversation) return <></>;

	const { label, isGroupChat, source, conversationList } = activeConversation;
	const numberParticipant = findParticipants(conversationList, phone ?? '0147-0147');

	const userAvatar = () => {
		if (isGroupChat) return;

		const contact = getContactByNumber(numberParticipant[0]);
		return contact?.avatar;
	};
	const userLabel = () => {
		if (isGroupChat) return label;

		return getLabelOrContactDisplay(activeConversation);
	};

	const description = useCallback(() => participants.join(', '), [participants]);

	return (
		<>
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<Avatar width="w-10" className="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={userAvatar()}
					fallbackElement={<span className="text-xl">{userLabel().slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="flex h-full max-h-[100%] w-full flex-col place-content-center">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="text-white">{label}</span>
				</div>
				<span className="text-sm font-light text-white">{description()}</span>
			</div>
			<div className="flex flex-row items-center gap-3 text-xl">
				{!isGroupChat ? (
					<>
						<IoMdCall className="cursor-pointer" />
						<BsCameraVideoFill className="cursor-pointer" />
					</>
				) : (
					''
				)}
				<IoMdMore className="cursor-pointer text-2xl" />
			</div>
		</>
	);
};

export default ChatNavbar;
