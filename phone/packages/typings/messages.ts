export interface Profile {
	source: string;
	display?: string;
	avatar?: string;
}

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
	converstationId: number;
	sourceIdentifier: string;
	sourcePhoneNumber: string;
	message: string;
	is_embed: boolean;
	embed?: any;
}
export interface PreDBMessageConversation {
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
}

export interface MessagesRequest {
	conversationId: string;
	page: number;
}

export interface DeleteConversationRequest {
	conversationsId: number[];
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

export enum MessageEvents {
	FETCH_MESSAGES = 'tkphone:messages:fetch',

	FETCH_MESSAGE_CONVERSATIONS = 'tkphone:messages:fetchMessageGroups',
	FETCH_MESSAGE_CONVERSATIONS_SUCCESS = 'tkphone:messages:fetchMessageGroups:success',
	FETCH_MESSAGE_CONVERSATIONS_FAILED = 'tkphone:messages:fetchMessageGroups:failed',

	CREATE_MESSAGE_CONVERSATION = 'tkphone:messages:createMessageGroup',
	CREATE_MESSAGE_CONVERSATION_SUCCESS = 'tkphone:messages:createMessageGroup:success',
	CREATE_MESSAGE_CONVERSATION_FAILED = 'tkphone:messages:createMessageGroup:failed',
	UPDATE_MESSAGE_CONVERSATION = 'tkphone:messages:updateMessageGroup',
	DELETE_MESSAGE_CONVERSATION = 'tkphone:messages:deleteMessageGroup',

	SEND_MESSAGE = 'tkphone:messages:sendMessage',
	SEND_EMBED_MESSAGE = 'tkphone:messages:sendEmbeddedMessage',
	SEND_MESSAGE_SUCCESS = 'tkphone:messages:sendMessage:success',
	SEND_MESSAGE_FAILED = 'tkphone:messages:sendMessage:failed',
	DELETE_MESSAGE = 'tkphone:messages:deleteMessage',

	SET_READ_MESSAGE = 'tkphone:messages:setReadMessage',

	CREATE_MESSAGE_BROADCAST = 'tkphone:messages:broadcast',

	SET_PROFILE = 'tkphone:messages:setProfile',
	FETCH_PROFILE = 'tkphone:messages:fetchProfile',
	FETCH_ALL_PROFILES = 'tkphone:messages:fetchAllProfiles',
}
