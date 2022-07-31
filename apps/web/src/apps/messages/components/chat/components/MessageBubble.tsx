import React from 'react';

import { Message } from '@typings/messages';
import dayjs from 'dayjs';

const style = (position: string) =>
	position === 'left'
		? 'bg-whatsapp-chat-rose place-self-start'
		: 'bg-whatsapp-chat-light-green place-self-end';

const MessageBubble: React.FC<{ message: Message; position: string }> = ({
	message: { message, sourcePhoneNumber, createdAt },
	position,
}) => {
	const dateToText = dayjs(createdAt).format('HH:mm');

	return (
		<div
			className={`flex min-w-[25%] max-w-[70%] flex-col flex-wrap gap-2 rounded-md p-2 pl-3 text-black ${style(
				position
			)}`}
		>
			<span className="break-all text-sm">{message ?? ''}</span>
			<div className="flex flex-row items-center gap-1 place-self-end text-xs text-slate-900">
				<span>{dateToText}</span>
				{/* <IoCheckmarkDone className={`text-lg font-bold ${checked ? 'text-cyan-600' : 'text-slate-500'}`} /> */}
			</div>
		</div>
	);
};

export default MessageBubble;
