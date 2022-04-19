import React from 'react';
import { GiPerpendicularRings } from 'react-icons/gi';
import { IoCameraOutline, IoCloudUploadOutline, IoFolderOutline } from 'react-icons/io5';

import { HTMLAttributes } from '@typings/core';
import { GalleryPhoto } from '@typings/gallery';
import { NavbarItem, NavbarItemGrid } from '@ui/components/BaseNavbar';

import { Navbar } from '@apps/photo/Photo.styles';

const GalleryFolderView: React.FC = ({ children }) => <div className="flex flex-col gap-5 px-2">{children}</div>;

const GalleryFolder: React.FC<HTMLAttributes & { category: string; photos: GalleryPhoto[] }> = ({
	category,
	photos,
	...rest
}) => {
	return (
		<div
			className="shadow-6xl flex flex-col gap-2 rounded-md bg-white bg-opacity-10 p-2 backdrop-blur-md transition-all hover:bg-opacity-20"
			{...rest}
		>
			<div className="text-sm font-medium">
				<span className="p-1">{category}</span>
			</div>

			{photos.length > 0 && (
				<div className="flex flex-row items-center gap-1">
					{photos.map(({ id, image }, index) => (
						<GalleryItem key={`${id}-${index}`} content={image} />
					))}
				</div>
			)}
		</div>
	);
};

const GalleryItem: React.FC<{ checked?: boolean; content: string }> = ({ content }) => (
	<div className="basis-1/3">
		<img src={content} className="h-full w-full" />
	</div>
);

const GalleryNavbar: React.FC<{ showUpload?: () => void }> = ({ showUpload }) => {
	return (
		<Navbar>
			<NavbarItemGrid>
				<NavbarItem className="text-red-200">
					<GiPerpendicularRings />
				</NavbarItem>
				<NavbarItem>
					<IoFolderOutline />
				</NavbarItem>
				<NavbarItem>
					<IoCameraOutline />
				</NavbarItem>
				<NavbarItem>
					<IoCloudUploadOutline onClick={showUpload} />
				</NavbarItem>
			</NavbarItemGrid>
		</Navbar>
	);
};

export { GalleryNavbar, GalleryFolderView as GalleryBody, GalleryFolder, GalleryItem };
