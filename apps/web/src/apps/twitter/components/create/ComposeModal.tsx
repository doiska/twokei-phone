import React from 'react';

import { Modal } from '@ui/components/Modal';

import { UseToggleMenu } from '@os/hooks/useTogglableMenu';

import NewTweet from '@apps/twitter/components/create/NewTweet';

export const ComposeModal: React.FC<UseToggleMenu> = ({ toggle, isOpen }) => {
	return (
		<Modal toggle={toggle} isShowing={isOpen}>
			<NewTweet />
		</Modal>
	);
};
