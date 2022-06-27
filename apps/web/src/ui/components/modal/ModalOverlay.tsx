import React from 'react';

import useHandleOutsideClick from '@os/hooks/useHandleOutsideClick';

type Props = {
	children: React.ReactNode;
	toggle: () => void;
};

export const ModalOverlay: React.FC<Props> = ({ children, toggle }) => {
	const ref = React.useRef<HTMLDivElement>(null);
	useHandleOutsideClick(ref, toggle);

	return (
		<div
			className={
				'absolute flex h-full w-full items-center justify-center bg-black bg-opacity-50'
			}
		>
			<div ref={ref}>{children}</div>
		</div>
	);
};
