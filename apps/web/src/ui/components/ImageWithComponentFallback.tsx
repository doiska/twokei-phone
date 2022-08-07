import React, { useEffect, useState } from 'react';

type Image = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	className?: string;
	loadedImage?: string;
	fallbackElement: JSX.Element;
	condition?: boolean;
	fallback?: () => unknown;
};

const ImageWithDefaultComponentFallback: React.FC<Image> = ({ loadedImage, className, fallback, fallbackElement, ...props }) => {
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		setFailed(false);
	}, [loadedImage]);

	return (
		<>
			{!failed && loadedImage ? (
				<img
					src={loadedImage}
					loading="lazy"
					className={className}
					onLoad={() => setFailed(false)}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						setFailed(true);
						fallback?.();
					}}
					{...props}
				/>
			) : (
				fallbackElement
			)}
		</>
	);
};

export default ImageWithDefaultComponentFallback;
