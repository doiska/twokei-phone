import { Profile } from '@typings/common';
import { FormattedTweet } from '@typings/twitter';

export const MockTwitterProfile: Profile = {
	id: 0,
	source: '1',
	name: 'doiská',
	username: 'doiska',
	avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg',
	updatedAt: '2020-01-01T00:00:00.000Z',
	createdAt: '2020-01-01T00:00:00.000Z',
};

export const MockTweets: FormattedTweet[] = [
	{
		id: 0,
		source: '1231230120301230',
		profile: {
			id: 1,
			source: '1231230120301230',
			name: 'doiská',
			username: 'doiska',
			avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg',
		},
		content: 'Hello World',
		isLiked: false,
		isMine: true,
		isRetweeted: false,
		createdAt: new Date(1232131).toString(),
		updatedAt: new Date().toString(),
	},
	{
		id: 1,
		source: '1',
		profile: {
			id: 2,
			source: '2',
			name: 'Eduardo',
			username: 'eduardin',
			avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg',
		},
		content: 'teste',
		isLiked: true,
		isMine: false,
		isRetweeted: true,
		createdAt: new Date(13212312321).toString(),
		updatedAt: new Date().toString(),
	},
];
