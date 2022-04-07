import React, { useEffect, useState } from 'react';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import { Message, MessageConversation } from '@typings/messages';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import usePhoneFormattedDate from '@os/hooks/usePhoneFormattedDate';

import { useMessageActions } from '@apps/Messages/hooks/messages/useMessageActions';
import useMessageProfile from '@apps/Messages/hooks/profiles/useMessageProfile';

type IProps = {
	conversation: MessageConversation;
	isEditing: boolean;
	checked: boolean;
	messages: Message[] | undefined;
	handleToggle: (id: number) => void;
	handleClick: (conversation: MessageConversation) => void;
};

const ConversationListItem: React.FC<IProps> = ({
	checked,
	isEditing,
	messages,
	conversation,
	handleToggle,
	handleClick,
}) => {
	const { getLabelOrContactDisplay } = useMessageActions();
	const { getAnyValidAvatar } = useMessageProfile();

	const [label, setLabel] = useState<string>('');
	const [avatar, setAvatar] = useState<string | undefined>('');
	const [lastMessage, setLastMessage] = useState<Message | undefined>();

	const formattedDate = usePhoneFormattedDate(lastMessage?.date ?? Date.now());

	useEffect(() => {
		setLabel(getLabelOrContactDisplay(conversation));
		setAvatar(getAnyValidAvatar(conversation));
		setLastMessage(messages?.[0]);
	}, [conversation, messages]);

	console.log(`ConversationListItem: ${conversation.id} - ${label} - ${avatar}`);

	return (
		<div
			className="flex h-[10%] max-h-[10%] w-full cursor-pointer flex-row gap-4 p-1 shadow-sm"
			onClick={() => !isEditing && handleClick(conversation)}
		>
			<Avatar childrenClassName="w-12" wrapperClassName="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-xl">{label.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>

			<div className="mb-1 flex h-full w-full flex-col place-content-center pb-1">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-medium text-black">{label}</span>
				</div>
				<span className="text-sm text-gray-500">{lastMessage && lastMessage.message}</span>
			</div>

			<span className="inline-flex items-center pr-3 text-slate-900">
				{lastMessage && (formattedDate.dayDifference >= 1 ? formattedDate.date : formattedDate.time)}
			</span>

			{isEditing && (
				<span
					className="inline-flex h-full cursor-pointer items-center pr-2 text-xl transition-all"
					onClick={() => handleToggle(conversation.id)}
				>
					{checked ? <GrCheckboxSelected /> : <GrCheckbox />}
				</span>
			)}
		</div>
	);
};

export default ConversationListItem;
