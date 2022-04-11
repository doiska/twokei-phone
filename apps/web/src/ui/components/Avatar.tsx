import React from 'react';
import { BiCheck } from 'react-icons/bi';

type IAvatar = {
	children: React.ReactNode;
	childrenClassName?: string;

	wrapperClassName?: string;

	avatarClassName?: string;

	check?: boolean;
	checkClassName?: string;
};

const Avatar: React.FC<IAvatar> = ({
	wrapperClassName,
	avatarClassName,
	check,
	checkClassName,
	children,
	childrenClassName,
}) => {
	return (
		<div className={`flex flex-col items-center justify-center gap-2 ${wrapperClassName}`}>
			<div className={`avatar placeholder ${avatarClassName}`}>
				<div
					className={`text-neutral-content rounded-full bg-gradient-to-t from-zinc-600 via-zinc-500 to-zinc-500 ${childrenClassName}`}
				>
					{children}
				</div>
				<BiCheck
					className={`bg-whatsapp-teal absolute right-0 bottom-0 rounded-full border-white fill-white transition-all ${
						checkClassName ?? ''
					} ${check ? 'opacity-100' : 'opacity-0'}`}
				/>
			</div>
		</div>
	);
};

export default Avatar;
