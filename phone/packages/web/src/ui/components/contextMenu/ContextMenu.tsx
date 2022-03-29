import React, { useRef } from 'react';

import { useTransition, animated } from '@react-spring/web';

import useHandleOutsideClick from '@os/hooks/useHandleOutsideClick';

import ContextMenuItem from './ContextMenuItem';

export interface IContextMenuOption {
	key?: string;
	label?: string;
	value?: string;
	description?: string;
	selected?: boolean;
	icon?: React.ReactNode;
	onClick?(e: unknown, option: unknown): void;
}

interface ContextMenuProps {
	title?: string;
	isOpen: boolean;
	options: IContextMenuOption[];
	onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ isOpen, options, onClose, title }) => {
	const context = useRef<HTMLDivElement>(null);

	useHandleOutsideClick(context, () => isOpen && onClose());

	const transitions = useTransition(isOpen, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: 100 },
		reverse: isOpen,
		delay: 200,
	});

	return (
		(isOpen &&
			transitions(({ opacity }) => (
				<animated.div className={'absolute bottom-0 z-[999] h-full w-full'} style={{ opacity: opacity }}>
					<div className="flex h-full w-full flex-col items-center justify-center overflow-auto">
						<div
							ref={context}
							className="flex w-[50%] flex-col items-center justify-center rounded-lg border-[1px] border-slate-100 bg-zinc-800 bg-opacity-75 p-4"
							style={{
								backdropFilter: 'blur(4px)',
							}}
						>
							{title && (
								<span className="text-md mb-2 w-fit rounded-lg bg-opacity-30 p-1 text-center text-white">
									{title}
								</span>
							)}
							{options.map((option) => (
								<ContextMenuItem key={option.key ?? option.label} option={option} onClose={onClose} />
							))}
						</div>
					</div>
				</animated.div>
			))) ||
		null
	);
};

export default ContextMenu;
