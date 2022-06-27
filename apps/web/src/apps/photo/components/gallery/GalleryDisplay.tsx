import React from 'react';

import { GalleryPhoto } from '@typings/gallery';

import { GalleryBody } from '@apps/photo/components/gallery/GalleryBody';
import { GalleryFolder } from '@apps/photo/components/gallery/GalleryFolder';
import { GalleryItem } from '@apps/photo/components/gallery/GalleryItem';

type Props = {
	filteredPhotos: GalleryPhoto[];
	filteredCategories: string[];
	handleCategoryClick: (category: string) => void;
	handlePhotoClick: (photo: GalleryPhoto) => void;
};

const GalleryDisplay: React.FC<Props> = ({
	filteredPhotos,
	filteredCategories,
	handlePhotoClick,
	handleCategoryClick,
}) => {
	const showOnlyPhotos = filteredCategories.length <= 1;

	return (
		<GalleryBody>
			{showOnlyPhotos ? (
				<div className="shadow-7xl grid grid-cols-2 place-items-center gap-6 rounded-md bg-zinc-900 bg-opacity-50 p-3">
					{filteredPhotos.map((photo) => (
						<GalleryItem
							className="shadow-5xl border-2 transition-all"
							key={photo.id}
							content={photo.image}
							onClick={() => handlePhotoClick(photo)}
						/>
					))}
				</div>
			) : (
				<>
					{filteredCategories.map((category) => (
						<GalleryFolder
							key={category}
							category={category}
							photos={filteredPhotos.filter(
								(photo) => photo.category === category
							)}
							onClick={() => handleCategoryClick(category)}
						/>
					))}
				</>
			)}
		</GalleryBody>
	);
};

export default GalleryDisplay;
