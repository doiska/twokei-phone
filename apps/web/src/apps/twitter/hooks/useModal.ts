import { useRecoilState } from 'recoil';

import { twitterState } from '@apps/twitter/hooks/state';

export const useModal = () => {
	const [isOpen, setIsOpen] = useRecoilState(twitterState.showCreateTweet);
	const [message, setMessage] = useRecoilState(
		twitterState.createTweetContent
	);

	return {
		isOpen,
		setIsOpen,
		message,
		setMessage,
	};
};