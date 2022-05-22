import React from 'react';
import {
	IoMailOutline,
	IoMdNotificationsOutline,
	RiHome7Fill,
} from 'react-icons/all';

import useNavigation from '@os/hooks/useNavigation';

import TwitterNavItem from '@apps/twitter/common/navbar/TwitterNavItem';

const TwitterNavbar = () => {
	const { goTo, pathname: currentPath } = useNavigation();

	return (
		<nav className="border-twitter-dark-gray relative flex items-center justify-around border-t-2 border-opacity-30 p-3 text-2xl">
			<TwitterNavItem
				icon={<RiHome7Fill />}
				path="/twitter"
				goTo={goTo}
				currentPath={currentPath}
			/>
			<TwitterNavItem
				icon={<IoMdNotificationsOutline />}
				path="/twitter/notifications"
				goTo={goTo}
				currentPath={currentPath}
			/>
			<TwitterNavItem
				icon={<IoMailOutline />}
				path="/twitter/messages"
				goTo={goTo}
				currentPath={currentPath}
			/>
		</nav>
	);
};

export default TwitterNavbar;
