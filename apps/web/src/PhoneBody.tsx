import React from 'react';

import { useGlobalWallpaperValue } from '@os/hooks/useGlobalWallpaper';

const PhoneBody: React.FC = ({ children }) => {
	const wallpaper = useGlobalWallpaperValue();

	const isWallpaperAString = typeof wallpaper === 'string';

	return (
		<div
			id={'phone-body'}
			className={`flex h-full w-full flex-col transition-all duration-300 ${
				isWallpaperAString && wallpaper
			}`}
			style={isWallpaperAString ? {} : { ...wallpaper }}
		>
			{children}
		</div>
	);
};

export default PhoneBody;
