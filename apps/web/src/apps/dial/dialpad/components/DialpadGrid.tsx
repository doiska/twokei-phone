import React, { useContext } from 'react';
import { IoMdBackspace } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

import { DialInputContext } from '@apps/dial/dialpad/hooks/InputContext';

type Props = {
	className?: string;
	value?: string | number;
	onClick: (value?: string | number) => void;
};

const DialItem: React.FC<Props> = ({ value, onClick, className, children }) => {
	return (
		<span
			className={`cursor-pointer fill-white text-white  ${
				className ?? ''
			}`}
			onClick={() => onClick(value)}
		>
			<span className="rounded-md p-2 px-4 transition-all hover:bg-white hover:bg-opacity-5">
				{children ?? value}
			</span>
		</span>
	);
};

const DialPadGrid: React.FC = () => {
	const inputCtx = useContext(DialInputContext);

	if (!inputCtx) return null;

	const { addOne, removeAll, removeOne } = inputCtx;

	return (
		<div className="grid w-full flex-1 grid-cols-3 items-center text-center text-3xl">
			{[...Array(9)].map((_, i) => {
				i = i + 1;
				return <DialItem key={i} value={i} onClick={() => addOne(i)} />;
			})}
			<DialItem
				value={''}
				className="flex h-full w-full items-center justify-center"
				onClick={() => removeAll()}
			>
				<MdClose size={32} />
			</DialItem>
			<DialItem value={0} onClick={() => addOne(0)} />
			<DialItem
				className="flex h-full w-full items-center justify-center"
				onClick={() => removeOne()}
			>
				<IoMdBackspace />
			</DialItem>
		</div>
	);
};

export default DialPadGrid;
