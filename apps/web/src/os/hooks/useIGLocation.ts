import { useEffect, useState } from 'react';

import { GENERIC_EVENTS } from '@typings/common';
import fetchNui from '@utils/fetchNui';

const useIGLocation = () => {
	const [location, setLocation] = useState<string>('');

	useEffect(() => {
		const getLocation = async () => {
			const response = await fetchNui(
				GENERIC_EVENTS.FETCH_USER_LOCATION,
				'Rua que sobe e desce'
			);
			if (response.status === 'ok') {
				setLocation(response.data);
			}
		};

		getLocation();
	}, []);

	return {
		location,
	};
};

export default useIGLocation;
