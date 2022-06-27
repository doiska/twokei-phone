import {
	NavigateOptions,
	To,
	useLocation,
	useNavigate,
	createSearchParams,
	URLSearchParamsInit,
} from 'react-router-dom';

const useNavigation = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const goTo = (to: string | number, options?: NavigateOptions) => {
		if (location.pathname === to) return;

		navigate(to as To, options);
	};

	const goToWithParams = (to: To, params: URLSearchParamsInit, preventSamePage = false) => {
		if (preventSamePage && location.pathname === to) return;

		const searchParams = createSearchParams(params);
		navigate({ pathname: to.toString(), search: searchParams.toString() });
	};

	const goBack = () => location.pathname !== '/' && goTo(-1);

	const match = (searchString: string) => location.pathname.includes(searchString);

	return {
		cleanPathname: location.pathname.replace('/', ''),
		match,
		goTo,
		goToWithParams,
		goBack,
		...navigate,
		...location,
	};
};

export default useNavigation;
