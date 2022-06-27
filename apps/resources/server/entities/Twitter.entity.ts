import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_tweet_item' })
export class TweetItemModel {
	//id, source, content, images, created_at
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	source: number;

	@Column()
	content: string;

	@Column()
	images: string[];

	@Column()
	created_at: string;
}
