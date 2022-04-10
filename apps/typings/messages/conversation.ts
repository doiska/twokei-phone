export interface MessageConversationDTO {
	source: string;
	participants: string[];
	conversationLabel?: string;
	isGroupChat: boolean;
}

export interface MessageConversation {
	id: number;
	label: string;
	avatar?: string;
	source: string;
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
	source: string;
	identifiers: string[];
	doesExist: null;
}

export interface DeleteConversationRequest {
	conversationsId: number[];
}
