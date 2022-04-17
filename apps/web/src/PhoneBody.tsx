import React from 'react';

import { useGlobalWallpaperValue } from '@os/hooks/useGlobalWallpaper';

const PhoneBody: React.FC = ({ children }) => {
	const wallpaper = useGlobalWallpaperValue();

	return <div className={`flex h-full w-full flex-col transition-all duration-300 ${wallpaper}`}>{children}</div>;
};

export default PhoneBody;
