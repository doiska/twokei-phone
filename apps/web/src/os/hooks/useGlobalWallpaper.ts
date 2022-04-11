import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const state = {
	wallpaper: atom<string>({
		key: 'globalWallpaper',
		default: '',
	}),
};

const useGlobalWallpaper = () => useRecoilState(state.wallpaper);
const useSetGlobalWallpaper = () => useSetRecoilState(state.wallpaper);
const useGlobalWallpaperValue = () => useRecoilValue(state.wallpaper);

export { useGlobalWallpaper, useSetGlobalWallpaper, useGlobalWallpaperValue };
