import React, { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { TriangleLoader } from '@ui/components/LoadingSpinner';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import useToggableMenu from '@os/hooks/useTogglableMenu';
import ContextMenu from '@os/menu/ContextMenu';

import { GalleryBody, GalleryFolder, GalleryNavbar } from '@apps/photo/gallery/Gallery.styles';
import { useGalleryCategoriesValue } from '@apps/photo/hooks/state';
import { GalleryContextMenu } from '@apps/photo/hooks/useGalleryContextMenu';
import { usePhotoActions } from '@apps/photo/hooks/usePhotoActions';
import { Container, MainBody, MainHeader } from '@apps/photo/Photo.styles';

const Gallery: React.FC<{ title?: string }> = ({ title }) => {
	const params = useParams();
	const categoryId = parseInt(params.categoryId ?? '') || -1;

	const [loading, setLoading] = useState(true);

	const { addPhoto, fetchCategories } = usePhotoActions();

	const categories = useGalleryCategoriesValue();
	const setGlobalWallpaper = useSetGlobalWallpaper();

	const { isOpen, setOpen, toggleMenu } = useToggableMenu();

	useEffect(() => setGlobalWallpaper('bg-[url(./media/background/blob.svg)]'), []);

	useEffect(() => {
		fetchCategories(categoryId);
		setLoading(false);
	}, [categoryId]);

	return (
		<Container>
			<MainHeader title={title ?? 'Sua galeria'}>
				<IoCloudUploadOutline />
			</MainHeader>
			<MainBody className="flex-1">
				{loading ? (
					<TriangleLoader />
				) : (
					<GalleryBody>
						{categories.map((category) => (
							<GalleryFolder key={category.id} category={category} />
						))}
					</GalleryBody>
				)}
				<GalleryNavbar showUpload={() => toggleMenu()} />
			</MainBody>
			<ContextMenu isOpen={isOpen}>
				<GalleryContextMenu toggleMenu={toggleMenu} addPhoto={addPhoto} />
			</ContextMenu>
		</Container>
	);
};

export default Gallery;
