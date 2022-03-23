import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsCameraVideoFill } from 'react-icons/bs';
import { GiPaperClip } from 'react-icons/gi';
import { IoMdCall, IoMdMore, IoIosCamera } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { MainHeader } from '@apps/Messages/MessagesApp.styles';

export type INavbar = {
	label: string;
	avatar?: string;
	description?: string;
	groupChat: boolean;
};

const ChatNavbar: React.FC<INavbar> = ({ label, avatar, description, groupChat }) => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<MainHeader className="h-[8%] basis-[8%] flex-row items-center gap-2 p-1.5">
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<Avatar width="w-10" className="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-xl">{label?.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="flex h-full max-h-[100%] w-full flex-col place-content-center">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="text-white">{label}</span>
				</div>
				{description ? <span className="text-sm font-light text-white">{description}</span> : ''}
			</div>
			<div className="flex flex-row items-center gap-3 text-xl">
				{!groupChat ? (
					<>
						<IoMdCall className="cursor-pointer" />
						<BsCameraVideoFill className="cursor-pointer" />
					</>
				) : (
					''
				)}
				<IoMdMore className="cursor-pointer text-2xl" />
			</div>
		</MainHeader>
	);
};

export default ChatNavbar;
