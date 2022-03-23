import React, { useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { MdKeyboardVoice, MdOutlineEmojiEmotions } from 'react-icons/md';

const ChatInput: React.FC = () => {
	const [currentMessage, setCurrentMessage] = useState<string>();

	return (
		<div className="flex h-[10%] basis-[10%] flex-row items-center gap-2 p-1.5">
			<div className="flex flex-1 flex-row gap-2 rounded-full bg-white p-2 pr-3">
				<MdOutlineEmojiEmotions className="cursor-pointer  rounded-full text-2xl text-slate-600 transition-all duration-300 hover:text-slate-700" />
				<input
					maxLength={100}
					className="flex-1 bg-transparent pr-1 text-slate-900 focus:outline-none active:outline-none"
					placeholder="Sua mensagem"
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<BsCameraFill className="cursor-pointer text-2xl text-slate-700 transition-all duration-200 hover:text-slate-900" />
			</div>
			<div className="bg-whatsapp-teal hover:bg-whatsapp-teal-dark inline-flex cursor-pointer items-center rounded-full p-2.5 text-white transition-all duration-200">
				<MdKeyboardVoice className="text-2xl" />
			</div>
		</div>
	);
};

export default ChatInput;
