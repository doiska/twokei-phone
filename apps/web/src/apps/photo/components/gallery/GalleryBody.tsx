import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { FCWithChildren } from '@typings/ext';

export const GalleryBody: FCWithChildren = ({ children }) => (
	<div className="flex w-full flex-col gap-5 px-2 py-2">
		<ScrollContainer
			horizontal={false}
			className="flex h-[630px] flex-col gap-5 px-2"
		>
			{children}
		</ScrollContainer>
	</div>
);