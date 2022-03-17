import React, { useEffect, useState } from 'react';

import { useNotifications } from '@os/notification/hooks/useNotifications';

const PhoneBody: React.FC = ({ children }) => {
	const { barUncollapsed } = useNotifications();
	const [backdrop, setBackdrop] = useState<string>('');

	useEffect(() => {
		setBackdrop(barUncollapsed ? '' : 'backdrop-blur-sm backdrop-brightness-50');
	}, [barUncollapsed]);

	return <div className={`flex h-full w-full flex-col transition-all duration-300 ${backdrop}`}>{children}</div>;
};

export default PhoneBody;
