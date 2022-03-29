import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { TiPen } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import usePromptMenu from '@ui/hooks/usePromptMenu';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useMessageProfileAPI } from '@apps/Messages/hooks/profiles/useMessageProfileAPI';

import OptionIcon from '../../Shared/OptionIcon';

const UserProfileBody: React.FC = () => {
	const navigate = useNavigate();
	const phone = usePhoneNumber();

	const { userProfile, setUserProfile } = useMessageProfileAPI();

	const [displayInput, setDisplayInput] = useState(userProfile.display ?? phone ?? '');
	const [avatarInput, setAvatarInput] = useState(userProfile.avatar ?? '');

	const { ContextMenu, openMenu } = usePromptMenu(
		() => {
			if (phone) {
				setUserProfile({
					source: phone,
					display: displayInput,
					avatar: avatarInput,
				});
				navigate('/messages');
			}
		},
		() => navigate('/messages')
	);

	return (
		<>
			<div className="flex h-full flex-col bg-white p-4">
				<Avatar
					childrenClassName="w-24"
					wrapperClassName="my-0 h-full items-center gap-0 text-center basis-[30%]"
				>
					<ImageWithDefaultComponentFallback
						loadedImage={avatarInput}
						fallbackElement={<span className="text-xl">{displayInput.slice(0, 1).toUpperCase()}</span>}
						className="rounded-full"
					/>
				</Avatar>
				<div className="flex flex-col items-center gap-3 text-white">
					<div className="bg-whatsapp-teal-dark flex w-[70%] flex-row rounded-md p-1 px-2">
						<input
							value={displayInput}
							onChange={(e) => setDisplayInput(e.currentTarget.value)}
							className="basis-[90%] bg-transparent text-lg focus:outline-none active:outline-none"
						/>
						<div className="bg-whatsapp-teal-dark place-self-end rounded-full p-2">
							<TiPen className=" fill-white" />
						</div>
					</div>
					<div className="bg-whatsapp-teal-dark w-[70%] rounded-md p-2 text-white">
						<input
							className="w-full bg-transparent focus:outline-none active:outline-none"
							value={avatarInput}
							onChange={(e) => setAvatarInput(e.currentTarget.value)}
							placeholder="Url do seu avatar"
						/>
					</div>
				</div>
			</div>
			<OptionIcon childrenBackground="bg-whatsapp-teal-dark" icon={<MdCheck />} onClick={() => openMenu()} />
			<ContextMenu />
		</>
	);
};

export default UserProfileBody;
