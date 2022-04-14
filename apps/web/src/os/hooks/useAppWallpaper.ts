import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const state = {
	wallpaper: atom<string>({
		key: 'appWallpaper',
		default: '',
	}),
};

const useAppWallpaper = () => useRecoilState(state.wallpaper);
const useSetAppWallpaper = () => useSetRecoilState(state.wallpaper);
const useAppWallpaperValue = () => useRecoilValue(state.wallpaper);

export { useAppWallpaper, useSetAppWallpaper, useAppWallpaperValue };
