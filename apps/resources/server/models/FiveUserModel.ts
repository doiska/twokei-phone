import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class FiveUserModel {
	@PrimaryGeneratedColumn()
		identifier: string;

	@Column({ name: 'phone_number' })
		phoneNumber: string;
}
