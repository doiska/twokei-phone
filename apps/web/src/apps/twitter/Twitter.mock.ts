import { Profile } from '@typings/common';
import { Tweet } from '@typings/twitter';

export const MockTwitterProfile: Profile = {
	id: 0,
	source: '1',
	name: 'doiská',
	username: 'doiska',
	avatar: 'https://pbs.twimg.com/profile_images/1209829098/doiska_400x400.jpg',
	updatedAt: '2020-01-01T00:00:00.000Z',
	createdAt: '2020-01-01T00:00:00.000Z',
};

export const MockTweets: Tweet[] = [
	{
		id: 0,
		source: '1231230120301230',
		sourceProfileId: 1,
		sourceProfileName: 'eduardin',
		sourceProfileUsername: 'eduardin',
		sourceProfileAvatar:
			'https://cdn.lorem.space/images/face/.cache/500x0/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg',
		message: 'Hello World',
		isLiked: false,
		isMine: false,
		isRetweeted: false,
		secondsAgo: 0,
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
	{
		id: 1,
		source: '1',
		sourceProfileId: 0,
		sourceProfileName: 'doiska',
		sourceProfileUsername: 'doiska',
		sourceProfileAvatar:
			'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg',
		message:
			'xdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxdxd',
		isLiked: true,
		isMine: true,
		isRetweeted: false,
		secondsAgo: 100,
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
];
