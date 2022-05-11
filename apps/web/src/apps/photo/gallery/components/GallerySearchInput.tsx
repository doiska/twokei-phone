import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const GallerySearchInput: React.FC<{ currentValue: string; onChange: (value: string) => void }> = ({
	currentValue,
	onChange,
}) => {
	return (
		<div className="mt-2 flex w-full items-center justify-center">
			<div className="mb-2 flex w-full flex-row items-center justify-center gap-2">
				<input
					placeholder="Pesquisar categoria"
					className="bg-shark w-[60%] appearance-none rounded-md border-2 border-transparent p-2 px-1 text-white shadow-2xl transition-all hover:border-white hover:border-opacity-50 focus:outline-none"
					onChange={(e) => onChange(e.target.value)}
					value={currentValue}
				/>
				{currentValue && (
					<IoCloseCircleOutline
						onClick={() => onChange('')}
						className="cursor-pointer transition-opacity duration-300"
						style={{ opacity: currentValue ? 1 : 0 }}
						size={28}
					/>
				)}
			</div>
		</div>
	);
};

export default GallerySearchInput;
