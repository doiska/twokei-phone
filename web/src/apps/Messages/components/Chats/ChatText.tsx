import React from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';

type IChatText = {
	position: 'left' | 'right';
	text: string;
	checked?: boolean;
};

const style = (position: string) =>
	position === 'left' ? 'bg-whatsapp-chat-rose place-self-start' : 'bg-whatsapp-chat-light-green place-self-end';

const ChatText: React.FC<IChatText> = ({ position, text, checked = false }) => {
	return (
		<div className={`flex w-fit max-w-[70%] flex-col flex-wrap gap-2 rounded-md p-3 text-black ${style(position)}`}>
			<div className="text-sm">Testando tamanho da mensagem de acordo com o input</div>
			<div className="flex flex-row items-center gap-1 place-self-end text-xs text-slate-900">
				<span>18:28</span>
				<IoCheckmarkDone className={`text-lg font-bold ${position === 'left' ? 'text-cyan-600' : 'text-slate-500'}`} />
			</div>
		</div>
	);
};

export default ChatText;
