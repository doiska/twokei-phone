import React from 'react';
import { MdAdd } from 'react-icons/md';

import { OptionIcon, OptionIconHolder } from '@ui/components/OptionIcon';

import useNavigation from '@os/hooks/useNavigation';

const ConversationListIconContext: React.FC = () => {
	const { goTo } = useNavigation();

	return (
		<>
			<OptionIconHolder>
				<OptionIcon
					className="bg-whatsapp-light-green"
					icon={<MdAdd />}
					onClick={() => goTo('conversations/add')}
				/>
			</OptionIconHolder>
		</>
	);
};

export default ConversationListIconContext;
