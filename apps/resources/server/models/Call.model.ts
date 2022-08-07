import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_calls' })
export class CallModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		identifier: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		dialer: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		receiver: string;

	@Column({
		name: 'is_accepted',
		type: 'tinyint',
		nullable: false,
		default: 0,
	})
		isAccepted: boolean | number;

	@Column({ type: 'varchar', nullable: false })
		start: string;

	@Column({ type: 'varchar', nullable: true, default: null })
		end: string;
}
