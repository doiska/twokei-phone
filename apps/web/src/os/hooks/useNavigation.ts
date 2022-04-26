import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom';

import { useSetAppWallpaper } from '@os/hooks/useAppWallpaper';
import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const useNavigation = (onNavigate?: (to: To) => void) => {
	const location = useLocation();
	const navigate = useNavigate();

	const setAppWallpaper = useSetAppWallpaper();
	const setGlobalWallpaper = useSetGlobalWallpaper();

	const goTo = (to: string | number, options?: NavigateOptions) => {
		navigate(to as To, options);
		onNavigate?.(to as To);

		console.log('useNavigation.goTo', to, location.pathname);
	};

	const goBack = () => location.pathname !== '/' && goTo(-1);

	const match = (searchString: string) => location.pathname.includes(searchString);

	return {
		cleanPathname: location.pathname.replace('/', ''),
		match,
		goTo,
		goBack,
		...navigate,
		...location,
	};
};

export default useNavigation;
