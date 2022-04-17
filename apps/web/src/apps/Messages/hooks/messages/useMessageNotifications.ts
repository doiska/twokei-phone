import { MessageConversation } from '@typings/messages';

import { useApp } from '@os/hooks/useApp';
import { useNotifications } from '@os/notification/hooks/useNotifications';
import { INotification } from '@os/notification/providers/NotificationProvider';

import useMessages from '@apps/messages/hooks/messages/useMessages';

type IMessageNotification = {
	conversationName: string;
	conversationId: number;
	message: string;
};

const NOTIFICATION_ID = 'messages:broadcast';

export const useMessageNotifications = () => {
	const { getConversationById } = useMessages();
	const { removeId, addNotification, addNotificationAlert } = useNotifications();

	const messagesApp = useApp('MESSAGES');

	const setNotification = (messageNotification: IMessageNotification) => {
		const { conversationName, conversationId, message } = messageNotification;
		const group: MessageConversation | undefined = getConversationById(conversationId);

		if (!group) return;

		const id = `${NOTIFICATION_ID}:${conversationId}`;

		let icon;
		if (messagesApp) icon = messagesApp;

		const notification = {
			app: 'MESSAGES',
			id,
			title: conversationName,
			content: message,
			icon: icon,
		} as INotification;

		addNotificationAlert(notification, (n) => {
			removeId(id);
			if (group.unread && group.unread > 1) {
				addNotification({
					...n,
					title: group.source ?? group.label,
					content: 'Unread messages ' + group.unread,
				});
			}
		});
	};

	return { setNotification };
};
