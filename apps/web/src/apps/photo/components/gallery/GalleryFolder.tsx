import React from 'react';

import { HTMLAttributes } from '@typings/core';
import { GalleryPhoto } from '@typings/gallery';

import { GalleryItem } from '@apps/photo/components/gallery/GalleryItem';

type Props = HTMLAttributes & { category: string; photos: GalleryPhoto[] };

export const GalleryFolder: React.FC<Props> = ({
	category,
	photos,
	...rest
}) => {
	return (
		<div
			id={category}
			className="shadow-6xl flex flex-col gap-2 rounded-md bg-white bg-opacity-10 p-2 backdrop-blur-md transition-all hover:bg-opacity-20"
			{...rest}
		>
			<div className="flex flex-row text-sm font-medium">
				<span className="flex-1 p-1">{category}</span>
				<span>{photos.length} imagens</span>
			</div>

			{photos.length > 0 && (
				<div className="grid grid-cols-3 place-items-center gap-2 overflow-hidden p-1">
					{photos.slice(0, 3).map(({ id, image }, index) => (
						<GalleryItem
							className="h-auto border-2"
							key={`${id}-${index}`}
							content={image}
						/>
					))}
				</div>
			)}
		</div>
	);
};
