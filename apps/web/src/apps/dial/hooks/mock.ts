import { CallHistoryItem } from '@typings/call';

export const MockHistoryData: CallHistoryItem[] = [
	{
		id: 0,
		receiver: '0147-0147',
		dialer: '123-456-7',
		start: '2020-01-01T00:00:00.000Z',
		isAccepted: false,
	},
	{
		id: 1,
		receiver: '123-456-7',
		dialer: '0147-0147',
		start: '2020-01-01T00:00:00.000Z',
		isAccepted: true,
	},
];
