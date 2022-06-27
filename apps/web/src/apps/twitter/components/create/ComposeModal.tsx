import React from 'react';

import { Modal } from '@ui/components/Modal';

import { UseToggleMenu } from '@os/hooks/useTogglableMenu';

import NewTweet from '@apps/twitter/components/create/NewTweet';
import useTwitterAPI from '@apps/twitter/hooks/useTwitterAPI';

export const ComposeModal: React.FC<UseToggleMenu> = ({ toggle, isOpen }) => {
	const { submitTweet } = useTwitterAPI();

	const handleSubmit = (tweet: string) => {
		submitTweet({
			content: tweet,
		});

		toggle();
	};

	return (
		<Modal toggle={toggle} isShowing={isOpen}>
			<NewTweet handleSubmit={handleSubmit} />
		</Modal>
	);
};
