import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { ServerPromiseResp } from '@typings/common';
import { Message, MessageEvents } from '@typings/messages';
import LoadingSpinner from '@ui/components/LoadingSpinner';
import fetchNui from '@utils/fetchNui';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useConversationId, useMessagesState } from '@apps/Messages/hooks/messages/messageState';
import { useMessageAPI } from '@apps/Messages/hooks/messages/useMessageAPI';

import ChatText from './ChatText';

const ChatContent: React.FC = () => {
	const phone = usePhoneNumber();
	const navigate = useNavigate();
	const conversationId = useConversationId();

	const { fetchMessages } = useMessageAPI();
	const [messages, setMessages] = useMessagesState();

	const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
	const [hasMore, setHasMore] = useState(!!messages.length);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setFilteredMessages(() => [...messages].sort((x, y) => (x.date && y.date ? x.date - y.date : -1)));
	}, [messages, setMessages, conversationId]);

	const handleNextPage = useCallback(() => {
		if (conversationId) {
			fetchNui<ServerPromiseResp<Message[]>>(MessageEvents.FETCH_MESSAGES, {
				id: conversationId,
				page,
			})
				.then((resp) => {
					if (resp.status !== 'ok') {
						navigate('/messages');
						return;
					}

					if (!resp.data || resp.data.length === 0) {
						setHasMore(false);
						return;
					}

					const messages = resp.data || [];

					setHasMore(true);
					setPage((curr) => curr + 1);

					setMessages((prev) => [...prev, ...messages]);
				})
				.catch((e) => {
					console.log(e);
					setHasMore(false);
				});
		}
	}, [conversationId]);

	const content = filteredMessages.map((message) => (
		<ChatText
			key={`${message.id}-${message.conversationId}`}
			position={`${message.author === phone ? 'right' : 'left'}`}
			message={message}
		/>
	));

	return (
		<div id="scroll-container" className="max-h-phone-body flex-1 select-none overflow-auto p-2">
			<InfiniteScroll
				inverse={true}
				hasMore={hasMore}
				next={handleNextPage}
				loader={<LoadingSpinner />}
				dataLength={messages.length}
				scrollableTarget="scroll-container"
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				pullDownToRefreshThreshold={50}
				pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
				releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
			>
				<ul className="flex flex-col gap-2 px-2 transition-all duration-500">{content}</ul>
			</InfiniteScroll>
		</div>
	);
};

export default ChatContent;
