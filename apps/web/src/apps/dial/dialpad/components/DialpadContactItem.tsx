import React from 'react';

import { Contact } from '@typings/contacts';
import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import { filterContactDisplay } from '@utils/format';

type ContactItem = Contact & {
	setVal: (val: string) => void;
};

const DialpadContactItem: React.FC<ContactItem> = ({ display, id, number, avatar, setVal, children }) => {
	return (
		<div
			key={`${id}-${number}`}
			className="flex flex-row items-center gap-2 rounded px-4 py-1 text-white transition-all hover:bg-white hover:bg-opacity-20"
			onClick={() => setVal(number)}
		>
			<Avatar childrenClassName="w-10" wrapperClassName="my-0 h-full items-center gap-0 text-center">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-xl">{display.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>
			<div className="flex flex-1 flex-col">
				<span className="text-lg">{filterContactDisplay(display)}</span>
				<span className="text-md">{number}</span>
			</div>
			<div className="flex flex-row gap-4">{children}</div>
		</div>
	);
};

const DialpadContactIcon: React.FC<{ Icon: JSX.Element } & React.HTMLAttributes<HTMLDivElement>> = ({
	Icon,
	...props
}) => {
	return (
		<span className="text-2xl transition-all hover:fill-blue-300 hover:text-blue-300" {...props}>
			{Icon}
		</span>
	);
};

export { DialpadContactItem, DialpadContactIcon };
