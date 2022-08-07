import React, { useEffect, useMemo, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { GalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import { removeDupe } from '@utils/misc';

import { useGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import { useToggle } from '@os/hooks/useTogglableMenu';
import ContextMenu from '@os/menu/ContextMenu';

import { GalleryContextMenu } from '@apps/photo/components/common/GalleryContextMenu';
import { GalleryNavbar } from '@apps/photo/components/common/GalleryNavbar';
import { GalleryBody } from '@apps/photo/components/gallery/GalleryBody';
import GalleryDisplay from '@apps/photo/components/gallery/GalleryDisplay';
import GallerySearchInput from '@apps/photo/components/gallery/GallerySearchInput';
import {
	useFilteredPhotos,
	usePhotoCategoryFilter,
} from '@apps/photo/hooks/state';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { Container, MainBody, MainHeader } from '@apps/photo/Photo.styles';

const Gallery: React.FC<{ title?: string }> = ({ title }) => {
	const [loading, setLoading] = useState(true);

	const [presetPhoto, setPresetPhoto] = useState<GalleryPhoto>();

	const { toggle, isOpen } = useToggle();
	const { photos, addPhoto, updatePhoto, removePhoto } = usePhotoAPI();

	const [categoryFilter, setCategoryFilter] = usePhotoCategoryFilter();
	const filteredPhotos = useFilteredPhotos();

	const { photo, ref } = useParams();

	useGlobalWallpaper({ background: 'url(./media/background/blob.svg)' });

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	useEffect(() => {
		console.log(photo);

		if (photo) {
			setPresetPhoto(photos.find(({ image }) => image === photo));
			toggle();
		}
	}, [photo]);

	const unfilteredCategories = useMemo(() => {
		const categories = [
			'Sem categoria',
			...photos.map(({ category }) => category ?? 'Sem categoria'),
		];
		return removeDupe(categories);
	}, [photos]);

	const filteredCategories = useMemo(() => {
		if (categoryFilter === '') return unfilteredCategories;
		return removeDupe([
			...filteredPhotos.map(
				({ category }) => category ?? 'Sem categoria'
			),
		]);
	}, [filteredPhotos]);

	const handlePhotoClick = (photo: GalleryPhoto) => {
		console.log(`Photo click`, ref);
		if (!ref) {
			setPresetPhoto(photo);
			toggle();
		}
	};

	const isRefSet = ref && ref !== 'undefined';

	if (loading) return <TriangleLoader/>;

	return (
		<Container>
			<MainHeader title={title ?? 'Sua galeria'}>
				<IoCloudUploadOutline/>
			</MainHeader>
			<MainBody className="flex w-full flex-1 flex-col items-center gap-3">
				<GallerySearchInput
					currentValue={categoryFilter}
					onChange={setCategoryFilter}
				/>
				<GalleryBody>
					<GalleryDisplay
						filteredCategories={filteredCategories}
						filteredPhotos={filteredPhotos}
						handlePhotoClick={handlePhotoClick}
						handleCategoryClick={(category) =>
							setCategoryFilter(category)
						}
					/>
				</GalleryBody>
				{!isRefSet && (
					<GalleryNavbar
						showUpload={() => {
							setPresetPhoto(undefined);
							toggle();
						}}
					/>
				)}
			</MainBody>
			<ContextMenu isOpen={isOpen}>
				<GalleryContextMenu
					presetPhoto={presetPhoto}
					categories={unfilteredCategories}
					toggleMenu={toggle}
					savePhoto={(photo) => {
						if (photo.id !== undefined)
							return updatePhoto(photo as GalleryPhoto);
						if (photo.category !== categoryFilter)
							setCategoryFilter(photo.category ?? '');

						addPhoto(photo);
						setPresetPhoto(undefined);
					}}
					removePhoto={(photo) => {
						removePhoto(photo);
						setPresetPhoto(undefined);
					}}
				/>
			</ContextMenu>
		</Container>
	);
};

export default Gallery;
