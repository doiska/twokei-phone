import {
	NavigateOptions,
	To,
	useLocation,
	useNavigate,
} from 'react-router-dom';

const useNavigation = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const goTo = (to: string | number, options?: NavigateOptions) => {
		if (location.pathname === to) return;

		navigate(to as To, options);
	};

	const goBack = () => location.pathname !== '/' && goTo(-1);

	const match = (searchString: string) =>
		location.pathname.includes(searchString);

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
