import { GalleryCategory } from '@typings/gallery';

export const GalleryMockData = [
	{
		id: 0,
		name: 'Sem categoria',
		photos: [],
	},
	{
		id: 1,
		name: 'Fighter',
		photos: [
			{
				id: 1,
				image: 'https://picsum.photos/id/1/200/200',
			},
			{
				id: 2,
				image: 'https://picsum.photos/id/2/200/200',
			},
			{
				id: 3,
				image: 'https://picsum.photos/id/3/200/200',
			},
		],
	},
	{
		id: 2,
		name: 'Bike',
		photos: [
			{
				id: 6,
				image: 'https://picsum.photos/id/6/200/200',
			},
			{
				id: 4,
				image: 'https://picsum.photos/id/4/200/200',
			},
			{
				id: 5,
				image: 'https://picsum.photos/id/5/200/200',
			},
		],
	},
] as GalleryCategory[];
