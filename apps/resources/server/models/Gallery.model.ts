import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'twokei_phone_gallery' })
export class GalleryItemModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
		identifier: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
		image: string;

	@Column({ type: 'varchar', length: 255, nullable: false, default: 'Sem categoria' })
		category: string;
}
