import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState, waitForAll } from 'recoil';

import { MessageConversation } from '@typings/messages';

import { messageState, useSetConversationId } from './messageState';

interface IUseMessages {
	conversations?: MessageConversation[];
	activeConversation: MessageConversation | undefined | null;
	getConversationById(id: number): MessageConversation | undefined;
	setActiveConversation: (conversationId: number) => MessageConversation | undefined;
	goToConversation: (conversationId: number) => void;
}

const useMessages = (): IUseMessages => {
	const navigate = useNavigate();

	const { state: conversationLoading, contents } = useRecoilValueLoadable(messageState.conversations);
	const [activeConversation] = useRecoilValue(waitForAll([messageState.activeConversation]));

	const setCurrentConversationId = useSetConversationId();
	const _setActiveConversation = useSetRecoilState(messageState.activeConversation);

	const getConversationById = useCallback(
		(id: number): MessageConversation | undefined => {
			if (conversationLoading !== 'hasValue') return;
			if (!contents.length) return;

			return contents && contents.find((c) => c.id === id);
		},
		[contents, conversationLoading]
	);

	const setActiveConversation = useCallback(
		(conversationId: number) => {
			const conversation = getConversationById(conversationId);
			_setActiveConversation(conversation || null);
			return conversation;
		},
		[_setActiveConversation, getConversationById]
	);

	const goToConversation = useCallback(
		(id: number) => {
			if (!navigate) return;

			console.log('Go to conversation', id);

			setCurrentConversationId(id);

			navigate(`/messages/conversations/view/${id.toString()}`);
		},
		[setCurrentConversationId, navigate]
	);

	return {
		conversations: contents,
		activeConversation,
		getConversationById,
		setActiveConversation,
		goToConversation,
	};
};

export default useMessages;