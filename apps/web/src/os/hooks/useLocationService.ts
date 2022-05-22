import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLocationService = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		console.log(`[useLocationService]: ${pathname}`);
	}, [pathname]);
};

export default useLocationService;
