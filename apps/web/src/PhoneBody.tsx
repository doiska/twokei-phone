import React, { useEffect } from 'react';

import { useGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const PhoneBody: React.FC = ({ children }) => {
	const [wallpaper, setWallpaper] = useGlobalWallpaper();

	return <div className={`flex h-full w-full flex-col transition-all duration-300 ${wallpaper}`}>{children}</div>;
};

export default PhoneBody;
