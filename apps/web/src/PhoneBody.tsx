import React from 'react';

import { useGlobalWallpaperValue } from '@os/hooks/useGlobalWallpaper';

const PhoneBody: React.FC = ({ children }) => {
	const wallpaper = useGlobalWallpaperValue();

	const isWallpaperAString = typeof wallpaper === 'string';

    console.log(wallpaper);

	return (
		<div
			className={`flex h-full w-full flex-col transition-all duration-300 ${isWallpaperAString && wallpaper}`}
			style={{ ...(wallpaper as React.CSSProperties) }}
		>
			{children}
		</div>
	);
};

export default PhoneBody;
