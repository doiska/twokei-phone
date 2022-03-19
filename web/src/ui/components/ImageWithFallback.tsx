import React, { useState } from 'react';

type Image = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	className?: string;
	initialImage?: string;
	loadedImage: string;
	fallbackImage?: string;
	fallback?: () => unknown;
};

const Image: React.FC<Image> = ({ initialImage, loadedImage, fallbackImage, className, fallback, ...props }) => {
	const [image, setImage] = useState(initialImage);

	return (
		<img
			src={initialImage}
			className={className}
			onLoad={() => setImage(loadedImage)}
			onError={() => {
				if (image !== fallbackImage) {
					setImage(fallbackImage);
					fallback?.();
				}
			}}
			{...props}
		/>
	);
};

export default Image;
