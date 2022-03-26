import { useEffect, useState } from 'react';

const usePhoneTime = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const id = setInterval(() => setDate(new Date()), 1000);
		return () => {
			clearInterval(id);
		};
	}, []);

	return { now: date };
};

export default usePhoneTime;
