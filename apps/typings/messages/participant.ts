export interface ConversationParticipant {
	id?: number;
	conversation_id: number;
	participant: string;
	unread_count?: number;
}
