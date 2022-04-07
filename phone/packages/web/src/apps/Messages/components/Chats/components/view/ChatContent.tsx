import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { ServerPromiseResp } from '@typings/common';
import { Message, MessageConversation, MessageEvents } from '@typings/messages';
import { RingsLoader } from '@ui/components/LoadingSpinner';
import fetchNui from '@utils/fetchNui';

import { usePhoneNumber } from '@os/simcard/hooks/usePhoneNumber';

import { useConversationId, useSetMessages } from '@apps/Messages/hooks/messages/messageState';
import { MockServerResp } from '@apps/Messages/utils/constants';

import MessageBubble from './ChatText';

type IChatContent = {
	activeMessage: MessageConversation;
	messages: Message[];
};

const ChatContent: React.FC<IChatContent> = ({ activeMessage, messages }) => {
	const ref = useRef<HTMLDivElement>(null);

	const phone = usePhoneNumber();

	const navigate = useNavigate();
	const conversationId = useConversationId();

	const setMessages = useSetMessages();

	const [hasMore, setHasMore] = useState(!!messages.length);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
	}, []);

	const handleNextPage = useCallback(() => {
		if (conversationId !== null) {
			fetchNui<ServerPromiseResp<Message[]>>(
				MessageEvents.FETCH_MESSAGES,
				{
					id: conversationId,
					page,
				}
				// {
				// 	status: 'ok',
				// 	data: MockServerResp.data?.map((c) => {
				// 		const clone = { ...c };
				// 		clone.id = Math.floor(Math.random() * 10000) + Date.now();
				// 		console.log(c.id);
				// 		return clone;
				// 	}),
				// }
			)
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
					console.log(`Error fetching messages: ${e}`);
					setHasMore(false);
				});
		} else {
			setHasMore(false);
		}
	}, [conversationId, setMessages, page, setPage]);


	return (
		<div className="h-phone-body flex-1 select-none p-2">
			<div
				id="parent"
				style={{
					overflow: 'auto',
					maxHeight: 580,
					display: 'flex',
					flexDirection: 'column-reverse',
				}}
				ref={ref}
			>
				<InfiniteScroll
					dataLength={messages.length}
					next={handleNextPage}
					hasMore={hasMore}
					loader={<RingsLoader color="black" height={50} />}
					className="flex flex-col-reverse gap-2 px-2"
					inverse={true}
					scrollableTarget="parent"
				>
					{messages.map((message) => (
						<MessageBubble
							key={message.id}
							position={message.author === (phone ?? '') ? 'left' : 'right'}
							message={message}
						/>
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default ChatContent;
