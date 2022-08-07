import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_twitter_content' })
export class TweetItemModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		identifier: string;

	@Column({ type: 'int', nullable: true })
		retweet?: number;

	@Column()
		content: string;

	@Column()
		images: string;

	@Column()
		created_at: string;
}

@Entity({ name: 'twokei_phone_twitter_profile' })
export class TwitterProfileModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		identifier: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		name: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		username: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
		avatar: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
		description: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
		default: new Date().getTime(),
	})
		created_at: number;
}

@Entity({ name: 'twokei_phone_twitter_action' })
export class TwitterActionModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'int' })
		tweet_id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		identifier: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		action: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		created_at: string;
}