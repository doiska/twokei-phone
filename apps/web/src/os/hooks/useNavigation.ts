import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const useNavigation = (onNavigate?: (to: To) => void) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const setWallpaper = useSetGlobalWallpaper();

	const goTo = (to: string | number, options?: NavigateOptions) => {
		setWallpaper('');
		navigate(to as To, options);
		onNavigate?.(to as To);
	};

	const goBack = () => {
		if (pathname !== '/') goTo(-1);
	};

	return {
		goTo,
		goBack,
		...navigate,
	};
};

export default useNavigation;
