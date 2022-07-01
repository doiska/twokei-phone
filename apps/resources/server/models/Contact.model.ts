import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_calls' })
export class ContactModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		identifier: string;

	@Column()
		display: string;

	@Column()
		number: string;

	@Column({ nullable: true })
		avatar?: string;
}
