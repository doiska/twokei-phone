import { useEffect } from 'react';

import {
	atom,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

export enum Themes {
	LIGHT,
	DARK,
}

export const themeState = {
	theme: atom<Themes>({
		key: 'theme',
		default: Themes.DARK,
	}),
};

export const useSystemThemeService = () => {
	const theme = useSystemTheme();

	useEffect(() => {
		const root = window.document.documentElement;
		const isDark = theme === Themes.DARK;

		root.classList.add(isDark ? 'dark' : 'light');
		root.classList.remove(isDark ? 'light' : 'dark');

		console.log('useSystemThemeService', Themes[theme]);
	}, [theme]);
};

export const useSystemThemeState = () => useRecoilState(themeState.theme);
export const useSetSystemTheme = () => useSetRecoilState(themeState.theme);
export const useSystemTheme = () => useRecoilValue(themeState.theme);
