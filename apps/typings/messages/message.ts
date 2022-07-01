export interface Message {
	id: number;
	message: string;
	conversationId?: number;
	author: string;
	is_embed?: boolean;
	embed?: any;
	date: number;
}

export interface PreDBMessage {
	conversationId: number;
	conversationList: string;
	sourcePhoneNumber?: string;
	message?: string;
	is_embed?: boolean;
	embed?: any;
}

export interface CreateMessageDTO {
	conversationId: number;
	sourceIdentifier: string;
	sourcePhoneNumber: string;
	message: string;
	is_embed: boolean;
	embed?: any;
}

export interface MessagesRequest {
	conversationId: number;
	page: number;
}
