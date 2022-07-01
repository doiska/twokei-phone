export interface MessageConversationDTO {
	label?: string;
	sourcePhone: string;
	participants: string[];
	isGroupChat: boolean;
}

export interface MessageConversation {
	id: number;
	label: string;
	avatar?: string;
	sourcePhone: string;
	admins?: string[];
	conversationList: string;
	isGroupChat: boolean;
	unread?: number;
	unreadCount?: number;
	updatedAt?: number;
	createdAt?: number;
}

export interface CreateConversationGroupResult {
	error?: boolean;
	phoneNumber: string;
	duplicate?: boolean;
	conversationId?: string;
	mine?: boolean;
	source: number;
	identifiers: string[];
	doesExist: null;
}

export interface DeleteConversationRequest {
	conversationsId: number[];
}
