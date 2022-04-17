import { MessageConversation } from '@typings/messages';

import { findParticipants } from '@apps/messages/utils/helpers';

import { useMessageProfileActions } from './useMessageProfileActions';

interface UseMessageProfile {
	getAnyValidAvatar: (conversation: MessageConversation) => string | undefined;
}

const useMessageProfile = (): UseMessageProfile => {
	const { fetchProfile } = useMessageProfileActions();

	const getAnyValidAvatar = (conversation: MessageConversation) => {
		if (conversation.isGroupChat) return conversation.avatar;

		const participants = findParticipants(conversation.conversationList, conversation.source);

		if (!participants.length) return;

		const profile = fetchProfile(participants[0]);

		return profile?.avatar;
	};

	return {
		getAnyValidAvatar,
	};
};

export default useMessageProfile;
