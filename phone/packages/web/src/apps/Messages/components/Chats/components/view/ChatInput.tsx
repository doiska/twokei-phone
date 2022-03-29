import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsCameraFill } from 'react-icons/bs';
import { MdKeyboardVoice } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

type IInput = {
	handleSubmit: (content: string) => void;
};

const ChatInput: React.FC<IInput> = ({ handleSubmit }) => {
	const [currentMessage, setCurrentMessage] = useState<string>('');

	const isValidMessage = () => currentMessage.trim().length !== 0;

	const validateAndSubmit = () => {
		if (isValidMessage()) {
			handleSubmit(currentMessage);
			setCurrentMessage('');
		}
	};

	const handleKeyPress = (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e && e.key === 'Enter' && !e.shiftKey) {
			if (!isValidMessage()) return;

			e.preventDefault();
			validateAndSubmit();
		}
	};

	return (
		<>
			<div className="flex max-h-[35%] basis-[9%] flex-row items-center gap-2 p-1.5">
				<div className="flex flex-1 flex-row items-center gap-2 rounded-md bg-white p-2 pr-3">
					{/* <MdOutlineEmojiEmotions
						onClick={() => setShowEmotes((curr) => !curr)}
						className="cursor-pointer rounded-full text-2xl text-slate-600 transition-all duration-300 hover:text-slate-700"
					/> */}
					<div className="flex-1">
						<TextareaAutosize
							maxRows={5}
							minRows={1}
							minLength={1}
							maxLength={100}
							className="w-full flex-1 resize-none overflow-hidden bg-transparent pr-1 text-slate-900"
							placeholder="Sua mensagem"
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
							onKeyPress={(e) => handleKeyPress(e)}
						/>
					</div>
					<BsCameraFill className="cursor-pointer text-2xl text-slate-700 transition-all duration-200 hover:text-slate-900" />
				</div>
				<div className="bg-whatsapp-teal hover:bg-whatsapp-teal-dark inline-flex cursor-pointer items-center rounded-full p-2.5 text-white transition-all duration-200">
					{currentMessage === '' ? (
						<MdKeyboardVoice className="text-2xl" />
					) : (
						<AiOutlineSend className="text-2xl" />
					)}
				</div>
			</div>
		</>
	);
};

export default ChatInput;
