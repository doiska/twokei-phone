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
