import React, { useCallback } from 'react';

import dayjs from 'dayjs';

type DateResults = {
	date: string;
	time: string;
	dayDifference: number;
};

const usePhoneFormattedDate = (comparableDate: string | number | Date | dayjs.Dayjs | null | undefined): DateResults => {
	const now = dayjs(Date.now());
	const from = dayjs(comparableDate);
	const date = from.format('DD/MM/YYYY');
	const hour = from.format('HH:mm');

	return {
		date: date,
		time: hour,
		dayDifference: now.diff(from, 'day'),
	};
};
export default usePhoneFormattedDate;
