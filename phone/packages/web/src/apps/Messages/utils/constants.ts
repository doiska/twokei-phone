import { ServerPromiseResp } from '@typings/common';
import { Message, MessageConversation, Profile } from '@typings/messages';

export const MockMessageConversations: MessageConversation[] = [
	{
		id: 0,
		conversationList: '0147-0147+123-4567',
		source: '0147-0147',
		unread: 5,
		label: '',
		updatedAt: 5,
		isGroupChat: false,
	},
	{
		id: 1,
		conversationList: '123-4567+0147-0147',
		source: '123-4567',
		unread: 0,
		label: 'Família Fighter',
		updatedAt: 5,
		isGroupChat: true,
	},
	{
		id: 2,
		conversationList: '0147-0147+5678-1234',
		source: '0147-0147',
		unread: 0,
		label: '',
		updatedAt: 5,
		isGroupChat: false,
	},
];

export const MockConversationMessage: Message[] = [
	{
		id: 0,
		author: '1234-567',
		message: 'verdade',
		conversationId: 0,
		date: 1647887400034,
	},
	{
		id: 1,
		author: '0147-0147',
		message: 'xddd',
		conversationId: 0,
		date: 364887467212,
	},
	{
		id: 1,
		author: '444-444',
		message: 'Tá loco tioooooooo',
		conversationId: 2,
		date: 164887467212,
	},
];

export const MockServerResp: ServerPromiseResp<Message[]> = {
	data: MockConversationMessage,
	status: 'ok',
};

export const MockProfileResp: ServerPromiseResp<Profile> = {
	status: 'ok',
	data: {
		display: 'doiská',
		source: '0147-0147',
	},
};

export const MockProfilesResp: ServerPromiseResp<Profile[]> = {
	status: 'ok',
	data: [
		{
			source: '123-4567',
			display: 'eduardo',
		},
		{
			source: '444-444',
			display: 'seila',
		},
		{
			source: '5678-1234',
			display: 'nao eh o doiska',
			avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg',
		},
	],
};
