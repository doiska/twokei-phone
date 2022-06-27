import React from 'react';
import { IoCameraOutline, IoCloudUploadOutline } from 'react-icons/io5';

import { Navbar, NavbarItem, NavbarItemGrid } from '@ui/components/BaseNavbar';

import useNavigation from '@os/hooks/useNavigation';

const GalleryNavbar: React.FC<{ showUpload?: () => void }> = ({
	showUpload,
}) => {
	const { goTo } = useNavigation();

	return (
		<Navbar>
			<NavbarItemGrid className="shadow-6xl bg-shark w-[50%] justify-evenly rounded-md bg-opacity-90 py-2.5 text-2xl text-white opacity-80 transition-all hover:opacity-100">
				<NavbarItem onClick={() => goTo('/photo/camera')}>
					<IoCameraOutline />
				</NavbarItem>
				<NavbarItem>
					<IoCloudUploadOutline onClick={showUpload} />
				</NavbarItem>
			</NavbarItemGrid>
		</Navbar>
	);
};

export { GalleryNavbar };
