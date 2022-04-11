import { MessageConversation, MessageEvents, MessageConversationDTO } from '@typings/messages';
import { onNetPromise } from '@lib/onNetPromise';
import MessageService from './messages.service';

onNetPromise<void, MessageConversation[]>(MessageEvents.FETCH_MESSAGE_CONVERSATIONS, async (req, resp) =>
	MessageService.fetchMessageConversation(req, resp).catch((e) => {
		console.error(e);
		resp({ status: 'error', errorMsg: e.message });
	})
);

onNetPromise<MessageConversationDTO, MessageConversation>(
	MessageEvents.CREATE_MESSAGE_CONVERSATION,
	async (req, resp) =>
		MessageService.createConversation(req, resp).catch((e) => console.error(`Error creating conversation: ${e}`))
);
