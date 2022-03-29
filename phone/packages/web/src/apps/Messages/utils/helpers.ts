import { MessageConversation } from '@typings/messages';

import { useMessageProfileActions } from '../hooks/profiles/useMessageProfileActions';

export const findParticipants = (conversation: string, phoneNumber?: string | null) =>
	conversation.split('+').filter((participant) => participant !== phoneNumber);

export const getAnyValidAvatar = (conversation: MessageConversation, phoneNumber?: string | null) => {
	if (conversation.isGroupChat) return conversation.avatar;

	const participants = findParticipants(conversation.conversationList, phoneNumber);

	if (!participants.length) return conversation.avatar;

	const { fetchProfile } = useMessageProfileActions();
	const profile = fetchProfile(participants[0]);

	return profile?.avatar;
};
