import React from 'react';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { MainHeader } from '@apps/Messages/MessagesApp.styles';

export type INavbar = {
    label: string;
    avatar?: string;
    description?: string;
    groupChat: boolean;
}

const ChatNavbar: React.FC<INavbar> = ({
	label,
	avatar,
	description,
}) => {
	return (
		<MainHeader>
			<Avatar width="w-12" className="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-xl">{label?.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="mb-1 flex h-full max-h-[100%] w-full flex-col place-content-center pb-1">
				<div className="flex flex-row flex-wrap justify-between">
					<span className="font-medium text-black">{label}</span>
					<div className="">
						<span className="pr-3 text-slate-900">{description}</span>
					</div>
				</div>
				<span className="text-sm text-gray-500">17:20</span>
			</div>
		</MainHeader>
	);
};

export default ChatNavbar;
