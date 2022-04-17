import React, { useEffect } from 'react';
import { GiPerpendicularRings } from 'react-icons/gi';
import { IoCamera, IoCameraOutline, IoCloudUploadOutline, IoFolderOutline } from 'react-icons/io5';

import { BaseNavbarItem } from '@ui/components/BaseNavbar';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { GalleryBody, GalleryFolder, GalleryItem } from '@apps/photo/gallery/GalleryBody';
import { Container, MainBody, MainHeader, Navbar } from '@apps/photo/Photo.styles';

const Gallery = () => {
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setGlobalWallpaper('bg-[url(./media/background/blob.svg)]');
	}, []);

	return (
		<Container>
			<MainHeader title="Imagens salvas">
				<IoCloudUploadOutline />
			</MainHeader>
			<MainBody className="flex-1">
				<GalleryBody>
					<GalleryFolder folderName="Sem categoria">
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
					</GalleryFolder>
					<GalleryFolder folderName="Fighter">
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
					</GalleryFolder>
					<GalleryFolder folderName="doiská">
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
						<GalleryItem content="https://exploringbits.com/wp-content/uploads/2022/01/Killua-PFP-1-1024x732.jpg" />
					</GalleryFolder>
				</GalleryBody>
			</MainBody>
			<Navbar>
				<BaseNavbarItem className="text-red-200">
					<GiPerpendicularRings />
				</BaseNavbarItem>
				<BaseNavbarItem>
					<IoFolderOutline />
				</BaseNavbarItem>
				<BaseNavbarItem>
					<IoCameraOutline />
				</BaseNavbarItem>
				<BaseNavbarItem>
					<IoCloudUploadOutline />
				</BaseNavbarItem>
			</Navbar>
		</Container>
	);
};

export default Gallery;
