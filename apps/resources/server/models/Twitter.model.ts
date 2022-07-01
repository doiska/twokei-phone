import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_tweet_item' })
export class TweetItemModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		source: number;

	@Column()
		content: string;

	@Column()
		images: string; // TODO: parse array

	@Column()
		created_at: string;
}

@Entity({ name: 'twokei_phone_twitter_profile' })
export class TwitterProfileModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		source: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		name: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		username: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
		avatar: string;

	@Column({ type: 'varchar', length: 255, nullable: true, default: '' })
		bio: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
		default: new Date().getTime(),
	})
		created_at: number;
}
