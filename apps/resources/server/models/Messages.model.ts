import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';

/*

	declare id: number;
	declare label: string;
	declare avatar?: string;
	declare source: string;
	declare admins?: string[];
	declare conversationList: string;
	declare isGroupChat: boolean;
	declare unread?: number;
	declare unreadCount?: number;
	declare updatedAt?: number;
	declare createdAt?: number;

 */
@Entity({ name: 'twokei_phone_conversations' })
export class ConversationModel {
	@PrimaryGeneratedColumn()
	@OneToMany(() => ParticipantModel, (message) => message.conversationId)
		id: number;

	@Column()
		label: string;

	@Column({ name: 'source_phone_number' })
		sourcePhone: string;

	@Column({ name: 'conversation_list' })
		conversationList: string;

	@Column({ name: 'is_group' })
		isGroupChat: boolean;

	@Column({ name: 'updated_at', type: 'int' })
		updatedAt: number;

	@Column({ name: 'created_at', type: 'int' })
		createdAt: number;
}

@Entity({ name: 'twokei_phone_conversation_participants' })
export class ParticipantModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ name: 'conversation_id' })
	@ManyToOne(() => ConversationModel, (conversation) => conversation.id)
		conversationId: number;

	@Column()
		participant: string;
}

@Entity({ name: 'twokei_phone_messages' })
export class MessageModel {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ name: 'conversation_id' })
	// @ManyToOne(() => ConversationModel, (conversation) => conversation.id)
		conversationId: number;

	@Column()
		message: string;

	@Column({ name: 'source_identifier' })
		sourceIdentifier: string;

	@Column({ name: 'source_phone_number' })
		sourcePhoneNumber: string;

	@Column({ name: 'embed' })
		embed: string;

	@Column({ name: 'is_embed' })
		isEmbed: boolean;

	@Column({ name: 'created_at', type: 'int' })
		createdAt: number;

	@Column({ name: 'updated_at', type: 'int' })
		updatedAt: number;
}
