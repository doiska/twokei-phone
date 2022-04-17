import React from 'react';

const GalleryBody: React.FC = ({ children }) => {
	return <div className="flex flex-col gap-6 px-2">{children}</div>;
};

const GalleryFolder: React.FC<{ folderName: string }> = ({ folderName, children }) => {
	return (
		<>
			<div className="shadow-6xl flex flex-col gap-2 rounded-md bg-white bg-opacity-10 p-2 backdrop-blur-md transition-all hover:bg-opacity-10">
				<div className="text-sm font-medium">
					<span className="p-1">{folderName}</span>
				</div>
				<div className="flex flex-row items-center gap-1">{children}</div>
			</div>
		</>
	);
};

const GalleryItem: React.FC<{ checked?: boolean; content: string }> = ({ checked, content }) => (
	<div className="basis-1/3">
		<img src={content} className="h-full w-full transition-all hover:scale-[103%]" />
	</div>
);

export { GalleryBody, GalleryFolder, GalleryItem };
