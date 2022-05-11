import React, { useState } from 'react';
import { IoCameraOutline, IoCloudUploadOutline } from 'react-icons/io5';
import ScrollContainer from 'react-indiana-drag-scroll';

import { HTMLAttributes } from '@typings/core';
import { FCWithChildren } from '@typings/ext';
import { GalleryPhoto } from '@typings/gallery';
import { Navbar, NavbarItem, NavbarItemGrid } from '@ui/components/BaseNavbar';

import useNavigation from '@os/hooks/useNavigation';

const GalleryFolderView: FCWithChildren = ({ children }) => (
	<div className="flex w-full flex-col gap-5 px-2 py-2">
		<ScrollContainer horizontal={false} className="flex h-[630px] flex-col gap-5 px-2">
			{children}
		</ScrollContainer>
	</div>
);

const GalleryFolder: React.FC<HTMLAttributes & { category: string; photos: GalleryPhoto[] }> = ({
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
						<GalleryItem className="h-auto border-2" key={`${id}-${index}`} content={image} />
					))}
				</div>
			)}
		</div>
	);
};

const GalleryItem: React.FC<{ checked?: boolean; content: string } & HTMLAttributes> = ({
	content,
	className,
	...rest
}) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<img
			{...rest}
			src={content}
			onLoad={() => setLoaded(true)}
			className={`h-auto transition-all ${className}`}
			style={{
				opacity: loaded ? 1 : 0,
			}}
		/>
	);
};

const GalleryNavbar: React.FC<{ showUpload?: () => void }> = ({ showUpload }) => {
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

export { GalleryNavbar, GalleryFolderView as GalleryBody, GalleryFolder, GalleryItem };
