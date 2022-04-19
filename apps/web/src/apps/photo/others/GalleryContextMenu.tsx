import React, { useState } from 'react';
import { IoRemoveCircleOutline, IoSaveOutline } from 'react-icons/io5';

import { PreDBGalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import SelectWithInput from '@ui/components/SelectWithInput';

type ContextProps = {
	presetImage?: string;
	categories: string[];
	toggleMenu: () => void;
	commit: (photo: PreDBGalleryPhoto) => void;
};

export const GalleryContextMenu: React.FC<ContextProps> = ({ categories, commit, toggleMenu, presetImage }) => {
	const [image, setImage] = useState(
		presetImage ?? 'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg'
	);

	const [enableSave, setEnableSave] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('Sem categoria');

	const commitPhoto = () => {
		commit({
			image: image,
			category: selectedCategory ?? 'Sem categoria',
		});
		toggleMenu();
	};

	return (
		<div className="shadow-7xl bg-shark absolute left-[50%] top-[50%] flex h-[60%] w-[90%] translate-y-[-50%] translate-x-[-50%] flex-col items-center gap-4 rounded-lg bg-opacity-90 p-2 backdrop-blur-lg">
			<div className="flex flex-1 flex-row items-center justify-center gap-1">
				<img
					onLoad={() => setEnableSave(true)}
					onError={() => setEnableSave(false)}
					className={`${!enableSave && 'hidden'} h-auto max-w-[75%]`}
					src={image}
				/>
				{!enableSave && <TriangleLoader />}
			</div>

			<input
				className="w-[90%] basis-[5%] rounded-md bg-white bg-opacity-10 p-2 placeholder:text-gray-100 focus:outline-none"
				placeholder="Insira o link da imagem"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<div className="w-[70%] basis-[5%] rounded-md bg-white bg-opacity-10 p-2">
				<SelectWithInput
					className="block w-full appearance-none rounded bg-white bg-opacity-10 px-2 py-1 text-base font-normal text-white transition-all focus:outline-none"
					onChange={(content) => setSelectedCategory(content as string)}
					values={categories}
				/>
			</div>

			<div className="mb-2 flex basis-[10%] flex-row justify-between gap-6">
				<button
					className="bg-shark shadow-3xl flex flex-row items-center gap-2 rounded-md border-2 border-transparent p-2 transition-all hover:border-zinc-300"
					onClick={() => toggleMenu()}
				>
					<IoRemoveCircleOutline />
					<span>Cancelar</span>
				</button>
				<button
					className={`bg-shark shadow-3xl flex flex-row items-center gap-2 rounded-md border-2 border-transparent p-2 transition-all hover:border-zinc-300 ${
						!enableSave && 'cursor-not-allowed'
					}`}
					onClick={() => enableSave && commitPhoto()}
				>
					<IoSaveOutline />
					<span>Salvar</span>
				</button>
			</div>
		</div>
	);
};

export default GalleryContextMenu;
