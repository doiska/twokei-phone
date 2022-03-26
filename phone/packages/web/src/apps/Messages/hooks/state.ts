import { ServerPromiseResp } from '@typings/common';
import { Message, CreateConversationGroupResult, MessageConversation, MessageEvents } from '@typings/messages';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { MockMessageConversations } from '../utils/constants';

const currentConversationId = atom<number | null>({ key: 'currentConversationId', default: null });

export const messageState = {
	conversations: atom<MessageConversation[]>({
		key: 'conversations',
		default: selector({
			key: 'defaultMessageConversation',
			get: async () => {
				try {
					const resp = await fetchNui<ServerPromiseResp<MessageConversation[]>>(
						MessageEvents.FETCH_MESSAGE_CONVERSATIONS,
						undefined,
						buildRespObj(MockMessageConversations)
					);
					return resp.data ?? [];
				} catch (e) {
					console.error(e);
					return [];
				}
			},
		}),
	}),
	filterValue: atom<string>({
		key: 'defaultFilterValue',
		default: '',
	}),
	filteredConversations: selector<MessageConversation[]>({
		key: 'defaultFilteredConversations',
		get: ({ get }) => {
			const search: string = get(messageState.filterValue);
			const conversations: MessageConversation[] = get(messageState.conversations);

			if (!search) return conversations;

			const regExp = new RegExp(search, 'gi');
            
			return conversations.filter((conversation) => conversation.source?.match(regExp) || conversation.label.match(regExp));
		},
	}),
	messages: atom<Message[]>({
		key: 'message',
		default: [],
	}),
	activeConversation: atom<MessageConversation | null>({
		key: 'activeConversationGroup',
		default: null,
	}),
	showConversationGroup: atom<boolean>({
		key: 'showConversationGroup',
		default: false,
	}),
	createConversationGroupResult: atom<CreateConversationGroupResult | null>({
		key: 'createConversationGroupResult',
		default: null,
	}),
	useImageModal: atom<boolean>({
		key: 'useImageModal',
		default: false,
	}),
	unreadCount: atom<number>({
		key: 'unreadMessagesCount',
		default: 0,
	}),
	selectedMessage: atom<Message | null>({
		key: 'selectedMessage',
		default: null,
	}),
	checkedConversations: atom<number[]>({
		key: 'checkedConversations',
		default: [],
	}),
	isEditing: atom<boolean>({
		key: 'messageIsEditing',
		default: false,
	}),
};

export const useConversationValue = () => useRecoilValue(messageState.conversations);
export const useSetConversations = () => useSetRecoilState(messageState.conversations);
export const useConversations = () => useRecoilState(messageState.conversations);

export const useMessagesState = () => useRecoilState(messageState.messages);
export const useMessagesValue = () => useRecoilValue(messageState.messages);
export const useSetMessages = () => useSetRecoilState(messageState.messages);

export const useActiveConversation = () => useRecoilValue(messageState.activeConversation);

export const useSetConversationId = () => useSetRecoilState(currentConversationId);
export const useConversationId = () => useRecoilValue(currentConversationId);

export const useFilterValueState = () => useRecoilState(messageState.filterValue);
export const useSetFilterValue = () => useSetRecoilState(messageState.filterValue);
export const useFilteredConversationsValue = () => useRecoilValue(messageState.filteredConversations);

export const useSetSelectedMessage = () => useSetRecoilState(messageState.selectedMessage);
export const useSelectedMessageValue = () => useRecoilValue(messageState.selectedMessage);

export const useCheckedConversations = () => useRecoilState(messageState.checkedConversations);
export const useCheckedConversationsValue = () => useRecoilValue(messageState.checkedConversations);

export const useIsEditing = () => useRecoilState(messageState.isEditing);
export const useIsEditingValue = () => useRecoilValue(messageState.isEditing);
