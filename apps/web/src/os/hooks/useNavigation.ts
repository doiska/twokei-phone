import { matchRoutes, NavigateOptions, To, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';

import { useSetAppWallpaper } from '@os/hooks/useAppWallpaper';
import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const useNavigation = (onNavigate?: (to: To) => void) => {
	const location = useLocation();
	const navigate = useNavigate();

	const setAppWallpaper = useSetAppWallpaper();
	const setGlobalWallpaper = useSetGlobalWallpaper();

	const goTo = (to: string | number, options?: NavigateOptions) => {
		setAppWallpaper('');
		setGlobalWallpaper('');

		navigate(to as To, options);
		onNavigate?.(to as To);
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
