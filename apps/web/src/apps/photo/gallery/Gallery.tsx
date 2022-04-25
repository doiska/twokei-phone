import React, { useEffect, useMemo, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { GalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import { removeDupe } from '@utils/misc';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import useToggableMenu from '@os/hooks/useTogglableMenu';
import ContextMenu from '@os/menu/ContextMenu';

import GalleryDisplay from '@apps/photo/gallery/components/GalleryDisplay';
import GallerySearchInput from '@apps/photo/gallery/components/GallerySearchInput';
import { GalleryBody, GalleryNavbar } from '@apps/photo/gallery/Gallery.styles';
import { useFilteredPhotos, usePhotoCategoryFilter } from '@apps/photo/hooks/state';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { GalleryContextMenu } from '@apps/photo/others/GalleryContextMenu';
import { Container, MainBody, MainHeader } from '@apps/photo/Photo.styles';

const Gallery: React.FC<{ title?: string }> = ({ title }) => {
	const [loading, setLoading] = useState(true);

	const [presetPhoto, setPresetPhoto] = useState<GalleryPhoto>();

	const { toggleMenu, isOpen } = useToggableMenu();
	const { photos, addPhoto, updatePhoto, removePhoto } = usePhotoAPI();

	const [categoryFilter, setCategoryFilter] = usePhotoCategoryFilter();
	const filteredPhotos = useFilteredPhotos();

	const { ref } = useParams();

	const setGlobalWallpaper = useSetGlobalWallpaper();
	useEffect(() => {
		setGlobalWallpaper('bg-[url(./media/background/blob.svg)]');
		setTimeout(() => setLoading(false), 1000);
	}, []);

	const unfilteredCategories = useMemo(() => {
		const categories = ['Sem categoria', ...photos.map(({ category }) => category ?? 'Sem categoria')];
		return removeDupe(categories);
	}, [photos]);

	const filteredCategories = useMemo(() => {
		if (categoryFilter === '') return unfilteredCategories;
		return removeDupe([...filteredPhotos.map(({ category }) => category ?? 'Sem categoria')]);
	}, [filteredPhotos]);

	const handlePhotoClick = (photo: GalleryPhoto) => {
		console.log(`Photo click`, ref);
		if (!ref) {
			setPresetPhoto(photo);
			toggleMenu();
		}
	};

	const isRefSet = ref && ref !== 'undefined';

	if (loading) return <TriangleLoader />;

	return (
		<Container>
			<MainHeader title={title ?? 'Sua galeria'}>
				<IoCloudUploadOutline />
			</MainHeader>
			<MainBody className="flex w-full flex-1 flex-col items-center gap-3">
				<GallerySearchInput currentValue={categoryFilter} onChange={setCategoryFilter} />
				<GalleryBody>
					<GalleryDisplay
						filteredCategories={filteredCategories}
						filteredPhotos={filteredPhotos}
						handlePhotoClick={handlePhotoClick}
						handleCategoryClick={(category) => setCategoryFilter(category)}
					/>
				</GalleryBody>
				{!isRefSet && (
					<GalleryNavbar
						showUpload={() => {
							setPresetPhoto(undefined);
							toggleMenu();
						}}
					/>
				)}
			</MainBody>
			<ContextMenu isOpen={ref !== undefined && isOpen}>
				<GalleryContextMenu
					presetPhoto={presetPhoto}
					categories={unfilteredCategories}
					toggleMenu={toggleMenu}
					savePhoto={(photo) => {
						if (photo.id !== undefined) return updatePhoto(photo as GalleryPhoto);

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
