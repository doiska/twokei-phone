import React, { useState } from 'react';
import { IoArrowBackOutline, IoRemoveCircleOutline, IoSaveOutline } from 'react-icons/io5';

import { GalleryPhoto, PreDBGalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import usePromptMenu from '@ui/hooks/usePromptMenu';

import useHandleOutsideClick from '@os/hooks/useHandleOutsideClick';

type ContextProps = {
	presetPhoto?: GalleryPhoto;
	categories: string[];
	toggleMenu: () => void;
	savePhoto: (photo: PreDBGalleryPhoto) => void;
	removePhoto: (photo: GalleryPhoto) => void;
};

export const GalleryContextMenu: React.FC<ContextProps> = ({
	categories,
	presetPhoto,
	savePhoto,
	removePhoto,
	toggleMenu,
}) => {
	const [image, setImage] = useState(presetPhoto?.image ?? '');
	const [enableSave, setEnableSave] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(presetPhoto?.category ?? 'Sem categoria');
	const { ContextMenu: PromptMenu, openMenu } = usePromptMenu();

	const ref = React.useRef<HTMLDivElement>(null);
	useHandleOutsideClick(ref, () => toggleMenu());

	const commitPhoto = () => {
		savePhoto({
			id: presetPhoto?.id,
			image: image,
			category: selectedCategory,
		});
		toggleMenu();
	};

	const deletePhoto = () => {
		if (presetPhoto) {
			removePhoto(presetPhoto);
			toggleMenu();
		}
	};

	return (
		<div
			ref={ref}
			className="shadow-7xl bg-shark absolute left-[50%] top-[50%] flex h-[60%] w-[90%] translate-y-[-50%] translate-x-[-50%] flex-col items-center gap-4 rounded-lg bg-opacity-90 p-2 backdrop-blur-lg"
		>
			<span className="absolute left-4 top-3 cursor-pointer rounded-md bg-white bg-opacity-10 p-1">
				<IoArrowBackOutline onClick={toggleMenu} size={20} color={'white'}/>
			</span>
			<div className="flex flex-1 flex-row items-center justify-center gap-1">
				<img
					onLoad={() => setEnableSave(true)}
					onError={() => setEnableSave(false)}
					className={`${!enableSave && 'hidden'} h-auto max-w-[60%]`}
					src={image}
				/>
				{!enableSave && <TriangleLoader/>}
			</div>

			<input
				className="w-[90%] basis-[5%] rounded-md bg-white bg-opacity-10 p-2 placeholder:text-gray-100 focus:outline-none"
				placeholder="Insira o link da imagem"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<div className="w-[70%] basis-[5%] rounded-md bg-white bg-opacity-10 p-2">
				<input
					className=" w-full appearance-none rounded bg-white bg-opacity-10 px-2 py-1 text-base font-normal text-white transition-all focus:outline-none"
					list="categories"
					placeholder={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				/>
				<datalist id="categories">
					{categories.map((category, index) => (
						<option key={index}>{category}</option>
					))}
				</datalist>
			</div>

			<div className="mb-2 flex basis-[10%] flex-row justify-between gap-6">
				<button
					className="bg-shark shadow-3xl flex flex-row items-center gap-2 rounded-md border-2 border-transparent p-2 transition-all hover:border-zinc-300"
					onClick={() => openMenu(`Apagar foto?`, deletePhoto, () => toggleMenu())}
				>
					<IoRemoveCircleOutline/>
					<span>Apagar</span>
				</button>
				<button
					className={`bg-shark shadow-3xl flex flex-row items-center gap-2 rounded-md border-2 border-transparent p-2 transition-all hover:border-zinc-300 ${
						!enableSave && 'cursor-not-allowed'
					}`}
					onClick={() => openMenu(`Salvar foto?`, commitPhoto, () => toggleMenu())}
				>
					<IoSaveOutline/>
					<span>Salvar</span>
				</button>
			</div>
			<PromptMenu/>
		</div>
	);
};

export default GalleryContextMenu;
