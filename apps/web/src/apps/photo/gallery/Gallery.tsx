import React, { useEffect, useMemo, useState } from 'react';
import { IoCloseCircleOutline, IoCloudUploadOutline } from 'react-icons/io5';

import { GalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import { removeDupe } from '@utils/misc';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import useToggableMenu from '@os/hooks/useTogglableMenu';
import ContextMenu from '@os/menu/ContextMenu';

import GalleryDisplay from '@apps/photo/gallery/components/GalleryDisplay';
import { GalleryBody, GalleryNavbar } from '@apps/photo/gallery/Gallery.styles';
import { useFilteredPhotos, usePhotoCategoryFilter } from '@apps/photo/hooks/state';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { GalleryContextMenu } from '@apps/photo/others/GalleryContextMenu';
import { Container, MainBody, MainHeader } from '@apps/photo/Photo.styles';

const Gallery: React.FC<{ title?: string }> = ({ title }) => {
	const [loading, setLoading] = useState(true);

	const [presetPhoto, setPresetPhoto] = useState<GalleryPhoto>();

	const { toggleMenu, isOpen } = useToggableMenu();
	const { photos, addPhoto, updatePhoto } = usePhotoAPI();

	const [categoryFilter, setCategoryFilter] = usePhotoCategoryFilter();
	const filteredPhotos = useFilteredPhotos();

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

	if (loading) return <TriangleLoader />;

	return (
		<Container>
			<MainHeader title={title ?? 'Sua galeria'}>
				<IoCloudUploadOutline />
			</MainHeader>
			<MainBody className="flex w-full flex-1 flex-col items-center gap-3">
				<div className="mt-2 flex w-full items-center justify-center">
					<div className="mb-2 flex w-full flex-row items-center justify-center gap-2">
						<input
							placeholder="Pesquisar categoria"
							className="bg-shark w-[60%] appearance-none rounded-md border-2 border-transparent p-2 px-1 text-white shadow-2xl transition-all hover:border-white hover:border-opacity-50 focus:outline-none"
							onChange={(e) => setCategoryFilter(e.target.value)}
							value={categoryFilter}
						/>
						<IoCloseCircleOutline
							onClick={() => setCategoryFilter('')}
							className="cursor-pointer"
							size={28}
						/>
					</div>
				</div>
				<GalleryBody>
					<GalleryDisplay
						filteredCategories={filteredCategories}
						filteredPhotos={filteredPhotos}
						handlePhotoClick={(photo) => {
							toggleMenu();
							setPresetPhoto(photo);
						}}
						handleCategoryClick={(category) => setCategoryFilter(category)}
					/>
				</GalleryBody>
				<GalleryNavbar
					showUpload={() => {
						setPresetPhoto(undefined);
						toggleMenu();
					}}
				/>
			</MainBody>
			<ContextMenu isOpen={isOpen}>
				<GalleryContextMenu
					presetPhoto={presetPhoto}
					categories={unfilteredCategories}
					toggleMenu={toggleMenu}
					commit={(photo) => {
						if (photo.id !== undefined) {
							console.log(`Updating photo`, photo);
							return updatePhoto(photo as GalleryPhoto);
						}
						addPhoto(photo);
						setPresetPhoto(undefined);
					}}
				/>
			</ContextMenu>
		</Container>
	);
};

export default Gallery;
