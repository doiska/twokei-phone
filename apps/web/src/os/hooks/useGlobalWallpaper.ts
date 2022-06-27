import React, { useEffect } from 'react';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const state = {
	wallpaper: atom<string | React.CSSProperties>({
		key: 'globalWallpaper',
		default: '',
	}),
};

const useGlobalWallpaper = (wallpaper: string | React.CSSProperties) => {
	const setGlobalWallpaper = useSetRecoilState(state.wallpaper);

	useEffect(() => {
		setGlobalWallpaper(wallpaper);
		return () => setGlobalWallpaper('');
	}, [setGlobalWallpaper]);
};

const useGlobalWallpaperValue = () => useRecoilValue(state.wallpaper);
const useSetGlobalWallpaper = () => useSetRecoilState(state.wallpaper);

export { useGlobalWallpaper, useSetGlobalWallpaper, useGlobalWallpaperValue };
