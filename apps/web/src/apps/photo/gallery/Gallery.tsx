import React, { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { TriangleLoader } from '@ui/components/LoadingSpinner';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';
import useToggableMenu from '@os/hooks/useTogglableMenu';
import ContextMenu from '@os/menu/ContextMenu';

import { GalleryBody, GalleryFolder, GalleryNavbar } from '@apps/photo/gallery/Gallery.styles';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { GalleryContextMenu } from '@apps/photo/others/GalleryContextMenu';
import { Container, MainBody, MainHeader } from '@apps/photo/Photo.styles';

const Gallery: React.FC<{ title?: string }> = ({ title }) => {
	const [loading, setLoading] = useState(false);

	const { photos, addPhoto } = usePhotoAPI();

	const setGlobalWallpaper = useSetGlobalWallpaper();

	const { toggleMenu, isOpen } = useToggableMenu();

	useEffect(() => setGlobalWallpaper('bg-[url(./media/background/blob.svg)]'), []);

	const categories = [...new Set(photos.map((c) => c.category ?? 'Sem categoria'))];

	console.log(categories);

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
							<GalleryFolder
								key={category}
								category={category}
								photos={photos.filter((photo) => photo.category === category)}
							/>
						))}
					</GalleryBody>
				)}
				<GalleryNavbar showUpload={() => toggleMenu()} />
			</MainBody>
			<ContextMenu isOpen={isOpen}>
				<GalleryContextMenu categories={categories} toggleMenu={toggleMenu} commit={addPhoto} />
			</ContextMenu>
		</Container>
	);
};

export default Gallery;
